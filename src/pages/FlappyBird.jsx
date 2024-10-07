import { useEffect, useRef, useState } from "react";
import {
  calculateOutOfBounds,
  drawPipePair,
  drawBird,
  checkIfHitTarget,
} from "../helper/flappybird";
import FlappyBirdLogo from "../components/flappybird/FlappyBirdLogo";

export default function FlappyBirdPage() {
  const canvasSize = { width: 1200, height: 400 };
  const [isPlaying, setIsPlaying] = useState(false);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 200 }); // Track x and y position of the player
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const moveSpeed = 6;
  const playerSize = { width: 25, height: 25 };
  const [score, setScore] = useState(0);
  const [pipes, setPipes] = useState([
    { x: canvasSize.width, y: canvasSize.height / 2 },
    // { x: canvasSize.width / 2, y: canvasSize.height / 2 },
  ]);
  // used to divide the canvas height
  const pipePositions = Array.from(
    { length: Math.ceil((5 - 2) / 0.5) + 1 },
    (_, i) => 2 + i * 0.5
  );

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
      //If out of bounds it returns the same x and y
      playerPos,
      direction,
      playerSize,
      canvas
    );

    const hitTarget = checkIfHitTarget(pipes, newX, newY, playerSize);

    if (hitTarget) {
      setScore((prev) => prev + 1);
    }
    // Update the player's position only after boundary checks
    setPlayerPos({ x: newX, y: newY });
    // Draw the player
    drawBird(ctx, newX, newY, playerSize);

    // ctx.current.lineWidth = 3;
  };

  useEffect(() => {
    const handleKeyUp = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
          setDirection((prev) => ({ ...prev, y: 0 }));
          break;
        case "ArrowLeft":
        case "ArrowRight":
          setDirection((prev) => ({ ...prev, x: 0 }));
          break;
        default:
          break;
      }
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setDirection((prev) => ({ ...prev, y: -moveSpeed }));
          break;
        case "ArrowDown":
          setDirection((prev) => ({ ...prev, y: moveSpeed }));
          break;
        case "ArrowLeft":
          setDirection((prev) => ({ ...prev, x: -moveSpeed }));
          break;
        case "ArrowRight":
          setDirection((prev) => ({ ...prev, x: moveSpeed }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [playerPos]);

  const drawPipes = () => {
    let distanceBetweenPipes = 40;
    setPipes((prev) => {
      const updatedPipes = prev
        .map((pipe) => ({
          ...pipe,
          x: pipe.x - 4,
        }))
        .filter((pipe) => pipe.x > 0);

      if (updatedPipes.slice(-1)[0].x <= canvasSize.width - 200) {
        updatedPipes.push({
          x: canvasSize.width,
          y:
            canvasSize.height /
            pipePositions[Math.floor(Math.random() * pipePositions.length)],
        });
      }

      if (updatedPipes.length < prev.length) {
        updatedPipes.push({
          x: canvasSize.width,
          y:
            canvasSize.height /
            pipePositions[Math.floor(Math.random() * pipePositions.length)],
        });
      }
      return updatedPipes;
    });
    pipes.forEach((pipe) => {
      drawPipePair(ctx, canvasSize, pipe, distanceBetweenPipes);
    });
  };

  const ticker = () => {
    // Clear the canvas before each frame
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawBackGround();
    if (!isPlaying) return;
    // drawEnemies();
    drawPlayer();
    drawPipes();
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
  }, [playerPos, direction, isPlaying]);

  return (
    <div className="flex items-center flex-col">
      <FlappyBirdLogo />
      <canvas
        ref={canvas}
        id="main-canvas"
        className="rounded-lg"
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
      <span className="text-white text-xl">SCORE: {score}</span>
      <button
        className="text-white bg-purple-400 px-4 py-2 mt-2 rounded-lg text-lg font-bold"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "STOP" : "START"}
      </button>
    </div>
  );
}
