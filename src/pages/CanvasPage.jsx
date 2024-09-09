import { useEffect, useState, useRef, useCallback } from "react";
import CanvasLogo from "../components/canvas/CanvasLogo";
import { drawCircleAtEndOfLine, drawCurrentScore } from "../helper/canvas";

export default function CanvasPage() {
  const [maxProgress, setMaxProgress] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const progressState = useRef(0);
  const gameOverRef = useRef(gameOver); // Create a ref for the gameOver state
  const progressStoppedAt = useRef(0);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);
  gameOverRef.current = gameOver; // Somehow this only works with ref (TODO: check closures)

  function drawLine(canvas, ctx) {
    const startingPos = {
      //Start in bottom left
      x: 0,
      y: canvas.height,
    };
    const endingPos = {
      //End in top right
      x: canvas.width,
      y: 0,
    };
    const duration = 8 * 1000; // Duration in milliseconds (8 seconds)
    let startTime = null;

    function animateLine(timestamp) {
      if (gameOverRef.current) return; // Stop animation if gameOver is true

      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      progressState.current = progress;

      // Clear the canvas for each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate the current position of the line
      const currentX = startingPos.x + (endingPos.x - startingPos.x) * progress;
      const currentY = startingPos.y + (endingPos.y - startingPos.y) * progress;

      // Draw the line up to the current position
      ctx.beginPath();
      ctx.strokeStyle = "rgb(100 116 139)";
      ctx.lineWidth = 4;
      ctx.moveTo(startingPos.x, startingPos.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();

      drawCircleAtEndOfLine(ctx, currentX, currentY);
      drawCurrentScore(ctx, currentX, currentY, progress);

      // Continue the animation until the line is fully drawn or gameOver becomes true
      if (progress < maxProgress) {
        requestAnimationFrame(animateLine);
      } else {
        setGameOver(true);
      }
    }

    // Start the animation
    requestAnimationFrame(animateLine);
    return () => {
      gameOverRef.current = true;
    };
  }

  useEffect(() => {
    if (gameStarted) {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");

      if (!gameOver) {
        drawLine(canvas, ctx);
      }
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameOver) {
      if (progressStoppedAt.current < progressState.current) {
        console.log("YOU STOPPED TOO EARLY");
      } else if (progressStoppedAt.current > progressState.current) {
        console.log("YOU DIDN'T STOP");
      } else {
        console.log("NAILED IT");
      }
    }
  }, [gameOver]);

  const handleEndClick = () => {
    progressStoppedAt.current = progressState.current;
    setHasMadeChoice(true);
  };
  const handleStartClick = () => {
    setGameOver(false);
    setGameStarted(true);
    setMaxProgress(Math.random());
    setHasMadeChoice(false);
    progressStoppedAt.current = 0;
  };
  const handleRestartClick = () => {
    setGameOver(false);
    setGameStarted(true);
    setMaxProgress(Math.random());
    setHasMadeChoice(false);
    progressStoppedAt.current = 0;
  };
  return (
    <div
      id="container"
      className="flex items-center flex-col lg:min-h-[40rem] md:min-h-[20rem] font-serif"
    >
      <CanvasLogo />
      <canvas
        id="myCanvas"
        className="border-2 border-yellow-400 rounded-lg"
        width={"700px"}
        height={"600px"}
      />

      <div className="flex flex-row ">
        {hasMadeChoice && (
          <div className="flex flex-row items-center">
            <span className="text-white text-[2rem]">YOU: </span>
            <span className="text-while text-[4rem] text-green-600">
              {progressState.current > 0.0
                ? (progressStoppedAt.current * 100).toFixed(0)
                : "Didn't stop"}
            </span>
          </div>
        )}
        {gameOver && (
          <div className="flex flex-row items-center">
            <span className="text-white text-[2rem]">MAX: </span>
            <span className="text-while text-[4rem] text-green-600">
              {(progressState.current * 100).toFixed(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        {gameStarted && !hasMadeChoice && !gameOver ? (
          <button
            className="w-24 h-14 bg-slate-500 text-2xl text-white font-bold font-serif rounded-lg"
            onClick={() => handleEndClick()}
          >
            STOP
          </button>
        ) : !hasMadeChoice && !gameStarted ? (
          <button
            className="w-24 h-14 bg-slate-500 text-2xl text-white font-bold font-serif rounded-lg"
            onClick={() => handleStartClick()}
          >
            START
          </button>
        ) : (
          gameOver &&
          !hasMadeChoice && (
            <button
              className="w-32 h-14 bg-slate-500 text-2xl text-white font-bold font-serif rounded-lg "
              onClick={() => handleRestartClick()}
            >
              RESTART
            </button>
          )
        )}
      </div>
    </div>
  );
}
