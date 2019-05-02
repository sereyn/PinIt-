<link rel="stylesheet" type="text/css" href="modules/css/userhomepage.css">
<script>var session = "<?php echo(session_id()) ?>"; </script>
<script src="./modules/js/userhomepage.js"></script>

<div id="settings_window">
    <div id="close_settings_button">
        <img alt="close" src="./images/ui/del.png" width="50px">
    </div>
    <div id="settings_holder">
        <form class="setting_form">
            <label>Board name: </label>
            <input id="board_name_input" type="text">
            <input id="board_name_apply" type="button" value="Apply">
        </form>
    </div>
</div>

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
        </div>
        <div id="button_container">
            <div id="add_board_button">
                <img alt="add" src="./images/ui/add2.png" width="50px">
            </div>
            <div id="del_board_button">
                <img alt="del" src="./images/ui/del.png" width="50px">
            </div>
        </div>
    </div>
    <div id="right_panel">
        <div id="settings">
            <img alt="tools" src="./images/ui/settings-6.png" width="50px">
        </div>
        <div id="postit_button_holder">
            <div id="add_postit">
                <img alt="add" src="./images/ui/add-2.png" width="50px">
            </div>
            <div id="del_postit">
                <img alt="del" src="./images/ui/multiply-1.png" width="50px">
            </div>
        </div>
        <div id="postit_holder">
            
        </div>
    </div>
    
</div>
