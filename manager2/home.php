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

<body>

    <div id="left">
      <form method='POST', action='member.php'>
        <div id="center">
          <h2>&nbspSign in</h2>
          &nbspID<br>
          &nbsp<input type="text" name="nick"><br>
          &nbspPW<br>
          &nbsp<input type="password" name="pass"><br>
          <br>
          &nbsp<input type="submit" value="submit" style="font-size:25px;" onclick="location.href(https://117.16.24.58/members-test/member.php)">
          <br>&nbsp
        </div>
      </form>
    </div>

    <div id="right">
      <iframe width=100% height=100% ></iframe>
      <div id="center" style="font-size:28px;">
        <h1>Hello</h1>
        <h2>We provide location-based services<h2>
        <h2>Sign in to use our service<h2>
      </div>
    </div>

</body>
</html>
