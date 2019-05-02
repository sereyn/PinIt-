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

if(!isset($_SESSION["username"]) || !isset($_POST["id"])){
    exit();
}

$db = getPDO();

echo($_POST["id"]);
echo("<br>");
echo($_POST["name"]);

$req = $db->prepare("UPDATE `boards` SET `name` = :n WHERE `id` = :i;");
$req->bindParam(':n', $_POST["name"]);
$req->bindParam(':i', $_POST["id"]);
$req->execute();

?>