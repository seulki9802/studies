export class DataRefine {
  constructor(stageWidth, stageHeight, ctx, fontSize) {
    this.fontSize = fontSize;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.ctx = ctx;
    this.ctx.font = `${this.fontSize}px Arial`;
    this.ctx.textBaseline ="middle";

    this.offset = stageHeight / 15;
    this.startX = stageWidth / 3;
    this.startY = stageHeight / 5;
    this.initY = this.startY

    this.dx = 0;
    this.dx2 = 0;

    this.speed = 1;
    this.moveY = 10;
    this.moveN = 80 / this.moveY * 5;
  }
  line(ctx, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 1000, y);
    ctx.stroke();
    ctx.closePath();
  }

  animate() {
    this.ctx.save();

    // this.dx += 1;
    this.ctx.fillStyle = "black";
    // this.ctx.textAlign = "center";
    var a = this.initY + (this.moveY * this.moveN);
    var dis1 = a - (this.startY + this.dx)
    var dis2 = a - (this.startY + this.dx2)
    this.ctx.font = "30px Arial"
    this.ctx.lineWidth = 5;

    this.ctx.save();
    this.ctx.fillStyle = "blue"
    this.ctx.fillText("distance: " + dis1 * 2 / 100, this.startX * 2, this.initY);
    this.ctx.fillStyle = "red"
    this.ctx.fillText("distance2: " + dis2 * 2 / 100, this.startX - this.ctx.measureText("distance2: 1.00").width, this.initY);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.textAlign = "center";
    this.ctx.fillText("move distnace: " + (this.moveY * 1.6 / 80), this.stageWidth / 2, this.stageHeight / 10)
    this.ctx.restore();

    if( this.startY < this.initY + (this.moveY * this.moveN)) {
      if ( this.dx < this.moveY ) {
        this.dx += this.speed;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "yellow";
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(this.startX * 2, this.startY + this.dx);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "blue";
        this.ctx.setLineDash([8]);
        this.ctx.moveTo(this.startX * 2, this.startY + this.dx);
        this.ctx.lineTo(this.startX * 2, this.initY + (this.moveY * this.moveN));
        this.ctx.stroke();
        this.ctx.closePath();


      }
      else if (this.dx2 < this.moveY ) {
        this.dx2 += this.speed;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "yellow";
        this.ctx.moveTo(this.startX * 2, this.startY + this.dx);
        this.ctx.lineTo(this.startX, this.startY + this.dx2);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "blue";
        this.ctx.setLineDash([8]);

        this.ctx.moveTo(this.startX * 2, this.startY + this.dx);
        this.ctx.lineTo(this.startX * 2, this.initY + (this.moveY * this.moveN));
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.setLineDash([8]);

        this.ctx.moveTo(this.startX, this.startY + this.dx2);
        this.ctx.lineTo(this.startX, this.initY + (this.moveY * this.moveN));
        this.ctx.stroke();
        this.ctx.closePath();

      }
      else {
        this.ctx.beginPath();
        this.ctx.strokeStyle = "yellow";
        this.ctx.moveTo(this.startX * 2, this.startY + this.dx);
        this.ctx.lineTo(this.startX, this.startY + this.dx2);
        this.ctx.stroke();
        this.ctx.closePath();

        this.startY = this.startY + this.dx2
        this.dx = 0;
        this.dx2 = 0;
      }

    }else {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "yellow";
      this.ctx.moveTo(this.startX * 2, this.startY);
      this.ctx.lineTo(this.startX, this.startY);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    // this.ctx.stroke();
    // this.ctx.closePath();

    this.ctx.restore();
  }
}
