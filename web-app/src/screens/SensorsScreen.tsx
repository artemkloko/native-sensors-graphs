import React, { useEffect, useRef } from "react";

import { ClientType, SensorsEvent } from "../@types";
import { useClientPool } from "../hooks/useClientPool";
import { useTabState } from "../hooks/useTabState";
import { useSocketContext } from "../stores/SocketContext";

export enum axisColors {
  "red",
  "green",
  "blue",
}

const latestData: Partial<SensorsEvent> = {};

export const SensorsScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket } = useSocketContext();
  const clientPool = useClientPool(ClientType.webApp);
  const tabState = useTabState();

  socket.on("sensorEvent", (event: SensorsEvent) => {
    latestData.name = event.name;
    latestData.values = event.values;
  });

  const draw = (context: CanvasRenderingContext2D | null) => {
    if (!context || !latestData.values) {
      return;
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (let axis in latestData.values) {
      const x = (parseInt(axis) + 1) * 100;
      const y = 250;
      const width = 100;
      const height = latestData.values[axis] * 3;

      context.fillStyle = axisColors[axis];
      context.fillRect(x, y, width, height);
      context.fill();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");

      let animationFrameId: number;

      const render = () => {
        draw(context);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [draw]);

  useEffect(() => {
    if (tabState.status === "focus" && !clientPool.state.connected) {
      clientPool.connect();
    } else if (tabState.status === "blur" && clientPool.state.connected) {
      clientPool.disconnect();
    }
  }, [tabState.status, clientPool.state]);

  if (
    !clientPool.state.connected ||
    clientPool.state.clientPool[ClientType.mobile].length === 0
  ) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Mobile client is not connected. Waiting...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
};
