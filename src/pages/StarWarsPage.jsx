import { useEffect, useRef, useState } from "react";

export default function StarWarsPage() {
  const canvasSize = { width: 1000, height: 800 };
  const canvas = useRef(null);
  const ctx = useRef(null);
  // const [playerPos, setPlayerPos] = useState()
  useEffect(() => {
    const canvasElement = canvas.current;
    if (canvasElement) {
      ctx.current = canvasElement.getContext("2d");
      if (!ctx.current) {
        console.error("Unable to get 2D context from canvas.");
      }
    } else {
      console.error("Canvas element not found.");
    }
  }, []);

  const drawBackGround = () => {
    ctx.current.fillStyle = "black";
    ctx.current.fillRect(0, 0, canvas.current.width, canvas.current.height);
  };

  const drawPlayer = () => {
    ctx.current.fillStyle = "yellow";
    ctx.current.rect(canvasSize.width / 2, canvasSize.height / 2, 40, 20);
    ctx.current.fill()
  };
  const ticker = () => {
    ctx.current.clearRect(0, 0, canvasSize.width, canvasSize.height);
    drawBackGround();
    drawPlayer();
  };
  useEffect(() => {
    if (!ctx.current) {
      return console.error("Unable to get 2D context from canvas.");
    }

    // Start the ticker function at a regular interval
    const intervalId = setInterval(() => {
      ticker();
    }, 10);

    return () => clearInterval(intervalId);
  }, [ctx]);

  return (
    <div className="flex items-center flex-col">
      <canvas
        id="main-canvas"
        width={canvasSize.width}
        height={canvasSize.height}
        ref={canvas}
      ></canvas>
    </div>
  );
}
