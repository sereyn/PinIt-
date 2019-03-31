<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>PinIt!</title>

    <link rel="stylesheet" type="text/css" href="index.css">
</head>

<body>
    <?php
    if(isset($_COOKIE["cred_username"])){
        include("./includes/home.php");
    }else{
        include("./includes/login.php");
    }
    ?>
</body>

</html>
