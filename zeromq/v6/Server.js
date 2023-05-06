// @/server.js
const zmq = require("zeromq");

const sock = new zmq.Push();

const main = async () => {
    try {
        await sock.bind("tcp://*:7777");
        for (let job = 1; job <= 100; job++) {
            console.log(`Sending Job ${job}`)
            await sock.send(job);
            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
main();