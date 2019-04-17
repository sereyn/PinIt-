<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("vars.php");

try{
    /* db creation */
    $db = new PDO("mysql:host=$db_host", $db_user, $db_password);
    $db->query("CREATE DATABASE IF NOT EXISTS `$db_name`");
    $db->query("USE `$db_name`");

    /* user table creation */
    $db->query("".
        "CREATE TABLE IF NOT EXISTS `users` (".
            "`id` INT AUTO_INCREMENT,".
            "`username` VARCHAR(255) NOT NULL,".
            "`password` VARCHAR(255) NOT NULL,".
            "`group` VARCHAR(255) NOT NULL DEFAULT 'user',".
            "PRIMARY KEY (`id`)".
        ");".
    "");
}catch(PDOException $err){
    echo($err->getMessage());
}

?>