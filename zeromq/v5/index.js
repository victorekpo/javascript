const Producer = require('./producer');
const Worker = require('./worker');
const Publisher = require('./Publisher');
const Subscriber = require('./Subscriber');

const producer = new Producer();
const worker = new Worker();
const publisher = new Publisher();
const subscriber = new Subscriber();

producer.sendWork();
worker.pullWork();

publisher.sendTopic();
subscriber.processMessage();


setTimeout(() => {
    worker.stopPullingWork()
    console.log('\nnot pulling work anymore\nhappy weekend!');
}, 2000);

setTimeout(() => {
    producer.stopSendingWork()
    console.log('\nnot giving work anymore\nhappy weekend!');
}, 3000);


setTimeout(() => {
    worker.pullWork();
    console.log('\ncame to finish the remaining work, goodnight!');
}, 5000);


setTimeout(() => {
    subscriber.stopProcessing()
    console.log('\nnot processing work anymore\nhappy weekend!');
}, 2000);

setTimeout(() => {
    publisher.stopSendingTopic()
    console.log('\nnot giving topic anymore\nhappy weekend!');
}, 3000);


setTimeout(() => {
    subscriber.processMessage();
    console.log('\ncame to finish the remaining messages, goodnight!');
}, 5000);

// Takeaways
// Producer, Worker is typically for one topic
// Publisher, Subscriber for many topics
// Neither utilize queuing for missed connections..
