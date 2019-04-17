<link rel="stylesheet" type="text/css" href="modules/css/register.css">
<script src="./modules/js/register.js"></script>

<div class="wrapper">
    <div id="logo">
        <img src="./images/logo.png" alt="Logo PinIt!"/>
    </div>

    <div id="form-register-holder">
        <form id="form-register" method="POST">
            <div class="box_error" id="bad_entries">
                
            </div>
            <label for="username">Username</label>
            <input autofocus type="text" class="input" name="username">
            <br>
            <label for="password">Password</label>
            <input type="password" class="input" name="password">
            <br>
            <label for="password-conf">Confirm password</label>
            <input type="password" class="input" name="password-conf">
            <br>
            <input type="submit" class="btn" name="register" value="Register" id="in_form_button">
        </form>
        <input type="button" class="btn btn_inverse" value="Login" id="login_button" onclick="document.location.href = '?page=login'">
    </div>
</div>
