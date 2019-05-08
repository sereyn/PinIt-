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

if(!isset($_SESSION["username"]) || !isset($_POST["userid"]) || !isset($_POST["boardid"]) || !isset($_POST["rights"])){
    exit();
}

$db = getPDO();

/* del if already exists */
$req = $db->prepare("DELETE FROM `rights` WHERE `userid` = :i AND `boardid` = :b;");
$req->bindParam(':i', $_POST["userid"]);
$req->bindParam(':b', $_POST["boardid"]);
$req->execute();

/* create */
$req = $db->prepare("INSERT INTO `rights` (`boardid`, `userid`, `rights`) VALUES (:b, :i, :r);");
$req->bindParam(':b', $_POST["boardid"]);
$req->bindParam(':i', $_POST["userid"]);
$req->bindParam(':r', $_POST["rights"]);
$req->execute();

?>