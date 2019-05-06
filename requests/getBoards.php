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

if(!isset($_SESSION["username"]) || !isset($_POST["demand"])){
    exit();
}

$db = getPDO();

if($_POST["demand"] == "owned"){
    $req = $db->prepare("SELECT * FROM `boards` WHERE `owner` = :u;");
    $req->bindParam(':u', $_SESSION["username"]);
    $req->execute();
    $res = $req->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($res);
}else if($_POST["demand"] == "rights"){
    $req = $db->prepare("SELECT boards.id, `name`, `owner`, `userid`, `rights` FROM rights INNER JOIN boards ON boards.id = `boardid` WHERE userid = :i;");
    $req->bindParam(':i', $_POST["userid"]);
    $req->execute();
    $res = $req->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($res));
}

?>