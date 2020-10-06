import React from "react";

import { SensorsScreen } from "./screens/SensorsScreen";
import { SocketProvider } from "./stores/SocketContext";

export const App = () => {
  return (
    <SocketProvider>
      <SensorsScreen />
    </SocketProvider>
  );
};
