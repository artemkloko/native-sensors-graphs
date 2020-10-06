import socket from "socket.io";

import { useSensorsEvents } from "./useSensorsEvents";

const server = socket();

server.on("connection", (socket) => {
  useSensorsEvents(server, socket);
});

const port = 4000;
server.listen(port);
console.log("Socket.io listening on port", port);
