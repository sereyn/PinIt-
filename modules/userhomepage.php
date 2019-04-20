<link rel="stylesheet" type="text/css" href="modules/css/userhomepage.css">
<script>var session = "<?php echo(session_id()) ?>"; </script>
<script src="./modules/js/userhomepage.js"></script>

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
        </div>
        <div id="button_container">
            <div id="del_board_button">
                <img id="avatar" alt="avatar" src="./images/add.png" width="50px">
            </div>
            <div id="add_board_button">
                <img id="avatar" alt="avatar" src="./images/del.png" width="50px">
            </div>
        </div>
    </div>
    <div id="right_panel">
    </div>
    
</div>