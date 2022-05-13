export class Cylinder {
  constructor(cylinderWidth, cylinderHeight) {
    this.stageW = cylinderWidth;
    this.stageH = cylinderHeight;

    this.center = {x: this.stageW / 2, y: this.stageH / 2};
    this.boxW = this.stageH / 2
    this.boxH = this.boxW * 1.618
  }

  animate(ctx) {
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    // ctx.strokeRect(10, 10, 100, 100);

    ctx.arc(this.center.x, this.center.y, 1, 0, Math.PI * 2);

		//center box
		ctx.rect(this.center.x - this.boxW / 2,  //x
      				this.center.y - this.boxH / 2, //y
              this.boxW, this.boxH); //size

    //left box
    ctx.rect(this.center.x - this.boxW / 2 - this.boxW,
    					this.center.y - this.boxH / 2,
            	this.boxW, this.boxH);

		//right box
    ctx.rect(this.center.x - this.boxW / 2 + this.boxW,
              this.center.y - this.boxH / 2,
              this.boxW, this.boxH);

    ctx.stroke();

  }
}
