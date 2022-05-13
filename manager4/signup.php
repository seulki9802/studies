<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="style.css">
</head>
<body onload="loadDemo()">

  <div id="top" style="text-align:center;">
    <h1>Create your count</h1>
    <hr>
  </div>
  <div id="bottom" style="text-align:center;">
    <form method='POST', action='checksign.py'>
      &nbspID<br>
      &nbsp<input type="text" name="nick"><br>
      &nbspPW<br>
      &nbsp<input type="password" name="pw"><br>
      &nbspEmail<br>
      &nbsp<input type="text" name="mail"><br><br>
      &nbsp<input type="submit" value="create account" style="font-size:15px;">
    </form>
  </div>

</body>
</html>
