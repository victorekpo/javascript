const app = require("express")();
const { v4 } = require('uuid');
const httpServer = require("http").createServer(app);
const options = { /* ... */ };
const io = require("socket.io")(httpServer, options);
const port = 3000;

app.use((req,res,next) => {
  req.requestId = v4();
  console.log("new request", req.requestId);
  next();
});

io.use((socket,next) => {
  socket.requestId = v4();
  console.log("new socket request", socket.requestId);

  const isValid = (sock) => {
    const token = sock.handshake.auth.token;
    console.log("Headers", sock.request.headers);
    console.log("Token", token);
    if(token === "abc") { return true; }
      else { return false; }
  }

  if (isValid(socket)) {
    next();
  } else {
    next(new Error("invalid", socket.requestId));
  }
});

io.on("connection", socket => { 
  console.log('new connection', socket.id);
    
  socket.on("newCount", (arg) => {
    console.log('new count', arg);
  });

});

httpServer.listen(port);
console.log('Now listening on port:', port);
