import { useEffect, useRef, useState } from "react";
import {
  calculateOutOfBounds,
  drawBottomLine,
  drawLeftLine,
  drawRightLine,
  drawSquare,
  drawTopLine,
  handleKeyDown,
  handleKeyUp,
} from "../helper/flappybird";

export default function FlappyBirdPage() {
  const canvas = useRef(null);
  const ctx = useRef(null);
  const [playerPos, setPlayerPos] = useState({ x: 400, y: 400 }); // Track x and y position of the player
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const moveSpeed = 8;
  const playerSize = { width: 35, height: 35 };

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
    // Draw the background
    ctx.current.fillStyle = "#8bd6ac";
    ctx.current.fillRect(0, 0, canvas.current.width, canvas.current.height);
  };

  const drawPlayer = () => {
    let { newX, newY } = calculateOutOfBounds(
      playerPos,
      direction,
      playerSize,
      canvas
    );

    // Update the player's position only after boundary checks
    setPlayerPos({ x: newX, y: newY });
    // Draw the player
    drawSquare(ctx, newX, newY, playerSize);

    ctx.current.lineWidth = 6;
    drawTopLine(ctx, newX, newY, playerSize);
    drawBottomLine(ctx, newX, newY, playerSize);
    drawLeftLine(ctx, newX, newY, playerSize);
    drawRightLine(ctx, newX, newY, playerSize);
  };

  const drawEnemy = () => {
    ctx.current.beginPath();
    ctx.current.arc(
      canvas.current.width / 2,
      canvas.current.height / 2,
      10,
      0,
      2 * Math.PI
    );
    ctx.current.fillStyle = "black";
    ctx.current.fill();
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) =>
      handleKeyDown(e, setDirection, moveSpeed)
    );
    window.addEventListener("keyup", (e) => handleKeyUp(e, setDirection));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playerPos]);

  const ticker = () => {
    // Clear the canvas before each frame
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawBackGround();
    drawEnemy();
    drawPlayer();
  };

  useEffect(() => {
    if (!ctx.current) {
      return console.error("Unable to get 2D context from canvas.");
    }

    // Start the ticker function at a regular interval
    const intervalId = setInterval(() => {
      ticker();
    }, 5);

    return () => clearInterval(intervalId);
  }, [playerPos, direction]);

  return (
    <div className="flex items-center">
      <canvas ref={canvas} id="main-canvas" width="1000" height="800"></canvas>
    </div>
  );
}
