<!DOCTYPE html>
<html>
<head>

  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="style.css">

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
    }, 2000);

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
  }
  else
  {
    echo "<script>
          alert(\"Please enter your ID.\");
          </script>";
    echo "<script>location.replace('index.php');</script>";
  }
?>
<body onload="loadDemo()">
  <div id="top">

    <div id="left">
      <form method='POST' action='request_bus2.py'>
        <h4>&nbspSearch for a bus stop</h4>
        &nbsp<input type="text" name="bus_stop">
        &nbsp<input type="submit" value="submit">
        <input type='hidden' id='latitude' name='latitude'><br>
        <input type='hidden' id='longitude' name='longitude'><br>
        <input type='hidden' id='accuracy' name='accuracy'><br>
        <input type='hidden' name='nick' value="<?php echo $nick; ?>">
    </div>
    <div id="right">
    </div>

  </div>

  <div id="bottom">
  </div>
</body>
</html>
