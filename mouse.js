// mouse.js

const mouseState = {
  x: undefined,
  y: undefined,
  button: {
    clicked: false,
    isDown: false
  }
}

const onMouseMove = (e) => {
  mouseState.x = e.clientX
  mouseState.y = e.clientY
}

const onMouseDown = (e) => {
  mouseState.button.isDown = true
}

const onMouseUp = (e) => {
  mouseState.button.isDown = false
  mouseState.button.clicked = true
}

const initMouse = () => {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  console.log('mouse initialized')
}