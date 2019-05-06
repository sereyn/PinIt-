<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include("vars.php");

try{
    mkdir("./postits", 0775);

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

    /* boards table creation */
    $db->query("".
        "CREATE TABLE IF NOT EXISTS `boards` (".
            "`id` INT AUTO_INCREMENT,".
            "`name` VARCHAR(255),".
            "`owner` VARCHAR(255) NOT NULL,".
            "PRIMARY KEY (`id`)".
        ");".
    "");

    /* rights table creation */
    $db->query("".
        "CREATE TABLE IF NOT EXISTS `rights` (".
            "`id` INT AUTO_INCREMENT,".
            "`boardid` INT NOT NULL,".
            "`userid` INT NOT NULL,".
            "`rights` VARCHAR(255) NOT NULL,".
            "PRIMARY KEY (`id`),".
            "FOREIGN KEY (`boardid`) REFERENCES `boards` (`id`) ON DELETE CASCADE,".
            "FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE".
        ");".
    "");
    
}catch(PDOException $err){
    echo($err->getMessage());
}

?>