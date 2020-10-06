import { Socket, Server } from "socket.io";

import { ClientPool, ClientRequest, ClientType } from "./@types";

const clientPool: ClientPool = {
  [ClientType.webApp]: [],
  [ClientType.mobile]: [],
};

export const useClientPool = (server: Server, socket: Socket) => {
  socket.on("clientConnect", (client: ClientRequest) => {
    clientPool[client.type].push(socket.id);

    server.to(socket.id).emit("clientPool", clientPool);
    socket.broadcast.emit("clientConnect", { ...client, id: socket.id });
  });

  socket.on("clientDisconnect", (client: ClientRequest) => {
    clientPool[client.type] = clientPool[client.type].filter(
      (id) => id !== socket.id
    );

    socket.broadcast.emit("clientDisconnect", { ...client, id: socket.id });
  });
};
