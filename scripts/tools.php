<?php

function safetize($txt){
    return htmlspecialchars($txt);
}

function exec_js($js){
    echo
        "<script>".
            "window.addEventListener('load', function(){".
                $js.
            "});".
        "</script>";
}

function user_exists($username){
    $db = getPDO();
    $req = $db->prepare('SELECT * FROM `users` WHERE `username` = :u;');
    $req->bindParam(':u', $username);
    $req->execute();
    if($req->rowCount() == 0){
        return false;
    }
    return true;
}

function getPDO(){
    return new PDO('mysql:host=' . $GLOBALS['db_host'] . ';dbname=' . $GLOBALS['db_name'], $GLOBALS['db_user'], $GLOBALS['db_password']);
}

?>