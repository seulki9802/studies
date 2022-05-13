// const say = function () {
//   console.log(this);
//   console.log("Hello, my name is", this.name);
// }

const obj = {name: 'Seulki', feel: 'angry'};
const say = function(city) {
  console.log(`Hello, my name is ${this.name}, I live in ${city}, Now I feel ${this.feel}`);
}

// say("korea") // --> this가 비어있기 때문에 안 됨. ERROR!
// html <script> tag 안에서 tihs를 출력하면 window가 출력됨.
// 근데 이케 js 파일 넣ㅇ어서 쓰면 window가 안 들어거ㅏ더라고? this에

//call과 apply는 this에 무엇을 담을지 선택 할 수 있다.
say.call(obj, "Korea");
say.apply(obj, ["Korea"]);

//bind도 마찬가지인데 위와 다른 점은 실행을 안 시킴! 위에는 say 실행 해버림
//대신 함수를 리턴해줌 boundSay가 obj를 this로 갖는 하나의 함수가 된다고 이해된다.
const boundSay = say.bind(obj);
boundSay("Korea");
