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

    ctx.fillStyle = "black"
    ctx.beginPath();
    for (var i = 0; i < this.x; i++) {
      for (var k = 0; k < this.y; k++) {

        // ctx.rect(this.startX + this.roomWidth * i,
        //          this.startY + this.roomHeight * k,
        //          this.roomWidth,
        //          this.roomHeight)

        ctx.moveTo(this.roomWidth / 2 + this.startX + this.roomWidth * i,
                   this.roomHeight / 2 + this.startY + this.roomHeight * k,)

        ctx.arc(this.roomWidth / 2 + this.startX + this.roomWidth * i,
        				this.roomHeight / 2 + this.startY + this.roomHeight * k,
              	this.radius,
              	0,
              	Math.PI * 2);

        this.matrix[i][k] = {x: this.roomWidth / 2 + this.startX + this.roomWidth * i,
                             y: this.roomHeight / 2 + this.startY + this.roomHeight * k}
      }
    }
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

}
