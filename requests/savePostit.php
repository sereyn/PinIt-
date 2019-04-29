<?php
session_id($_COOKIE["PHPSESSID"]);
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<?php
include("../vars.php");
include("../scripts/logutils.php");
include("../scripts/tools.php");

if(!isset($_SESSION["username"]) || !isset($_POST["id"]) || !isset($_POST["boardid"])){
    exit();
}

$path = "../postits/" . $_POST["boardid"] . "/" . $_POST["id"];

$file = file_put_contents($path, $_POST["text"]);



?>