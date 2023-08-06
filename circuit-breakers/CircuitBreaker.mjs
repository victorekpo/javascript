import axios from 'axios';
const CircuitBreakerStates = {
    OPENED: "OPENED",
    CLOSED: "CLOSED",
    HALF: "HALF"
}

export class CircuitBreaker {
    request = null;
    state = CircuitBreakerStates.CLOSED;
    failureCount = 0;
    failureThreshold = 5; // number of failures to determine when to open the circuit
    resetAfter = 50000;
    timeout = 3000; // declare request failure if the function takes more than 5 seconds

    constructor(request, options) {
        this.request = request;
        this.state = CircuitBreakerStates.CLOSED; // allowing requests to go through by default
        this.failureCount = 0;
        // allow request to go through after the circuit has been opened for resetAfter seconds
        // open the circuit again if failure is observed, close the circuit otherwise
        this.resetAfter = Date.now();
        this.failureThreshold = options.failureThreshold || 5;
        this.timeout = options.timeout || 3000;
    }

    async fire() {
        if (this.state === CircuitBreakerStates.OPENED) {
            if (this.resetAfter <= Date.now()) {
                this.state = CircuitBreakerStates.HALF;
            } else {
                throw new Error('Circuit is in open state right now. Please try again later.');
            }
        }
        try {
            const response = await(this.request);
            if (response.status === 200 || response.status === 201) return this.success(response.data);
            console.log("FAILURE!", this.failureCount, response.status, response.data)
            return this.failure(response.data);
        }
        catch(err) {
            console.log("FAILURE!", this.failureCount, err.message)
            return this.failure(err.message);
        }
    }

    success(data) {
        this.failureCount = 0
        if (this.state === CircuitBreakerStates.HALF) {
            this.state = CircuitBreakerStates.CLOSED;
        }
        return data;
    }



    failure(data) {
        this.failureCount += 1;
        if (
            this.state === CircuitBreakerStates.HALF ||
            this.failureCount >= this.failureThreshold
        ) {
            this.state = CircuitBreakerStates.OPENED;
            this.resetAfter = Date.now() + this.timeout;
            console.log("NEW STATE", this.state, data)
        }
        return this.fire();
    }
};