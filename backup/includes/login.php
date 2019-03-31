<style>

#wrapper{
    width: 400px;
    display: flex;
    align-items: center;
    position: relative;
    flex-direction: column;
}

#login-form{
    padding: 50px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    box-shadow: 0 1px 24px rgba(0, 0, 0, .27);
    color: #074d79;
    font-weight: 600;
    font-size: 15px;
}

#login-form>input{
    margin-bottom: 10px;
}

#user-pic{
    margin-top: -120px;
    margin-bottom: 25px;
    display: flex;
    justify-content: center;
}

#logo-pic{
    margin-bottom: 100px;
    margin-top: 20%;
}

#logo-pic>img{
    filter: drop-shadow(0 1px 24px rgba(0, 0, 0, .27));
}

</style>

<div id="wrapper">
    <div id="logo-pic">
        <img src="includes/images/logo.png" alt="Logo PinIt!"/>
    </div>
    <div id="login-form">
        <div id="user-pic">
            <img src="includes/images/user.png" alt="User photo"/>
        </div>
        Username
        <input type="text"/>
        Password
        <input type="password"/>
        <input type="button" value="Connexion"/>
    </div>
</div>