var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

console.log(canvas.width, canvas.height);

var backgnd = {
  n : 5,
  m : 7,
  w : canvas.width / 5,
  h : canvas.height / 7,
  draw() {
    for (var i = 0; i < this.n; i ++) {
      for (var k = 0; k < this.m; k ++) {
        ctx.strokeRect(this.w * i, this.h * k, this.w, this.h)
      }
    }
  }
}

var fish = {
  x : backgnd.w / 4,
  y : backgnd.h / 4,
  w : backgnd.w / 2,
  h : backgnd.h / 2,
  draw() {
    ctx.save();
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
};

class Wall {
  constructor() {
		var x = Math.floor(Math.random() * (backgnd.n - 0 + 1)) + 0,
    		y = Math.floor(Math.random() * (backgnd.m - 0 + 1)) + 0,
        status = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    this.status = status;
		this.w = backgnd.w;
    this.h = backgnd.h;
    this.x = this.w * x;
    this.y = this.h * y;
    this.thick = 5;
	}

  draw() {
		ctx.save();
    ctx.fillStyle = 'red';
    if (this.status) {
      ctx.fillRect(this.x, this.y, this.w, this.thick);
    } else {
      ctx.fillRect(this.x, this.y, this.thick, this.h);
    }
  }
}

var animation;
var timer = 0;
var walls = []
function frame() {
  animation = requestAnimationFrame(frame);
  timer ++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgnd.draw();

  //create 5 walls
	if (timer % 60 == 0 && walls.length < 5) {
    walls.push(new Wall())
    console.log(walls)
  }
  //draw all walls
  walls.forEach((item) => {
    item.draw();
  });

  //move my fish
  if (timer % 60 == 0) {
    fish.x += backgnd.w/2
  }
  fish.draw();
}

frame();
