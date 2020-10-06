import { useCallback, useState } from "react";

import { ClientPool, ClientResponse, ClientType } from "../@types";
import { useSocketContext } from "../stores/SocketContext";

export const useClientPool = (type: ClientType) => {
  const { socket } = useSocketContext();
  const [state, setState] = useState<{
    connected: boolean;
    clientPool: ClientPool;
  }>({
    connected: false,
    clientPool: { [ClientType.webApp]: [], [ClientType.mobile]: [] },
  });

  const setClientPool = (clientPool: ClientPool) => {
    setState((state) => ({ ...state, clientPool }));
  };

  const addToClientPool = (client: ClientResponse) => {
    setState((state) => ({
      ...state,
      clientPool: {
        ...state.clientPool,
        [client.type]: [...state.clientPool[client.type], client.id],
      },
    }));
  };

  const removeFromClientPool = (client: ClientResponse) => {
    setState((state) => ({
      ...state,
      clientPool: {
        ...state.clientPool,
        [client.type]: state.clientPool[client.type].filter(
          (id) => id !== client.id
        ),
      },
    }));
  };

  const connect = useCallback(() => {
    if (socket) {
      socket.addEventListener("clientPool", setClientPool);
      socket.addEventListener("clientConnect", addToClientPool);
      socket.addEventListener("clientDisconnect", removeFromClientPool);

      socket.emit("clientConnect", { type });

      setState((state) => ({ ...state, connected: true }));
    }
  }, [socket, setState]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.removeAllListeners();

      socket.emit("clientDisconnect", { type });

      setState((state) => ({ ...state, connected: false }));
    }
  }, [socket, setState]);

  return { state, connect, disconnect };
};
