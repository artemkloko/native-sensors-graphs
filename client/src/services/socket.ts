import {SensorsEvent} from 'sensors-module';
import Socket from 'socket.io-client';

const socket = Socket('http://localhost:4000');

export const useSocket = () => {
  const send = (event: SensorsEvent) => {
    socket.emit('sensorEvent', event);
  };

  return {send};
};
