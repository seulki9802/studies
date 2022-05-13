import {Polygon} from './polygon.js'

class App {
  constructor() {
    var cardElement = document.getElementById("card"),
    		cardWidth = cardElement.clientWidth,
        cardHeight = cardElement.clientHeight;

    this.canvas = document.createElement('canvas');
    document.getElementById("card").appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

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
    this.pixelRatio = 1;

    var cardElement = document.getElementById("card");
    this.stageWidth = cardElement.clientWidth;
    this.stageHeight = cardElement.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio); //왜 하는지?

    this.polygon = new Polygon(
      //--------------circle--------------
      this.stageWidth / 2, //x
      - this.stageHeight / 3, //y
      // 0,
      this.stageHeight / 1.1, //radius
      10 //sides
      );
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveX *= 0.92;

    this.polygon.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    if (e.clientY < this.stageHeight) {
      this.isDown = true;
      this.moveX = 0;
      this.offsetX = e.clientX; //for moving
      // this.onclick = e.clientX; //for click
    }
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }

  onUp(e) {
    this.isDown = false;
    // if (this.onclick == e.clientX) {
    //   this.moveX = 0;
    // }
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
