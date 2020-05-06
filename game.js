// game.js

const gameState = {
  paddle: {
    x: undefined, // middle of the paddle relative to the canvas
    width: 100 // pixels
  }
}

const updateGame = (tick) => {
  if (mouseState.x !== undefined) {
    gameState.paddle.x = mouseState.x
  }
}

const drawGame = (tick) => {
  // draw paddle
  ctx.fillStyle = 'white'
  ctx.fillRect(gameState.paddle.x - gameState.paddle.width / 2, canvas.height - 50, gameState.paddle.width, PADDLE_HEIGHT)
}

const initGame = () => {
  gameState.paddle.x = canvas.width / 2
  console.log('game initialized')
}
