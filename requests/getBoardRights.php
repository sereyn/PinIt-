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

if(!isset($_SESSION["username"]) || !isset($_POST["boardid"])){
    exit();
}

$db = getPDO();

$req = $db->prepare("SELECT * FROM `rights` WHERE `boardid` = :i;");
$req->bindParam(':i', $_POST["boardid"]);
$req->execute();
$res = $req->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);

?>