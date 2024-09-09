export function drawCircle(canvas, ctx, idx) {
  const circleRadius = 20;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Ensure centerX is at least circleRadius away from the left and right edges
  let centerX =
    Math.floor(Math.random() * (canvasWidth - circleRadius * 2)) + circleRadius;

  // Ensure centerY is at least circleRadius away from the top and bottom edges
  let centerY =
    Math.floor(Math.random() * (canvasHeight - circleRadius * 2)) +
    circleRadius;

  ctx.beginPath();
  ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "blue";
  ctx.stroke();

  // Set the font and alignment for the text
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.textAlign = "center"; // Center the text horizontally
  ctx.textBaseline = "middle"; // Center the text vertically

  ctx.fillText(idx + 1, centerX, centerY);
}

export function drawCurrentScore(ctx, posX, posY, value) {
  ctx.fillStyle = "white";
  ctx.font = "24px Sans-Serif";
  ctx.textAlign = "end"; // Center the text horizontally
  ctx.textBaseline = "end"; // Center the text vertically
  ctx.fillText((value * 100).toFixed(0), posX + 20, posY - 14);
}

export function drawCircleAtEndOfLine(ctx, posX, posY) {
  ctx.beginPath(); // Start a new path for the circle
  ctx.arc(posX, posY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#fbbf24";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.stroke(); // Stroke the circle to create its border
}
