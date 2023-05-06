// subber.js
const zmq = require("zeromq");
const sock = zmq.socket("sub");

class Subscriber {
    constructor () {
        sock.connect("tcp://127.0.0.1:3001");
        sock.subscribe("kitty cats");
        console.log("Subscriber connected to port 3001");
    }

    processMessage () {
        sock.on("message", function(topic, message) {
            console.log(
                "received a message related to:",
                topic.toString(),
                "containing message:",
                message.toString()
            );
        });
    }

    stopProcessing () {
        sock.removeAllListeners();
    }
};

module.exports = Subscriber;


