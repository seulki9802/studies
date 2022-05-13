import {Cylinder} from './cylinder.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.getElementById("cylinder").appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.moveX = 0;
    this.isDown = false;

    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);

    this.canvas.addEventListener("touchstart", this.touchDown.bind(this), false);
    this.canvas.addEventListener("touchmove", this.touchMove.bind(this), false);
    this.canvas.addEventListener("touchend", this.touchUp.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.pixelRatio = 1; // this is fucking problem

    this.stageWidth = document.getElementById("cylinder").clientWidth;
    this.stageHeight = document.getElementById("cylinder").clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio); //왜 하는지?
    this.cylinder = new Cylinder(this.stageWidth, this.stageHeight);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.moveX *= 0.99;
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.cylinder.animate(this.ctx);
		// this.gallery.animate(this.ctx, this.moveX, this.isDown);
  }

  onDown(e) {
    this.isDown = true;
    this.offsetX = e.clientX; //for moving
    this.onclick = e.clientX; //for click
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }

  onUp(e) {
    this.isDown = false;
    if (this.onclick == e.clientX) {
      this.moveX = 0;
    }
  }


  touchDown(evt) {
	}

  touchMove(evt) {
    evt.preventDefault();
    var t = evt.changedTouches;
    this.touchX = t[0].screenX;
    this.touchY = t[0].screenY;
  }

  touchUp(evt) {
    this.isDown = false;
  }
}

new App();
