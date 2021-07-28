var osc = require("osc"),
    http = require("http"),
    WebSocket = require("ws");

var socket;

    // Create an osc.js UDP Port listening on port 57121.
var udpPort = new osc.UDPPort({
  localAddress: "127.0.0.1",
  localPort: 32000,
  metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
  // console.log("An OSC message just arrived!", oscMsg);
  console.log("Remote info is: ", oscMsg);
  socket.emit(oscMsg.address, {data: {x: oscMsg.args[0].value, y: oscMsg.args[1].value}})
});

// Open the socket.
udpPort.open();

const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
  }
});

io.on("connection", (_socket) => {
  console.log("CONNEct")
  socket = _socket
  socket.emit("data", {data: "moinnnn"})
  // ...
});

io.on('data', (data) => {
  console.log("data!", data)
})

httpServer.listen(3000);
