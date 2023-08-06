import axios from 'axios';

class CircuitBreaker {
  constructor(serviceUrl, failureThreshold = 3, retryTimeout = 5000) {
    this.serviceUrl = serviceUrl;
    this.failureThreshold = failureThreshold; // Number of consecutive failures before opening the circuit
    this.retryTimeout = retryTimeout; // Time (in milliseconds) to wait before attempting to close the circuit again

    this.failureCount = 0;
    this.isOpen = false;
  }

  async callService(endpoint, data = {}, config = {}) {
    if (this.isOpen) {
      throw new Error('Circuit is open. Service is unavailable.');
    }

    try {
      const response = await axios.post(`${this.serviceUrl}/${endpoint}`, data, config);
      this.resetFailureCount();
      return response.data;
    } catch (error) {
      this.incrementFailureCount();
      if (this.failureCount >= this.failureThreshold) {
        this.openCircuit();
        setTimeout(() => this.closeCircuit(), this.retryTimeout);
      }
      throw error;
    }
  }

  incrementFailureCount() {
    this.failureCount++;
  }

  resetFailureCount() {
    this.failureCount = 0;
  }

  openCircuit() {
    this.isOpen = true;
    console.log('Circuit opened. Service is unavailable.');
  }

  closeCircuit() {
    this.isOpen = false;
    this.resetFailureCount();
    console.log('Circuit closed. Service is available again.');
  }
}

// Example usage
const circuitBreaker = new CircuitBreaker('https://httpstat.us/201?sleep=2000', 1, 1000);

(async () => {
  try {
    const responseData = await circuitBreaker.callService('endpoint', { key: 'value' });
    console.log('Response:', responseData);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

