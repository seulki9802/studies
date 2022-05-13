import {Matrix} from './matrix2.js'

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
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

    this.matrix = new Matrix(
      10,
      12,
      this.stageWidth / 3,
      this.stageHeight / 3
    );
    this.matrix.resize();
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.matrix.animate(this.ctx);
  }

  onDown(e) {
    // this.mousePos.x = e.clientX;
    // this.mousePos.y = e.clientY;
  }

  onMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    for (var i = 0; i < this.matrix.x; i++) {
      for (var k = 0; k < this.matrix.y; k++) {
        if (this.mouseX < this.matrix.matrix[i][k].x + this.matrix.radius
            && this.mouseX > this.matrix.matrix[i][k].x - this.matrix.radius
            && this.mouseY > this.matrix.matrix[i][k].y - this.matrix.radius
            && this.mouseY < this.matrix.matrix[i][k].y + this.matrix.radius) {
              this.matrix.matrix[i][k].onClick = 1;
              this.matrix.matrix[i][k].r = 30;
        }
      }
    }
  }

  onUp(e) {
  }
}

window.onload = () => {
  new App();
};
