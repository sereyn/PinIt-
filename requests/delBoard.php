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

if(strpos($_POST["id"], "..") != false){
    exit();
}

/* need a user rights verif */

$db = getPDO();

$req = $db->prepare("DELETE FROM `boards` WHERE `id` = :i;");
$req->bindParam(':i', $_POST["id"]);
$req->execute();

$path = "../postits/" . $_POST["id"];

function removeDirectory($path) {
    $files = glob($path . '/*');
    foreach ($files as $file) {
        is_dir($file) ? removeDirectory($file) : unlink($file);
    }
    rmdir($path);
    return;
}

removeDirectory($path);

?>