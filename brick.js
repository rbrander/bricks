// brick.js

function Brick(x, y, width, height) {
  // x and y are top-left corner of brick
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}

Brick.prototype.collidesWithHorizontal = function({ x, y, radius }) {
  return (x + radius > this.x && x - radius < this.x + this.width)
};

Brick.prototype.collidesWithVertical = function({ x, y, radius }) {
  return (y + radius > this.y && y - radius < this.y + this.height)
};

Brick.prototype.collidesWith = function({ x, y, radius }) {
  return this.collidesWithHorizontal({ x, y, radius })
    && this.collidesWithVertical({ x, y, radius })
}

Brick.prototype.draw = function(tick) {
  ctx.fillStyle = 'white'
  ctx.fillRect(this.x, this.y, this.width, this.height)
}
