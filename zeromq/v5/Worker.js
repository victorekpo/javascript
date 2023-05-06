// worker.js
const zmq = require("zeromq");
const sock = zmq.socket("pull");

class Worker {
    constructor () {
        sock.connect("tcp://127.0.0.1:3000");
        console.log("Worker connected to port 3000");
    }
    pullWork () {
        sock.on("message", function(msg) {
            console.log("receiving work, processing work: %s", msg.toString());
        });
    }

    stopPullingWork () {
        sock.removeAllListeners();
    }
}


module.exports = Worker;