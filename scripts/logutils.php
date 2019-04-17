<?php

/* Check login credentials */
if(isset($_POST["username"])){ /* form is sent */
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

/* Check logout request */
if(isset($_GET["logout"]) && isset($_SESSION["username"])){
    unset($_SESSION["username"]);
    unset($_SESSION["password"]);
    session_destroy();
    header("Refresh:0");
}

?>