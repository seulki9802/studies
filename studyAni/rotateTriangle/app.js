import {Polygon} from './polygon4.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    console.log("devicePixelRatio= ", window.devicePixelRatio, "pixelRatio= ", this.pixelRatio);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;

    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    window.alert(this.stageWidth);
    this.stageHeight = document.body.clientHeight;
    console.log("clientWidth= ", this.stageWidth, "clientHeight= ", this.stageHeight);

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    console.log("canvasWidth= ", this.canvas.width, "cavnasHeight= ", this.canvas.height);
    this.ctx.scale(this.pixelRatio, this.pixelRatio); //왜 하는지?

    this.polygon = new Polygon(
      //--------------circle--------------
      this.stageWidth / 2, //x
      this.stageHeight / 2, //y
      this.stageHeight / 3, //radius
      10 //sides
      );
      // //--------------some circle--------------
      // this.stageWidth / 2, //x
      // this.stageHeight * (1 + 1/4), //y
      // this.stageHeight / 2 , //radius
      15 //sides
    // );
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveX *= 0.92;

    this.polygon.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 0;
    this.offsetX = e.clientX;
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }

  onUp(e) {
    this.isDown = false;
  }
}

new App();
