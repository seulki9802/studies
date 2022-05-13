var canvas2 = document.getElementById("item");
var ctx2 = canvas2.getContext("2d");

var back_parsX = canvas2.width/10;
var back_parsY = canvas2.height/10;
var backWidth = canvas2.width - 2 * back_parsX;
var backHeight = canvas2.height - 2 * back_parsY;

var items = [ {key: "A", skill: "투명화", point: "100", number: 0},
          {key: "S", skill: "돌 폭파", point: "100", number: 0},
          {key: "D", skill: "째깐이", point: "100", number: 0},
          {key: "F", skill: "회복", point: "100", number: 0}];
var itemNumber = items.length;
var itemX = backWidth / itemNumber;

function drawItemBox(){
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.save();
  ctx2.rect(back_parsX, back_parsY, canvas2.width - 2 * back_parsX, canvas2.height - 2 * back_parsY);
  for (i = 0; i < itemNumber; i ++) {
    ctx2.moveTo(back_parsX + (itemX * i), back_parsY);
    ctx2.lineTo(back_parsX + (itemX * i), canvas2.height - back_parsY);
  }
  ctx2.stroke();
  ctx2.restore();
}

function drawItemBox2(){
  ctx2.save();
  for (i = 0; i < itemNumber; i ++) {
    ctx2.rect(back_parsX + (itemX  * i), back_parsY, itemX, canvas2.height - back_parsY * 2);
  }
  for (i = 0; i < itemNumber; i ++) {
  ctx2.stroke();
  ctx2.restore();
  }
}

function drawItem() {
  ctx2.save();
  ctx2.font = "30px Arial";

  for (i = 0; i < itemNumber; i++) {
    ctx2.fillStyle = "blue";

    ctx2.textAlign = "left";
    ctx2.fillText(items[i].key, back_parsX + itemX * i, canvas2.height/3);

    ctx2.textAlign = "right";
    ctx2.fillText(items[i].number, back_parsX + itemX * (i + 1), canvas2.height - back_parsY);

    ctx2.fillStyle = "black";
    ctx2.textAlign = "center";
    ctx2.fillText(items[i].skill, (back_parsX + itemX/2) * (i + 1), canvas2.height/2);
  }
  ctx2.restore();
}
