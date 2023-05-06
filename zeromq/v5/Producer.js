// producer.js
const zmq = require("zeromq");
const sock = zmq.socket("push");

class Producer {
    workInterval;
    constructor () {
        sock.bindSync("tcp://127.0.0.1:3000");
        console.log("Producer bound to port 3000");
    }
    sendWork () {
        this.workInterval = setInterval(function() {
            const newWorkItem = "Producer: Sending new Work";
            console.log(newWorkItem);
            sock.send(newWorkItem);
        }, 500);
    }

    stopSendingWork () {
        if (this.workInterval) clearInterval(this.workInterval);
    }
}
module.exports = Producer