// game.js

const NUM_BRICKS_ACROSS = 7
const NUM_BRICKS_DOWN = 3
const BRICK_WIDTH_PADDING = 20
const BRICK_WIDTH = 100
const BRICK_HEIGHT_PADDING = 10
const BRICK_HEIGHT = 25

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
  },
  bricks: []
}

const updateGame = (tick) => {
  // update paddle position based on mouse position
  if (mouseState.x !== undefined) {
    gameState.paddle.x = mouseState.x
  }

  // Clone the ball object and update it, prevBall is used for hit detection
  const prevBall = Object.assign({}, gameState.ball)
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

  // remove bricks that the ball hits
  const collidedBricks = gameState.bricks.filter(brick => brick.collidesWith(gameState.ball))
  if (collidedBricks.length > 0) {
    // In most cases, there will ever only be 1 collision at a time, but in theory there
    // could be many. To simplify this process, onyl one will be processed, and the rest should be
    // processed in the following frames
    const collidedBrick = collidedBricks[0]
    // next, flip the direction of the velocity based side of brick being hit
    // NOTE: this may seem counter-intuitive, as colliding with the vertical here
    //       doesn't mean the ball hit the top or bottom, but rather the prebvious ball
    //       location has its vertical component within the box, thus the horizontal is what was hit
    if (collidedBrick.collidesWithVertical(prevBall)) {
      gameState.ball.xVel *= -1
    } else if (collidedBrick.collidesWithHorizontal(prevBall)) {
      gameState.ball.yVel *= -1
    }
    // update the bricks to include only the bricks that are not colliding
    gameState.bricks = gameState.bricks.filter(brick => !brick.collidesWith(gameState.ball))
  }
}

const drawPaddle = (tick) => {
  ctx.fillStyle = 'white'
  ctx.fillRect(gameState.paddle.x - gameState.paddle.width / 2, canvas.height - 50, gameState.paddle.width, PADDLE_HEIGHT)
}

const drawBall = (tick) => {
  const { x, y, radius } = gameState.ball
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
}

const drawBricks = (tick) => {
  gameState.bricks.forEach(brick => brick.draw(tick))
}

const drawGame = (tick) => {
  drawBricks(tick)
  drawPaddle(tick)
  drawBall(tick)
}

const initGame = () => {
  // initialize state
  gameState.paddle.x = canvas.width / 2
  gameState.paddle.y = canvas.height - gameState.paddle.height * 2
  gameState.ball.x = gameState.paddle.x
  gameState.ball.y = gameState.paddle.y - gameState.ball.radius
  gameState.bricks = []

  // populate bricks
  const bricksWidth = ((NUM_BRICKS_ACROSS-1) * BRICK_WIDTH_PADDING) +
    (NUM_BRICKS_ACROSS * BRICK_WIDTH)
  const margin = (canvas.width - bricksWidth) / 2
  for (let x = 0; x < NUM_BRICKS_ACROSS; x++) {
    for (let y = 0; y < NUM_BRICKS_DOWN; y++) {
      gameState.bricks.push(new Brick(
        x * (BRICK_WIDTH + BRICK_WIDTH_PADDING) + margin,
        y * (BRICK_HEIGHT + BRICK_HEIGHT_PADDING) + margin,
        BRICK_WIDTH,
        BRICK_HEIGHT
      ))
    }
  }

  console.log('game initialized')
}
