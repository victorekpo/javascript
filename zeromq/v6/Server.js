// @/server.js
const zmq = require("zeromq");

const sock = new zmq.Push();

const main = async () => {
    try {

        await sock.bind("tcp://*:7777");
        console.time('start');
        for (let job = 1; job <= 10000; job++) {
            console.log(`Sending Job ${job}`)
            await sock.send(job);
           // await new Promise((resolve) => setTimeout(resolve, 500));
        }
        console.timeEnd('start');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
main();

// server timeout > client timeout * 5