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

if(!isset($_SESSION["username"]) || !isset($_POST["title"])){
    exit();
}

$db = getPDO();

$req = $db->prepare("INSERT INTO `boards` (`name`, `owner`) VALUES (:n, :o);");
$req->bindParam(':n', $_POST["title"]);
$req->bindParam(':o', $_SESSION["username"]);
$req->execute();

?>