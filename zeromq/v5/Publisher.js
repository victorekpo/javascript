// pubber.js
const zmq = require("zeromq");
const sock = zmq.socket("pub");

class Publisher {
    topicInterval;
    constructor () {
        sock.bindSync("tcp://127.0.0.1:3001");
        console.log("Publisher bound to port 3001");
    }

    sendTopic () {
        this.topicInterval = setInterval(function() {
            console.log("sending a multipart message envelope");
            sock.send(["kitty cats", "meow!"]);
        }, 500);
    }

    stopSendingTopic () {
        if (this.topicInterval) clearInterval(this.topicInterval);
    }
};

module.exports = Publisher;
