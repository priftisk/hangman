const LINE_LENGTH = 30;

export function drawSquare(ctx, newX, newY, playerSize) {
  ctx.current.fillStyle = "#9b6ec2";
  ctx.current.fillRect(newX, newY, playerSize.width, playerSize.height);
}

export function drawTopLine(ctx, newX, newY, playerSize) {
  ctx.current.beginPath();
  ctx.current.moveTo(newX + playerSize.width / 2, newY);
  ctx.current.lineTo(newX + playerSize.width / 2, newY - LINE_LENGTH);
  ctx.current.stroke();
}

export function drawBottomLine(ctx, newX, newY, playerSize) {
  ctx.current.beginPath();
  ctx.current.moveTo(newX + playerSize.width / 2, newY + playerSize.height);
  ctx.current.lineTo(
    newX + playerSize.width / 2,
    newY + playerSize.height + LINE_LENGTH
  );
  ctx.current.stroke();
}

export function drawLeftLine(ctx, newX, newY, playerSize) {
  ctx.current.beginPath();
  ctx.current.moveTo(newX, newY + playerSize.height / 2);
  ctx.current.lineTo(newX - LINE_LENGTH, newY + playerSize.height / 2);
  ctx.current.stroke();
}

export function drawRightLine(ctx, newX, newY, playerSize) {
  ctx.current.beginPath();
  ctx.current.moveTo(newX + playerSize.width, newY + playerSize.height / 2);
  ctx.current.lineTo(
    newX + playerSize.width + LINE_LENGTH,
    newY + playerSize.height / 2
  );
  ctx.current.stroke();
}

export function calculateOutOfBounds(playerPos, direction, playerSize, canvas) {
  let newX = playerPos.x + direction.x;
  let newY = playerPos.y + direction.y;

  // Prevent player from going off the top of the canvas
  if (newY < 0) {
    newY = 0; // Set player to the top boundary
  }

  // Prevent player from going off the bottom of the canvas
  if (newY > canvas.current.height - playerSize.height) {
    newY = canvas.current.height - playerSize.height; // Set player to the bottom boundary
  }

  // Prevent player from going off the left of the canvas
  if (newX < 0) {
    newX = 0; // Set player to the left boundary
  }

  // Prevent player from going off the right of the canvas
  if (newX > canvas.current.width - playerSize.width) {
    newX = canvas.current.width - playerSize.width; // Set player to the right boundary
  }

  return { newX, newY };
}

export const handleKeyUp = (event, setDirection) => {
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

export const handleKeyDown = (event, setDirection, moveSpeed) => {
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
