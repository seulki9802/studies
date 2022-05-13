class canvasDrawer {
  constructor(canvasID, backgroundColor) {
    this.canvas = document.getElementById(canvasID);
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
      this.ctx.fillStyle = backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.size = 20;
    this.arr = this.earlyBlock();
    }
  }

  blocks(){
    var block0 = [
      [1, 1],
      [1, 1],
      "red"
    ];
    var block1 = [
      [1],
      [1],
      [1],
      [1],
      [1],
      "blue"
    ];
    var block2 = [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
      "yellow"
    ];
    var block3 = [
      [1, 0],
      [1, 1],
      [1, 0],
      "gray"
    ]

    return [block0, block1, block2, block3]
  }

  babyBlock(x, y, block, newBlock, arr){
    var x = x;
    var y = y;
    var block = block;

    for ( var i in block.slice(0, -1) ) {
      for (var k in block[i]){
        if (block[i][k] == 1){
          i = Number(i);
          k = Number(k);
          this.ctx.fillRect((x + k) * this.size, (y + i) * this.size, this.size * 1, this.size * 1);
          if ( arr[y + i][x + k] == 1){
            newBlock = 1;
          }
        }
      }
    }
    return newBlock;
  }

  earlyBlock(x, y, arr) {
    //배열 생성
    var arr = new Array(this.canvas.height / this.size); //30 나중에 고치기
    for ( var i = 0; i < arr.length; i++ ) {
      arr[i] = new Array(this.canvas.width / this.size); //15 나중에 고치기
      for ( var k = 0; k < arr[i].length; k++ ) {
        arr[i][k] = 0;
      }
    }
    //기본 블럭
    for ( var k in arr[arr.length - 1] ){
      arr[arr.length - 1][k] = 1;
    }
    return arr;
  }

  parentBlock(x, y, block){
    var arr = this.arr;

    for ( var i in block ) {
      for ( var k in block ) {
        if ( block[i][k] == 1 ) {
          // console.log(x + Number[i], y + Number[k])
          // arr[x + Number(k)][y + Number(i)] = 1;
          arr[y + Number(i) - 1][x + Number(k)] = 1;
        }
      }
    }
    //
    // this.ctx.fillStyle = "black";
    // for ( var i in arr ) {
    //   for ( var k in arr ) {
    //     if ( arr[i][k] == 1 ) {
    //       this.ctx.fillRect(k * this.size, i * this.size, this.size * 1, this.size * 1);
    //     }
    //   }
    // }

    this.arr = arr;
  }

  downEraser(x, y, block){
    var block = block;
    var x = x;
    var y = y;
    var k = 0;
    while ( k < block[0].length ){
      var i = 0;
      while ( i < block.slice(0, -1).length ) {
        if ( block[i][k] == 1 ){ //block은 x, y가 바뀐 행렬임
          this.ctx.clearRect(( x + k ) * this.size, (y + i - 1 ) * this.size, this.size, this.size);
          break;
        }
        i += 1;
      }
      k += 1;
    }
  }

  leftEraser(x, y, block){
    var block = block;
    var x = x;
    var y = y;
    var i = 0;
    while( i < block.slice(0, -1).length ){ // 첫째줄
      var k = block[0].length - 1;
      while( k >= 0 ){
        if ( block[i][k] == 1 ){
          this.ctx.clearRect(( x + k  +  1) * this.size, (y + i) * this.size, this.size, this.size);
          break;
        }
        k -= 1;
      }
      i += 1;
    }
    if ( x < 0 ) {
      x = 0;
    }
    return x
  }

  rightEraser(x, y, block){
    var block = block;
    var x = x;
    var y = y;
    var i = 0;
    while ( i < block.length ) {
      var k = 0;
      while ( k < block[0].length ) {
        if ( block[i][k] == 1 ){
          this.ctx.clearRect(( x + k - 1 ) * this.size, (y + i) * this.size, this.size, this.size);
          break;
        }
        k += 1;
      }
      i += 1;
    }
    if ( x + (block[0].length - 1) > this.canvas.width/this.size - 1 ) {
      x = (this.canvas.width/this.size - 1) - (block[0].length - 1);
    }
    return x
  }

  randomBlock() {
    var min = Math.ceil(0);
    var max = Math.floor(this.blocks().length - 1);
    var r = Math.floor(Math.random() * (max - min + 1)) + min;
    var block = this.blocks()[r];
    var color = block[block.length -1];
    this.ctx.fillStyle = color
    return block
  }

  moveBlock(){
    var x = 5;
    var y = 0;
    var arr = this.arr;
    var block = this.randomBlock()
    var newBlock = 0;
    this.babyBlock(x, y, block, newBlock, arr);

    const div = document.getElementById('left');
    div.addEventListener('click', (event) => {
      x -= 1;
      if ( newBlock < 1 ) {
        x = this.leftEraser(x, y, block);
        newBlock = this.babyBlock(x, y, block, newBlock, arr);
      }
    });

    const div2 = document.getElementById('down');
    div2.addEventListener('click', (event) => {
      y += 1;
      if ( newBlock < 1 ) {
        this.downEraser(x, y, block);
        newBlock = this.babyBlock(x, y, block, newBlock, arr);
      }
      if ( newBlock == 1 ) {
        this.parentBlock(x, y, block);
        this.moveBlock();
        newBlock += 1;
      }
    });

    const div3 = document.getElementById('right');
    div3.addEventListener('click', (event) => {
      x += 1;
      if ( newBlock < 1 ) {
        x = this.rightEraser(x, y, block);
        newBlock = this.babyBlock(x, y, block, newBlock, arr);
      }
    });

  }

  test(){
    var x = 5;
    var y = 0;
    var arr = this.earlyBlock(x, y, arr);
  }
}
