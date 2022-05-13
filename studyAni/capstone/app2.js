import {DataRefine} from './capstone.js'

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

    this.dx = 0;

    window.requestAnimationFrame(this.animate.bind(this));
    this.animate();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
		this.dataRefine = new DataRefine(this.stageWidth, this.stageHeight, this.ctx, 25);

  }

  animate() {
    this.dx += 1
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.dataRefine.animate();
  }

}

window.onload = () => {
  new App();
};
