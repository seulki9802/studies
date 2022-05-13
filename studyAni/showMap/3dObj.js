console.log("!");
  // ==========================
  // 초기화 부분 시작 ( 이 부분은 문서에서 한번만 수행되면 됩니다 )
  // ==========================
  // 3차원 세계
  var scene = new THREE.Scene();

  // 카메라 ( 카메라 수직 시야 각도, 가로세로 종횡비율, 시야거리 시작지점, 시야거리 끝지점
  var camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000 );

  // 렌더러 정의 및 크기 지정, 문서에 추가하기
  var cylinderElement = document.getElementById("cylinder"),
      cylinderWidth = cylinderElement.clientWidth,
      cylinderHeight = cylinderElement.clientHeight;

  var renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
  renderer.setSize( cylinderWidth, cylinderHeight )
  // renderer.setSize( window.innerWidth, window.innerHeight )

  cylinderElement.appendChild( renderer.domElement );

  // 3 lighnts
  var light1 = new THREE.PointLight( 0xffffff, 1, 100 );
  light1.position.set( 5, 5, 5 );
  scene.add( light1 );

  var light2 = new THREE.PointLight( 0xffFFFF, 1, 100 );
  light2.position.set( 7, -5, 6 );
  scene.add( light2 );

  var light3 = new THREE.PointLight( 0xffFFFF, 1, 100 );
  light3.position.set( -7, 3, 3 );
  scene.add( light3 );

  // 정육면체 하나 만들기
  var cube = new THREE.Mesh(
    new THREE.BoxGeometry( 1, 2, 1 ),
    new THREE.MeshStandardMaterial({ color: 0x0087E6 })
  );
	console.log(cube.position)
  cube.position.y = 2;

  // 생성한 모델을 장면에 추가합니다.
  scene.add( cube );


  // 카메라의 Z좌표를 물체에서 5 정도 떨어진 지점에 위치합니다.
  camera.position.z = 5;
  camera.position.y = 2;

  // ==========================
  // 초기화 부분 끝
  // ==========================

  var framesPerSecond=60;

  // 에니메이션 효과를 자동으로 주기 위한 보조 기능입니다.
  var animate = function () {
    // 프레임 처리
    setTimeout(function() {
       requestAnimationFrame(animate);
    }, 1000 / framesPerSecond);

    //    : 애니메이션 영역
    cube.rotation.y += 0.02;

    // 랜더링을 수행합니다.
    renderer.render( scene, camera );
  };

  // animate()함수를 최초에 한번은 수행해주어야 합니다.
  animate();
