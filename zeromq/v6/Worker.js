// @/worker.js
const zmq = require("zeromq");

const sock = new zmq.Pull();

const main = async () => {
    try {
        sock.connect("tcp://localhost:7777");

        for await (const [msg] of sock) {
            console.log(`Received Job ${msg.toString()}`);
//             sock.disconnect("tcp://localhost:7777")
            // await new Promise(resolve => {
            //     setTimeout(() => {
            //         sock.connect("tcp://localhost:7777");
            //         resolve()
            //     }, 0)
            // });
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
main();