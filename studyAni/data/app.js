import {DataRefine} from './dataRefine17.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.isDown = false;
    this.moveY = 0;
    this.offsetY = 0;

    this.moveX = 0;
    this.offsetX = 0;

    // window.requestAnimationFrame(this.animate.bind(this));
    this.animate();

    document.addEventListener('pointerdown', this.onDown.bind(this), false)
    document.addEventListener('pointermove', this.onMove.bind(this), false)
    document.addEventListener('pointerup', this.onUp.bind(this), false)
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

		this.dataRefine = new DataRefine(this.stageWidth, this.stageHeight, this.ctx);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.dx += 1;
    this.dataRefine.startPos(this.moveY, this.moveX);
    this.dataRefine.animate();
  }

  onDown(e) {
    this.isDown = true;
    this.moveY = 0;
    this.offsetY = e.clientY;

    this.moveX = 0;
    this.offsetX = e.clientX;

    this.dataRefine.down();
  }

  onMove(e) {
    if (this.isDown) {
      this.moveY = e.clientY - this.offsetY;
      this.offsetY = e.clientY;

      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
	}

  onUp(e) {
    this.isDown = false;
  }

}

window.onload = () => {
  new App();
};
