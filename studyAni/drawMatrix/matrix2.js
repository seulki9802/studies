export class Matrix {
  constructor(x, y, startX, startY) {
    this.x = x;
    this.y = y;

		this.matrix = []
    for (var i = 0; i < this.x; i ++) {
      this.matrix[i] = [];
      for (var k = 0; k < this.y; k ++) {
        this.matrix[i][k] = 0;
      }
    }

    this.startX = startX;
    this.startY = startY;
    this.width = startX;
    this.height = startY;

    this.roomWidth = this.width / this.x;
    this.roomHeight = this.height / this.y;
    this.radius = this.roomWidth / 10;
  }

  animate(ctx) {
    ctx.save();

    for (var i = 0; i < this.x; i++) {
      for (var k = 0; k < this.y; k++) {
        ctx.beginPath();

        if(this.matrix[i][k].onClick) { ctx.fillStyle = "white";}
        else { ctx.fillStyle = "black";}

        ctx.moveTo(this.matrix[i][k].x, this.matrix[i][k].y);

        ctx.arc(this.matrix[i][k].x, this.matrix[i][k].y,
              	this.matrix[i][k].r, 0, Math.PI * 2);

        ctx.fill();
        ctx.closePath();

      }
    }

    ctx.restore();
  }

  resize() {
    for (var i = 0; i < this.x; i ++) {
      for (var k = 0; k < this.y; k ++) {
        this.matrix[i][k] = {x: this.roomWidth / 2 + this.startX + this.roomWidth * i,
                             y: this.roomHeight / 2 + this.startY + this.roomHeight * k,
                             r: this.radius,
                             onClick:  0};
      }
    }
  }
}
