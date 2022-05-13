<!DOCTYPE html>
<html>
<head>
  <style>html, body {width: 100%;height: 100%;margin: 0;padding: 0;}</style>
  <style>
      #left{
        position: relative;
        width: 25.0%;
        height: 100.0%;
        float: left;
      }
      #right{
        position: relative;
        width: 75.0%;
        height: 100.0%;
        float: right;
      }
      #center{
        position:absolute;
        top:50%;
        left:30%;
        /* background:#cca58f; */
        transform:translate(-50%, -50%);
        /* text-align:center; */
        font-size:35px;
      }
    </style>
    <script>
      function loadDemo() {
          if (navigator.geolocation) {
              // alert("Your browser supports geolocation service.");
              getloc();
          } else {
              alert("Your browser doesn't support geolocation service.");
          }
      }
      function getloc() {
          //navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
          navigator.geolocation.watchPosition(updateLocation, handleLocationError, {maximumAge:2000});
      }
      function updateLocation(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          var accuracy = position.coords.accuracy;
          document.getElementById("latitude").value = latitude;
          document.getElementById("longitude").value = longitude;
          document.getElementById("accuracy").value = accuracy;

          setTimeout(function() {
            document.getElementById("click").click();
          }, 500);

          // var url = 'gps-2.php?latitude='
          //           + encodeURI(latitude)
          //           + '&longitude='
          //           + encodeURI(longitude);
      }
      function handleLocationError(error) {
          switch(error.code) {
          case error.UNKNOWN_ERROR:
              alert("unknown error");
              break;
          case error.PERMISSION_DENIED:
              alert("Permission to use Geolocation was denied");
              break;
          case error.POSITION_UNAVAILABLE:
              alert("unavailable");
              break;
          case error.TIMEOUT:
              alert("timeout error");
              break;
          }
      }
    </script>
</head>
<?php
  if (isset($_POST['nick']))
  {
    $nick = $_POST['nick'];
    $pass = $_POST['pass'];

    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $accuracy = $_POST['accuracy'];

    // $members = fopen("members.txt", "a");
    $members = fopen("members/".$nick.".txt", "a");
    fwrite($members, $nick."&".$latitude."&".$longitude."&".$accuracy."\n");
    fclose($members);
  }
  else
  {
    echo 'error!';
  }
?>
<body onload="loadDemo()">

    <div id="left">
      <div id="center">
        <form method="POST" action="member.php">
          <input type=hidden name="nick" value="<?php echo $nick; ?>">
          <input type=hidden name="pass" value="<?php echo $pass; ?>">
          <input type="submit" value="stop" style="font-size:35px;">
        </form>
      </div>
    </div>

    <div id="right">
      <iframe width=100% height=100% ></iframe>
      <div id="center">
        <form method='POST' action='gps.php'>
          <input type=hidden name="nick" value="<?php echo $nick; ?>">
          <input type=hidden name="pass" value="<?php echo $pass; ?>">
          <h1> latitude </h1>
          <input type='text' id='latitude' name='latitude'>
          <h1> longitude </h1>
          <input type='text' id='longitude' name='longitude'>
          <h1> accuracy </h1>
          <input type='text' id='accuracy' name='accuracy'>
          <input type='submit' id='click'>
        </form>
      </div>
    </div>

</body>
</html>
