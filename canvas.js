// canvas.js

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const PADDLE_HEIGHT = 25 // pixels

const update = (tick) => {
  updateGame(tick)
}

const draw = (tick) => {
  // Clear background
  ctx.fillStyle = '#000030'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawGame(tick)
}

const loop = (tick) => {
  update(tick)
  draw(tick)
  requestAnimationFrame(loop)
}

const resize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const initCanvas = () => {
  resize()
  window.addEventListener('resize', resize)
  requestAnimationFrame(loop)
  console.log('canvas initialized')
}
