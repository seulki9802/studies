<html>
<head>
</head>
<?php
if (isset($_POST['test'])) {
  exec("ipconfig", $output);
  echo $output;
  print_r($output);
  $what = 'yes!';
}
else {
  $what = 'no..';
}
echo $what;
?>
<body>
  <form method='post'>
    <button name='test'>test2</button>
  </form>
</body>
</html>
