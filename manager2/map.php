<!DOCTYPE html>
<html>
<head>
  <!-- 지도꺼 -->
  <style>html, body {width: 100%;height: 100%;margin: 0;padding: 0;}</style>
  <style>#map {position:absolute;top:0;bottom:0;right:0;left:0;}</style>
  <script src="https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.js"></script>
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.css"/>
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/> -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css"/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.css"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/python-visualization/folium/folium/templates/leaflet.awesome.rotate.min.css"/>

  <meta name="viewport" content="width=device-width,
      initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<style>
  #seulki_map {
      position: relative;
      width: 50.0%;
      height: 35.0%;
      left: 25.0%;
      top: 25.0%;
    }
</style>
  <!-- 내꺼 -->
  <style>html, body {width: 100%;height: 100%;margin: 0;padding: 0;}</style>

  <style>
      #left{
        position: relative;
        width: 33.0%;
        height: 100.0%;
        float: left;
      }
      #right{
        position: relative;
        width: 75.0%;
        height: 100.0%;
        float: center;
      }
      #r-right{
        position: relative;
        width: 35.0%;
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
  }dd
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

    <div id="left">
      <iframe width=100% height=100% ></iframe>
      <div id="center">
        <form method='POST' action='map.php'>
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

    <div id="left">
      <div class="folium-map" id="seulki_map" ></div>
    </div>

</body>
<script>

var latitude = <?php echo $latitude ?>;
var longitude = <?php echo $longitude ?>;

var seulki_map = L.map(
    "seulki_map",
    {
        center: [latitude, longitude],
        crs: L.CRS.EPSG3857,
        zoom: 14,
        zoomControl: true,
        preferCanvas: false,
    }
);

var base = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    // {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
).addTo(seulki_map);

var pin0 = L.marker(
    [latitude, longitude],
    {}
).addTo(seulki_map);

  var popup0 = L.popup({"maxWidth": "100%"});


  var content0 = $(`<div id="content0" style="width: 100.0%; height: 100.0%;">0</div>`)[0];
  popup0.setContent(content0);


pin0.bindPopup(popup0);



</script>

</html>
