// game.js

const gameState = {
  paddle: {
    x: undefined, // middle of the paddle relative to the canvas
    y: undefined, // top of the paddle relative to the canvas
    height: 25, // pixels
    width: 100 // pixels
  },
  ball: {
    x: undefined,
    y: undefined,
    radius: 10, // pixels
    isLaunched: false, // indicates if the ball is moving or stuck to the paddle
    xVel: 5,
    yVel: -5
  }
}

const updateGame = (tick) => {
  // update paddle position based on mouse position
  if (mouseState.x !== undefined) {
    gameState.paddle.x = mouseState.x
  }

  if (gameState.ball.isLaunched) {
    // move the ball
    gameState.ball.x += gameState.ball.xVel
    gameState.ball.y += gameState.ball.yVel

    // bounds checking the X
    // if the ball goes off the right side of the screen
    if (gameState.ball.x + gameState.ball.radius > canvas.width) {
      gameState.ball.x = canvas.width - gameState.ball.radius // put the ball back on the screen
      gameState.ball.xVel *= -1 // reverse direction
    } else // if the ball goes off the left side of the screen
    if (gameState.ball.x - gameState.ball.radius < 0) {
      gameState.ball.x = gameState.ball.radius // put the ball back on the screen
      gameState.ball.xVel *= -1 // reverse direction
    }

    // bounds checking the Y
    // if the ball goes off the top side of the screen
    if (gameState.ball.y - gameState.ball.radius < 0) {
      gameState.ball.y = gameState.ball.radius // put the ball back on the screen
      gameState.ball.yVel *= -1 // reverse direction
    } else // ball is below paddle top
    if (gameState.ball.y + gameState.ball.radius > canvas.height - gameState.paddle.height * 2 ) {
      // Now check if the ball hit the paddle, or didn't
      const hitPaddle = (gameState.ball.x > (gameState.paddle.x - gameState.paddle.width / 2) && gameState.ball.x < (gameState.paddle.x + gameState.paddle.width / 2))

      // ball hit within the paddle bounds
      if (hitPaddle) {
        gameState.ball.y = canvas.height - gameState.paddle.height * 2 - gameState.ball.radius // put the ball back on top of the paddle
        gameState.ball.yVel *= -1 // reverse direction
      } else {
        // reset the ball by reset the launched status
        gameState.ball.isLaunched = false
      }
    }
  } else {
    // update the ball position to based on paddle position until released
    gameState.ball.x = gameState.paddle.x
    // check if the ball should be launched by checking if the mouse was clicked
    if (mouseState.button.clicked) {
      mouseState.button.clicked = false
      gameState.ball.isLaunched = true
    }
  }
}

const drawPaddle = (tick) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(gameState.paddle.x - gameState.paddle.width / 2, canvas.height - 50, gameState.paddle.width, PADDLE_HEIGHT)
}

const drawBall = (tick) => {
  const { x, y, radius } = gameState.ball
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

const drawGame = (tick) => {
  drawPaddle(tick)
  drawBall(tick)
}

const initGame = () => {
  gameState.paddle.x = canvas.width / 2
  gameState.paddle.y = canvas.height - gameState.paddle.height * 2
  gameState.ball.x = gameState.paddle.x
  gameState.ball.y = gameState.paddle.y - gameState.ball.radius
  console.log('game initialized')
}
