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
</head>
<?php
if ($_POST["nick"] != "")
{
  $nick = $_POST["nick"];
  if ($_POST["pass"] != "")
  {
    $pass = $_POST["pass"];
  }

  else
  {
    echo "<script>
          alert(\"Please enter your password.\");
          </script>";
    echo "<script>location.replace('home.php');</script>";
  }
}
else
{
  echo "<script>
        alert(\"Please enter your ID.\");
        </script>";
  echo "<script>location.replace('home.php');</script>";
}

?>
<body>

    <div id="left">
      <form method='POST', action='map.php'>
        <input type=hidden name="nick" value="<?php echo $nick; ?>">
        <input type=hidden name="pass" value="<?php echo $pass; ?>">
        <div id="center">
          <h1> Hi,<br> <?php echo $nick; ?> <h1>
            <input type="submit" value="Send Location Data" style="font-size:22px;">
          </form>
          <form method="POST" action="gpsMap.php">
            <input type="submit" value="Check your map" style="font-size:22px;">
        </div>
      </form>
    </div>

    <div id="right">
      <iframe width=100% height=100% ></iframe>
      <div id="center">
        <h1>Choose a service<h1>
      </div>
    </div>

</body>
</html>
