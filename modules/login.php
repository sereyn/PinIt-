<link rel="stylesheet" type="text/css" href="modules/css/login.css">
<script src="./modules/js/login.js"></script>

<div class="wrapper">
    <div id="logo">
        <img src="./images/logo.png" alt="Logo PinIt!"/>
    </div>

    <div id="form-login-holder">
        <form id="form-login" method="POST">
            <div id="avatar">
                <img alt="avatar" src="./images/user.png">
            </div>
            <div class="box_error" id="wrong_credentials">
                Wrong credentials
            </div>
            <label for="username">Username</label>
            <input autofocus type="text" class="input" name="username">
            <br>
            <label for="password">Password</label>
            <input type="password" class="input" name="password">
            <br>
            <input type="submit" class="btn" value="Login">
        </form>
        <input type="button" class="btn btn_inverse" value="Register" id="register_button" onclick="document.location.href = '?page=register'">
    </div>
</div>
