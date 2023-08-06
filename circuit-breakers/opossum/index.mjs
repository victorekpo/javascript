import CircuitBreaker from 'opossum';
import axios from 'axios';

const asyncFunctionThatCouldFail = (x, y) => {
    return new Promise((resolve, reject) => {
        // Do something, maybe on the network or a disk
        reject(1)
    });
}
const options = {
    timeout: 1000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
};

const request = axios.get('https://httpstat.us/200?sleep=10000');

const breaker = new CircuitBreaker(request, options);
breaker.fire()
    .then(res => {
        console.log("SUCCESS", res.data)
    })
    .catch(err => {
        console.error("ERR", err?.response?.data, err?.message);
    });