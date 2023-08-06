import axios from 'axios';
import { CircuitBreaker } from './CircuitBreaker.mjs';

// sample request to fetch data asynchronously
const request = axios.get('https://httpstat.us/201?sleep=1000');
//const res = await request;

// wrap the request within a circuit breaker object
const circuitBreakerObject = new CircuitBreaker(request, { failureThreshold: 9, timeout: 3000 });
// fire the request
circuitBreakerObject.fire()
    .then((data) => console.log("success, data:",data))
    .catch((err) => console.log(`some error occurred = ${err.message}`));