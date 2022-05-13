<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="top">
      <form method='POST', action='member.py'>
          <div style="font-size:22px;">
            &nbspID<br>
            &nbsp<input type="text" name="nick"><br>
            &nbspPW<br>
            &nbsp<input type="password" name="pw">
            <input type="submit" value="submit" style="font-size:15px;">
          </div>
          <!-- <div id="right">
            <br><br>
            <input type="submit" value="submit" style="font-size:20px;" onclick="location.href(https://117.16.24.58/members-test/member.php)">
          </div> -->
      </form>
    </div>

    <div id="bottom" style="text-align:center;">
        <hr>
        <br><br>
        <h1>Hello</h1>
        We provide location-based services<br>
        Sign in to use our service<br>
        <br>
        You don't have an account?<br>
        <br>
        <button onclick="location.href='https://117.16.24.58/manager4/signup.php'" style="font-size:15px">sign up</button>
    </div>

</body>
</html>
