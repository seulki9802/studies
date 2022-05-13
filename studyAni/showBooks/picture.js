export class Picture {
  constructor(x, y, width, info, on, on2) {
    this.initWidth = width;
    this.width = width;
    this.height = this.width * 1.618;
    this.x = x;
    this.y = y;
    this.info = info;
    this.on = on;
  }

  animate(ctx) {
    ctx.save();

    if (this.on) { ctx.strokeStyle = "yellow"; }
    else { ctx.strokeStyle = "green"; }

    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.font = '30px Arial';
    ctx.textBaseline = "hanging";
    ctx.strokeText(this.info, this.x, this.y);

    if (this.on && this.width < this.initWidth * 2) {
      var speed = 1.01
      this.x -= this.width * (speed - 1)/2;
      this.y -= this.height * (speed - 1)/2;
      this.width *= speed;
      this.height *= speed;
    }

    ctx.restore();
  }

  onClick(x, y) {
    if (x > this.x && x < this.x + this.width &&
    		y > this.y && y < this.y + this.height) {
          this.on = 1;
        }
  }

}
