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
  ctx.fontWeight = "bold";
  ctx.font = "48px Sans-Serif";
  ctx.textAlign = "end"; // Center the text horizontally
  ctx.textBaseline = "end"; // Center the text vertically
  ctx.fillText((value * 100).toFixed(0), posX, posY);
}

export function drawCircleAtEndOfLine(ctx, posX, posY) {
  ctx.beginPath(); // Start a new path for the circle
  ctx.arc(posX, posY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#fbbf24";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.stroke(); // Stroke the circle to create its border
}

export function generateLines(count, maxX, maxY) {
  const lines = [];
  let x = 0;
  let y = maxY / 2; // Start y in the middle of the allowed range

  for (let i = 0; i < count; i++) {
    // Increment x by a random amount, ensuring it stays within maxX
    x += Math.floor(Math.random() * (maxX / count));

    // Change y by a random value (-maxY/3 to +maxY/3), and clamp it between 0 and maxY
    let yOffset = Math.floor(Math.random() * (maxY / 1.5)) - (maxY / 3);
    y = Math.min(Math.max(0, y + yOffset), maxY);

    lines.push({ x, y });

    // Stop if x exceeds maxX
    if (x >= maxX) break;
  }

  return lines;
}