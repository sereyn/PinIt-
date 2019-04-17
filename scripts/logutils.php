<?php

function check_credentials($username, $password){
    $db = getPDO();
    $req = $db->prepare('SELECT * FROM `users` WHERE `username` = :u;');
    $req->bindParam(':u', $username);
    $req->execute();
    $res = $req->fetch();

    return password_verify($password, $res['password']);
}

function register($username, $password){
    $db = getPDO();
    $req = $db->prepare('INSERT INTO `users` (`username`, `password`) VALUES (:u, :p);');
    $req->bindParam(':u', $username);
    $req->bindParam(':p', password_hash($password, PASSWORD_DEFAULT));
    return $req->execute();
}

function unsafe_password($password){
    if(strlen($password) < $GLOBALS["password_min_length"]){
        return true;
    }
    return false;
}

/* Check login credentials */
if(isset($_POST["login"])){ /* form is sent */
    $username = safetize($_POST["username"]);
    $password = safetize($_POST["password"]);

    if(check_credentials($username, $password)){ /* right creds */
        $_SESSION["username"] = $username;
        $_SESSION["password"] = $password;
        header("Refresh:0");
    }else{ /* wrong creds */
        exec_js("show_error_credentials();");
    }
}

/* check register request */
if(isset($_POST["register"])){
    $username = safetize($_POST["username"]);
    $password = safetize($_POST["password"]);
    $passwordConf = safetize($_POST["password-conf"]);

    $err = false;

    if($password != $passwordConf){
        exec_js("show_error_passwordConf();");
        $err = true;
    }
    if(user_exists($username)){
        exec_js("show_error_userExists();");
        $err = true;
    }
    if(unsafe_password($password)){
        exec_js("show_error_unsafePassword();");
        $err = true;
    }
    if(!$err){
        if(register($username, $password)){
            $_SESSION["username"] = $username;
            $_SESSION["password"] = $password;
            header("Refresh:0");
        }else{
            exec_js("show_error_unknown();");
        }
    }
}

/* Check logout request */
if(isset($_GET["logout"])){
    unset($_SESSION["username"]);
    unset($_SESSION["password"]);
    session_destroy();
    header('location: ' . $_SERVER['PHP_SELF']);
}

?>