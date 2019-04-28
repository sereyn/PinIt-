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

$path = "../postits/" . $_POST["id"];

if(!is_dir($path)){
    exit();
}

$arr = scandir($path);
$formated = array();
foreach($arr as $filename){
    if(!($filename == "." || $filename == "..")){
        $formated[$filename] = file_get_contents($path . "/" . $filename, FALSE);
    }
}

echo json_encode($formated);

?>