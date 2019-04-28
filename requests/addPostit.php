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

$arr = scandir($path);
$max = -1;
foreach($arr as $filename){
    if(!($filename == "." || $filename == "..")){
        $curr = intval($filename);
        if($max == -1 || $max < $curr){
            $max = $curr;
        }
    }
}

$max += 1;

fclose(fopen($path . "/" . $max, "w", FALSE));

?>