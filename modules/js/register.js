function show_error_passwordConf(){
    var box = document.getElementById("bad_entries");
    box.style.display = "initial";
    box.innerHTML += "Error: passwords does not match<br><br>";
}

function show_error_userExists(){
    var box = document.getElementById("bad_entries");
    box.style.display = "initial";
    box.innerHTML += "Error: username already taken<br><br>";
}

function show_error_unsafePassword(){
    var box = document.getElementById("bad_entries");
    box.style.display = "initial";
    box.innerHTML += "Error: passwords must be at least 8 characters<br><br>";

}

function show_error_unknown(){
    var box = document.getElementById("bad_entries");
    box.style.display = "initial";
    box.innerHTML += "Error: unknown<br>";

}