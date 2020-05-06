const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const resize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resize()
window.addEventListener('resize', resize)

const update = (tick) => {}
const draw = (tick) => {
  ctx.fillStyle = '#000030'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const loop = (tick) => {
  update(tick)
  draw(tick)
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
