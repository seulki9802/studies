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
    ctx.fillStyle = "Black";
    ctx.beginPath();

    const angle = P12 / this.sides;

    ctx.translate(this.x, this.y);

    this.rotate -= moveX * 0.008;
    ctx.rotate(this.rotate)

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      (i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      
    }

    ctx.fill();
    ctx.closePath();
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
