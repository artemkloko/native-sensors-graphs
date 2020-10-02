import React, { useEffect, useRef } from "react";
import Socket from "socket.io-client";

const socket = Socket("http://localhost:4000");

export type SensorsEvent = {
  name: string;
  values: number[];
};

const latestData: Partial<SensorsEvent> = {};

enum axisColors {
  "red",
  "green",
  "blue",
}

export const SensorsGraphs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
};
