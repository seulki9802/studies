var canvas0 = document.getElementById("score");
var ctx0 = canvas0.getContext("2d");

var canvas = document.getElementById("smile");
var ctx = canvas.getContext("2d");

var gameSpeed = 10;

var userID = 0;
var gameStart = 0;
var lastDraw = 0;
var gameOver = 0;

var gameGauge = 100;
var gameGaugeSize = canvas.height;

var x = canvas.width/8;
var y = canvas.height/3;
var dy = -2.5;
var dx = +2.5;
var runningDistance = 0;
var runningTime = 0;
var now = 0;

var rightPressed = false;
var leftPressed = false;

var smileSize = 20;
var spearSize = canvas.height/10;
var startSpear = spearSize;
var ds = spearSize * 0.005
var spearDirect = 0;

var jump = 0;

var stone01s = [{sec: 0.7, size: 20, speed: 10, startTime: 0, color: "red", number: 0}]; //초당 갯수, 사이즈, 스피드, 시작 시간
var stone02s = [{sec: 2.5, size: 10, speed: 15, startTime: 2, color: "blue", number: 0}];
var stone03s = [{sec: 3, size: 40, speed: 8, startTime: 10, color: "yellow", number: 0}];
var stone04s = [{sec: 8, size: 80, speed: 2, startTime: 20, color: "orange", number: 0}];
var stone05s = [{sec: 4, size: 25, speed: 7, startTime: 100, color: "green", number: 0}];
var stone06s = [{sec: 4.5, size: 10, speed: 25, startTime: 40, color: "black", number: 0}];
