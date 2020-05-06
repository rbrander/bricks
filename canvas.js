// canvas.js

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const update = (tick) => {}
const draw = (tick) => {
  ctx.fillStyle = '#000030'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // display mouse info
  if (mouseState.x !== undefined && mouseState.y !== undefined) {
    ctx.fillStyle = 'white'
    ctx.font = '30px Arial'
    ctx.textBaseline = 'top'
    ctx.fillText(`Mouse: (${mouseState.x}, ${mouseState.y}) isDown: ${mouseState.button.isDown}`, 20, 20)
  }
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
