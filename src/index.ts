import socket from "socket.io";

const server = socket();

server.on("connection", (socket) => {
  console.log("on connection", socket.id);

  socket.emit("connected", socket.id);
  console.log("connected >", socket.id);
});

const port = 4000;
server.listen(port);
console.log("Socket.io listening on port", port);
