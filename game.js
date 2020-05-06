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
    isLaunched: false // indicates if the ball is moving or stuck to the paddle
  }
}

const updateGame = (tick) => {
  // update paddle position based on mouse position
  if (mouseState.x !== undefined) {
    gameState.paddle.x = mouseState.x
  }

  // update the ball position to based on paddle position until released
  if (!gameState.paddle.isLaunched) {
    gameState.ball.x = gameState.paddle.x
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
