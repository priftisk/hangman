const WING_LENGTH = 12;

export function drawBird(ctx, newX, newY, playerSize) {
  ctx.current.fillStyle = "#9b6ec2";
  ctx.current.fillRect(newX, newY, playerSize.width, playerSize.height);
  // Start first arc
  ctx.current.beginPath();
  ctx.current.arc(
    newX + playerSize.width / 4,
    newY + playerSize.height / 4,
    2,
    0,
    2 * Math.PI
  );
  ctx.current.fillStyle = "black";
  ctx.current.fill();
  ctx.current.strokeStyle = "#deaa50";
  ctx.current.stroke();

  // Start second arc
  ctx.current.beginPath();
  ctx.current.arc(
    newX + (3 * playerSize.width) / 4,
    newY + playerSize.height / 4,
    2,
    0,
    2 * Math.PI
  );
  ctx.current.fillStyle = "black";
  ctx.current.fill();
  ctx.current.strokeStyle = "#deaa50";
  ctx.current.stroke();
  drawLeftLine(ctx, newX, newY, playerSize);
  drawRightLine(ctx, newX, newY, playerSize);
}

export function drawTopLine(ctx, newX, newY, playerSize) {
  ctx.current.beginPath();
  ctx.current.moveTo(newX + playerSize.width / 2, newY);
  ctx.current.lineTo(newX + playerSize.width / 2, newY - WING_LENGTH);
  ctx.current.stroke();
}

export function drawBottomLine(ctx, newX, newY, playerSize) {
  ctx.current.beginPath();
  ctx.current.moveTo(newX + playerSize.width / 2, newY + playerSize.height);
  ctx.current.lineTo(
    newX + playerSize.width / 2,
    newY + playerSize.height + WING_LENGTH
  );
  ctx.current.stroke();
}

export function drawLeftLine(ctx, newX, newY, playerSize) {
  let angle = 5;
  ctx.current.beginPath();
  ctx.current.moveTo(newX, newY + playerSize.height / 2);
  ctx.current.lineWidth = 2;
  ctx.current.lineTo(newX - WING_LENGTH, newY + playerSize.height / 2 - angle);
  ctx.current.strokeStyle = "yellow";
  ctx.current.stroke();
}

export function drawRightLine(ctx, newX, newY, playerSize) {
  let angle = 5;
  ctx.current.beginPath();
  ctx.current.moveTo(newX + playerSize.width, newY + playerSize.height / 2);
  ctx.current.lineWidth = 2;
  ctx.current.lineTo(
    newX + playerSize.width + WING_LENGTH,
    newY + playerSize.height / 2 - angle
  );
  ctx.current.strokeStyle = "yellow";
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

// export function drawEnemy(ctx, enemy) {
//   ctx.current.beginPath();
//   ctx.current.arc(enemy.x, enemy.y, 10, 0, 2 * Math.PI);
//   ctx.current.fillStyle = "black";
//   ctx.current.fill();
// }

export function drawPipePair(ctx, canvasSize, pipe, distanceBetweenPipes) {
  const pipeWidth = 24;

  ctx.current.beginPath();

  //Draw the bottom pipe
  ctx.current.moveTo(pipe.x, canvasSize.height); // Start from pipe's new position
  ctx.current.lineCap = "round";
  ctx.current.lineTo(pipe.x, pipe.y + distanceBetweenPipes); // Draw to updated position
  ctx.current.lineWidth = pipeWidth;
  ctx.current.strokeStyle = "green";
  ctx.current.stroke();

  //Draw the top pipe
  ctx.current.moveTo(pipe.x, 0); // Start from pipe's new position
  ctx.current.lineTo(pipe.x, pipe.y - distanceBetweenPipes); // Draw to updated position
  ctx.current.lineWidth = pipeWidth;
  ctx.current.stroke();
  drawTargetBetweenPipes(ctx, pipe);
}

function drawTargetBetweenPipes(ctx, pipe) {
  ctx.current.beginPath();
  ctx.current.arc(pipe.x, pipe.y, 4, 0, 2 * Math.PI);
  ctx.current.fillStyle = "green";
  ctx.current.fill();
  ctx.current.lineWidth = 2;
  ctx.current.strokeStyle = "red";
  ctx.current.stroke();
}


export function checkIfHitTarget(pipes, newX, newY, playerSize){
  return pipes.some((pipeCenter) => {
    const playerLeft = newX;
    const playerRight = newX + playerSize.width;
    const playerTop = newY;
    const playerBottom = newY + playerSize.height;

    const pipeLeft = pipeCenter.x - 2;
    const pipeRight = pipeCenter.x + 2; 
    const pipeTop = pipeCenter.y - 2;  
    const pipeBottom = pipeCenter.y + 2; 

    return (
      playerRight > pipeLeft &&
      playerLeft < pipeRight &&
      playerBottom > pipeTop &&
      playerTop < pipeBottom
    );
  })
}