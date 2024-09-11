import { useEffect, useState, useRef } from "react";
import CanvasLogo from "../components/howHigh/HowHighLogo";
import {
  drawCircleAtEndOfLine,
  drawCurrentScore,
  generateLines,
} from "../helper/howHigh";
import ShowUserChoice from "../components/howHigh/ShowUserChoice";
import HowHighButtons from "../components/howHigh/HowHighButtons";
import ShowGameResult from "../components/howHigh/ShowGamreResult";

export default function HowHighPage() {
  const [maxProgress, setMaxProgress] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const progressState = useRef(0);
  const gameOverRef = useRef(gameOver);
  const progressStoppedAt = useRef(0);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [lines, setLines] = useState([]);
  console.log(lines)
  // const lines = [
  //   { x: 0, y: 400 }, // start at bottom-left
  //   { x: 100, y: 200 }, // go up-right
  //   { x: 200, y: 600 }, // go down-right
  //   { x: 300, y: 400 }, // go up-right
  //   { x: 400, y: 600 }, // go down-right
  //   { x: 500, y: 300 }, // go up-right
  //   { x: 600, y: 600 }, // go down-right
  //   { x: 700, y: 200 }, // end near top-right
  // ];

  gameOverRef.current = gameOver; // Somehow this only works with ref (TODO: check closures)

  useEffect(() => {
    // generateLines(8, canvas.height, canvas.with);
  }, []);

  function drawLine(canvas, ctx) {
    const duration = 10 * 1000; // Duration in milliseconds (10 seconds)
    let startTime = null;

    function animateLine(timestamp) {
      if (gameOverRef.current) return; // Stop animation if gameOver is true
      if (!startTime) startTime = timestamp;

      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Normalize progress between 0 and 1

      // Calculate the index of the last fully drawn point
      const totalSegments = lines.length - 1;
      const maxIndex = Math.floor(progress * totalSegments); // The last fully drawn point

      // Calculate the fractional progress within the current segment
      const segmentProgress = progress * totalSegments - maxIndex;

      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw all the fully completed segments
      for (let i = 0; i < maxIndex; i++) {
        let startX = lines[i].x;
        let startY = fluctuate(lines[i].y, elapsedTime); // Apply fluctuation to Y axis
        let endX = lines[i + 1].x;
        let endY = fluctuate(lines[i + 1].y, elapsedTime); // Apply fluctuation to Y axis

        ctx.beginPath();
        ctx.strokeStyle = "rgb(100 116 139)";
        ctx.lineWidth = 4;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw the line up to the fractional point in the current segment
      if (maxIndex < totalSegments) {
        const startX = lines[maxIndex].x;
        const startY = fluctuate(lines[maxIndex].y, elapsedTime); // Fluctuate Y axis
        const endX = lines[maxIndex + 1].x;
        const endY = fluctuate(lines[maxIndex + 1].y, elapsedTime); // Fluctuate Y axis

        // Interpolate between the current point and the next point
        const interpolatedX = startX + (endX - startX) * segmentProgress;
        const interpolatedY = startY + (endY - startY) * segmentProgress;

        ctx.beginPath();
        ctx.strokeStyle = "rgb(100 116 139)";
        ctx.lineWidth = 4;
        ctx.moveTo(startX, startY);
        ctx.lineTo(interpolatedX, interpolatedY); // Draw up to the interpolated point
        ctx.stroke();
      }

      // Optionally draw the current score or any other info
      drawCurrentScore(ctx, canvas.width - 20, 40, progress);

      // Continue the animation if progress is less than 1
      if (progress < maxProgress) {
        requestAnimationFrame(animateLine);
      } else {
        setGameOver(true);
        setGameStarted(false);
      }
    }

    // Start the animation
    requestAnimationFrame(animateLine);
    return () => {
      gameOverRef.current = true;
    };
  }

  // A helper function to create fluctuation in the Y axis (or other logic)
  function fluctuate(y, elapsedTime) {
    const amplitude = 10; // Amplitude of the fluctuation
    const frequency = 0; // Frequency of the fluctuation
    return y + Math.sin(elapsedTime * frequency) * amplitude;
  }

  useEffect(() => {
    if (gameStarted) {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      setLines(generateLines(8, canvas.height, canvas.width));
      if (!gameOver) {
        drawLine(canvas, ctx);
      }
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameOver) {
      if (progressStoppedAt.current < progressState.current) {
        setGameResult("You stopped too early");
      } else if (progressStoppedAt.current > progressState.current) {
        setGameResult("You didn't stop");
      } else {
        setGameResult("Nailed it");
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
    setMaxProgress(0.7);
    // setMaxProgress(Math.random());
    setHasMadeChoice(false);
    progressStoppedAt.current = 0;
  };
  const handleRestartClick = () => {
    setGameOver(false);
    setGameStarted(true);
    setMaxProgress(0.7);
    // setMaxProgress(Math.random());
    setHasMadeChoice(false);
    setGameResult(null);
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
        className="border-2 border-yellow-400 rounded-t-lg"
        width={"700px"}
        height={"600px"}
      />
      <div className="flex flex-row justify-between w-[700px] border-2 border-t-0 items-center">
        <ShowUserChoice
          gameOver={gameOver}
          hasMadeChoice={hasMadeChoice}
          progressState={progressState}
          progressStoppedAt={progressStoppedAt}
        />
        <ShowGameResult gameResult={gameResult} />
        <HowHighButtons
          gameOver={gameOver}
          gameStarted={gameStarted}
          hasMadeChoice={hasMadeChoice}
          handleEndClick={handleEndClick}
          handleRestartClick={handleRestartClick}
          handleStartClick={handleStartClick}
        />
      </div>
    </div>
  );
}
