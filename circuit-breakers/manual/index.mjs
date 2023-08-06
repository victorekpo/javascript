import axios from 'axios';
import { CircuitBreaker } from './CircuitBreaker.mjs';

// sample request to fetch data asynchronously
const request = axios.get('https://httpstat.us/201?sleep=1000');
const request2 = axios.get('https://httpstat.us/201?sleep=7000');
//const res = await request;

// wrap the request within a circuit breaker object
const circuitBreakerObject = new CircuitBreaker({ failureThreshold: 2, timeout: 1500 }); // ~500ms ramp-up
// fire the request
     circuitBreakerObject.fire(request2)
        .then((data) => console.log("success, data:", data))
        .catch((err) => console.log(`some error occurred = ${err.message}`));

     circuitBreakerObject.fire(request2).then((data) => console.log("success, data:", data))
 circuitBreakerObject.fire(request2).then((data) => console.log("success, data:", data))
 circuitBreakerObject.fire(request).then((data) => console.log("success, data:", data))
 circuitBreakerObject.fire(request).then((data) => console.log("success, data:", data))
 circuitBreakerObject.fire(request).then((data) => console.log("success, data:", data))
 circuitBreakerObject.fire(request).then((data) => console.log("success, data:", data))
