const P12 = Math.PI * 2;

export class Polygon {
  constructor(x, y, radius, sides) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.rotate = 0;
  }

  animate(ctx, moveX) {
    //draw polygon
    ctx.save();

    const angle = P12 / this.sides;
    const angle2 = P12 / 4;

    ctx.translate(this.x, this.y);

    this.rotate -= moveX * 0.008;
    ctx.rotate(this.rotate)

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      //color 1
      // if (i % 2) { ctx.fillStyle = "black"; }
      // else { ctx.fillStyle = "white"; }

      //color 2 --> 이 색깔맘에 듦
      var r = 255 / 1 / this.sides * i;
      var g = 255 / 2 / this.sides * i;
      ctx.fillStyle = `rgb(${r}, ${g}, 60)`

      //color 3
      // ctx.fillStyle = "rgb(0, 255," + Math.floor(255 / 2 / this.sides * i) + ")"

      //color 4 --> 색 지정
      // COLORS = []


      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(((360 / this.sides) * i + 45) * Math.PI / 180);
      ctx.beginPath();
      for (let j = 0; j < 4; j++) {
        const x2 = 80 * Math.cos(angle2 * j);
        const y2 = 80 * Math.sin(angle2 * j);
        (j == 0) ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      }
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
    ctx.restore();

    //draw center point
    ctx.save();
    ctx.fillStyle = "white"
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius/30, 0, P12);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
