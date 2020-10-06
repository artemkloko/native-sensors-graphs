import { Socket, Server } from "socket.io";

import { SensorsEvent } from "./@types";

export const useSensorsEvents = (server: Server, socket: Socket) => {
  socket.on("sensorEvent", (data: SensorsEvent) => {
    console.log("sensorEvent", data);
    socket.broadcast.emit("sensorEvent", data);
  });
};
