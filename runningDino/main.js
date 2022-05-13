var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
  x : 10,
  y : 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, this.width, this.height);
  }
}

var img1 = new Image();
img1.src = 'cactus.png';

var timer = 0;
var cactuses = [];
var jumpTimer = 0;
var animation;

function frame() {
  animation = requestAnimationFrame(frame);
	timer ++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 == 0) {
    cactuses.push(new Cactus());
  }

  cactuses.forEach((a, i, o)=> {
		if (a.x < 0) {
      o.splice(i, 1); //remove transh
    }
    a.x--;
    isColision(dino, a);
    a.draw();
  })
  if (jumping) {
    dino.y--;
    jumpTimer++;
  } else if (dino.y < 200) {
    dino.y++;
  }
  if (jumpTimer > 100) {
    jumping = false;
    jumpTimer = 0;
  }
  dino.draw();
}

frame();

//colision check
function isColision(dino, cactus) {
	var x_diff = cactus.x - (dino.x + dino.width);
  var y_diff = cactus.y - (dino.y + dino.height);
  if (x_diff < 0 && y_diff < 0) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

var jumping = false;
document.addEventListener('keydown', function(e) {
  if (e.code === 'F4') {
    console.log("?");
    jumping = true;
  }
})
