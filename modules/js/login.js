
function show_error_credentials(){
    document.getElementById("wrong_credentials").style.display = "initial";
}

window.addEventListener("load", function(){
    /* buttons logic (login/register) */
    
    var Out = document.getElementById("out_form_button");
    var holder = document.getElementById("form-login-holder");

    Out.addEventListener("click", function(){
        if(holder.querySelector("form").getAttribute("id") == "form-login"){
            console.log("need register form");
        }else{
            console.log("need login form");
        }
    });

});