import React, {createContext, useContext, useRef} from 'react';
import Socket from 'socket.io-client';

const SocketContext = createContext<{
  socket?: React.MutableRefObject<SocketIOClient.Socket>;
}>({});

export const SocketProvider: React.FC = (props) => {
  const socket = useRef(Socket('http://localhost:4000'));

  return (
    <SocketContext.Provider value={{socket}}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const {socket} = useContext(SocketContext);
  if (!socket?.current) {
    throw new Error(
      'You must wrap your components with SocketProvider in order to useSocketContext',
    );
  }
  return {socket: socket.current};
};
