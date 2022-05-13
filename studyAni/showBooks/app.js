import {Books} from './books3.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

		this.color = "white";
    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;

    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);

    this.canvas.addEventListener("touchstart", this.touchDown.bind(this), false);
    this.canvas.addEventListener("touchmove", this.touchMove.bind(this), false);
    this.canvas.addEventListener("touchend", this.touchUp.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio); //왜 하는지?

    this.books = new Books(this.stageWidth, this.stageHeight);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    // this.moveX *= 0.8;
    this.books.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    this.isDown = true;
    // this.moveX = 0;
    this.offsetX = e.clientX;
    this.color = "black";
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }

  onUp(e) {
    this.isDown = false;
    // this.color = "white";
  }

  touchDown(evt) {
   this.color = "pink";
	}

  touchMove(evt) {
    evt.preventDefault();
    var t = evt.changedTouches;
    this.touchX = t[0].screenX;
    this.touchY = t[0].screenY;
  }

  touchUp(evt) {
		this.color = "gray";
    this.isDown = false;
  }
}

new App();
