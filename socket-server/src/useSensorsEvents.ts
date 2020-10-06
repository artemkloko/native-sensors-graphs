import { Socket, Server } from "socket.io";

export const useSensorsEvents = (server: Server, socket: Socket) => {
  socket.on("sensorEvent", (data) => {
    console.log("sensorEvent", data);
    socket.broadcast.emit("sensorEvent", data);
  });
};
