<?php

function safetize($txt){
    return htmlspecialchars($txt);
}

function check_credentials($username, $password){
    return false;
}

function exec_js($js){
    echo
        "<script>".
            "window.addEventListener('load', function(){".
                $js.
            "});".
        "</script>";
}

?>