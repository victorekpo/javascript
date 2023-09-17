// CommonJS
const { io } = require("socket.io-client");

const socket = io("http://54.82.230.197:3000", {
  reconnectionDelayMax: 10000,
  withCredentials: true,
  auth: {
    token: "abc"
  },
  extraHeaders: {
    count: 0
  }
});

const myInterval = setInterval(() => {
  console.log("Counter");
  const counter = socket.io.opts.extraHeaders.count++;
  socket.emit("newCount", counter);
}, 1000);

socket.on("connect_error", (err) => {
  console.log(err.message); // prints the message associated with the error
  clearInterval(myInterval);
});

