<link rel="stylesheet" type="text/css" href="modules/css/userhomepage.css">

<script>
    window.addEventListener("load", function(){
        document.getElementById("profile_bar").style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    });
</script>

<div class="wrapper" id="panel_holder">
    <div id="left_panel">
        <div id="profile_bar">
            <div id="avatar_holder">
                <img id="avatar" alt="avatar" src="./images/user.png">
            </div>
            <p>
                <?php echo($_SESSION["username"]) ?><br>
                <a href="index.php?logout">Logout</a>
            </p>
        </div>
        <div id="list_boards">
            <div class="board">
                <p>My board</p>
            </div>
            <div class="board">
                <p>English presentation</p>
            </div>
            <div class="board">
                <p>Shopping list</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
            <div class="board">
                <p>To do</p>
            </div>
        <div>
        </div>
    </div>

    <div id="right_panel">
    </div>
</div>