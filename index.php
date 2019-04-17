<?php
session_start();

# debug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<!DOCTYPE html>

<html>
    <?php 
        include("vars.php");
        include("modules/head.php"); 
    ?>
    <body>
        <?php
            if(isset($_SESSION["username"])){
                include("modules/userhomepage.php");
            }else if(isset($_GET["page"])){
                $page = safetize($_GET["page"]);
                if($page == "register"){
                    include("modules/register.php");
                }else{
                    include("modules/login.php");
                }
            }else{
                include("modules/login.php");
            }
        ?>
    </body>
</html>