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

if(strpos($_POST["id"], "..") != false || strpos($_POST["boardid"], "..") != false){
    exit();
}

/* need a user rights verif */

$db = getPDO();

$path = "../postits/" . $_POST["boardid"] . "/" . $_POST["id"];

unlink($path);

?>