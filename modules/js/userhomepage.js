var boardid_selected;
var postitid_selected;

var boards = {};

// dom elements
var boardList;
var addBoardButton;
var delBoardButton;
var boardButtonContainer;

var postitHolder;
var addPostitButton;
var delPostitButton;
var buttonPostitHolder;

var settingsButton;
var settingsWindow;
var closeSettingsButton;

var boardNameInput;

var rightsTable;
var rightsTableAdd;

//

var timers = [];

function addRights(userid, boardid, rights){
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/addRights.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("userid=" + userid + "&boardid=" + boardid + "&rights=" + rights);
}
function delRights(userid, boardid){
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/delRights.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("userid=" + userid + "&boardid=" + boardid);
}

function userToId(name){
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/userToId.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("user=" + name);

    if(req.status == 200){
        res = JSON.parse(req.responseText);
        return parseInt(res.id);
    }else{
        return;
    }
}

function idToUser(id){
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/idToUser.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("userid=" + id);

    if(req.status == 200){
        res = JSON.parse(req.responseText);
        return res.username;
    }else{
        return;
    }
}

function fillRightsTable(boardid){
    // owned
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/getBoardRights.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("boardid=" + boardid);

    if(req.status == 200){
        res = JSON.parse(req.responseText);
        for(var i = 0; i < rightsTable.rows.length; i++){
            rightsTable.deleteRow(i);
        }
    }else{
        return;
    }

    res.forEach(function(v){
        var newRow = rightsTable.insertRow(0);

        var cellName = newRow.insertCell(0);
        var cellRights = newRow.insertCell(1);
        var cellDel = newRow.insertCell(2);

        var newP = document.createElement("p");
        newP.setAttribute("contenteditable", "true");
        newP.innerHTML = idToUser(v.userid);
        newP.addEventListener("keydown", function(e){
            if(e.which == 13){
                e.preventDefault();
                newP.blur();
            }
        })
        cellName.appendChild(newP);

        if(v.rights == "true" || v.rights == true){
            cellRights.innerHTML = '<input type="checkbox" checked>Write';
        }else{
            cellRights.innerHTML = '<input type="checkbox">Write';
        }
        cellDel.innerHTML = 'X';

        cellDel.addEventListener("click", function(e){
            var row = e.target.parentNode;
            var uid = userToId(row.cells[0].innerText);
            if(isNaN(uid)){
                row.remove();
            }else{
                delRights(uid, boardid_selected);
            }
            fillRightsTable(boardid_selected);
        });
    });
}

function fillBoardsList(){
    boards = {};

    // owned
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/getBoards.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("demand=owned");

    if(req.status == 200){
        res = JSON.parse(req.responseText);
    }else{
        return;
    }

    for(var i in res){
        boards[res[i].id] = {
            write: true
        }
    }

    // with rights
    var reqr = new XMLHttpRequest();
    var resr;

    reqr.open("POST", "/requests/getBoards.php", false);
    reqr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    reqr.send("demand=rights&userid=" + userToId(username));

    if(reqr.status == 200){
        resr = JSON.parse(reqr.responseText);
    }else{
        return;
    }

    for(var i in resr){
        boards[resr[i].id] = {
            write: resr[i].rights == "true"
        }
    }

    boardList.innerHTML = "";

    // total
    var tot = res.concat(resr);

    for(var key in tot){
        var v = tot[key];
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "board");
        if(v.rights == undefined)
            newDiv.classList.add("owned");
        newDiv.setAttribute("boardid", v.id);
        newDiv.addEventListener("click", function(ev){
            var target = ev.target;
            if(ev.target.tagName == "P"){
                target = ev.target.parentNode;
            }
            var targetID = target.getAttribute("boardid");
            // clear save intervals
            timers.forEach(function(el){
                clearInterval(el);
            });
            timers = [];
            if(boards[boardid_selected] && boards[boardid_selected].write){
                // save all postits
                Array.from(postitHolder.children).forEach(function(el){
                    savePostit(el.getAttribute("postitid"), boardid_selected, el.innerText);
                });
            }
            // change board
            target.focus();
            boardid_selected = targetID;
            fillPostitHolder(targetID);
            

            /* color */
            Array.from(boardList.children).forEach(function(val){
                val.style.backgroundColor = "#FFF";
            });
            target.style.backgroundColor = "#CCC";

            boardButtonContainer.setAttribute("class", "");
            if(boards[boardid_selected].write)
                boardButtonContainer.setAttribute("class", "board_button_show");

        });
        
        newDiv.innerHTML = "<p>" + v.name + "</p>";
        boardList.appendChild(newDiv);
    }
}

function savePostit(id, boardid, text, refresh=false){
    var req = new XMLHttpRequest();

    req.open("POST", "/requests/savePostit.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("id=" + id + "&boardid=" + boardid + "&text=" + text);

    if(req.status == 200){
        if(refresh)
            fillPostitHolder(boardid_selected);
    }
}

function fillPostitHolder(id){
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/getPostits.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("id=" + id);

    if(req.status == 200){
        res = JSON.parse(req.responseText);
        postitHolder.innerHTML = "";
    }else{
        return;
    }
    for(var v in res){
        var timer;
        var newDiv = document.createElement("div");
        if(boards[boardid_selected].write)
            newDiv.setAttribute("contenteditable", "true");
        newDiv.setAttribute("class", "postit");
        newDiv.setAttribute("postitid", v);
        newDiv.innerHTML = "<p>" + res[v] + "</p>";

        if(boards[boardid_selected].write){
            newDiv.addEventListener("focusout", function(e){
                clearInterval(timer);
                savePostit(postitid_selected, boardid_selected, e.target.innerText, false);
                buttonPostitHolder.setAttribute("class", "postit_button_holder_up1");
            });

            newDiv.addEventListener("focusin", function(e){
                postitid_selected = e.target.getAttribute("postitid");
                buttonPostitHolder.setAttribute("class", "postit_button_holder_up2");
            });

            var currTime = 0;
            newDiv.addEventListener("keydown", function(e){
                currTime = 0;
                if(timer == undefined){
                    timer = setInterval(function(){
                        if(currTime > 2){
                            clearInterval(timer);
                            timer = undefined;
                            savePostit(postitid_selected, boardid_selected, e.target.innerText, true);
                        }
                        currTime++;
                    }, 1000);
                    timers.push(timer);
                }
            });
        }

        postitHolder.appendChild(newDiv);
    }

    if(boards[boardid_selected].write){
        settingsButton.setAttribute("class", "available_settings");
        buttonPostitHolder.setAttribute("class", "postit_button_holder_up1");
    }else{
        settingsButton.setAttribute("class", "");
        buttonPostitHolder.setAttribute("class", "");
    }
    

}

function addBoard(title){
    var req = new XMLHttpRequest();

    req.open("POST", "/requests/addBoard.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("title=" + title);

    if(req.status == 200){
        fillBoardsList();
        boardid_selected = undefined;
        postitHolder.innerHTML = "";
        boardButtonContainer.setAttribute("class", "");
        buttonPostitHolder.setAttribute("class", "");
        settingsButton.setAttribute("class", "");
    }
}

function delBoard(id){
    var req = new XMLHttpRequest();

    req.open("POST", "/requests/delBoard.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("id=" + id);

    if(req.status == 200){
        fillBoardsList();
        boardid_selected = undefined;
        postitHolder.innerHTML = "";
        boardButtonContainer.setAttribute("class", "");
        buttonPostitHolder.setAttribute("class", "");
        settingsButton.setAttribute("class", "");
    }
}

function addPostit(){
    var req = new XMLHttpRequest();

    req.open("POST", "/requests/addPostit.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("id=" + boardid_selected);

    if(req.status == 200){
        fillPostitHolder(boardid_selected);
    }
}

function delPostit(id, boardid){
    var req = new XMLHttpRequest();

    req.open("POST", "/requests/delPostit.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("id=" + id + "&boardid=" + boardid);

    if(req.status == 200){
        fillPostitHolder(boardid_selected);
    }
}

function saveBoard(){
    // clear save intervals
    timers.forEach(function(el){
        clearInterval(el);
    });
    timers = [];
    // save all postits
    Array.from(postitHolder.children).forEach(function(el){
        savePostit(el.getAttribute("postitid"), boardid_selected, el.innerText);
    });
}

function setBoardName(id, name){
    var req = new XMLHttpRequest();

    req.open("POST", "/requests/setBoardName.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("id=" + id + "&name=" + name);

    if(req.status == 200){
        fillBoardsList();
    }
}

window.addEventListener("load", function(){
    // dom elements
    boardList = document.getElementById("list_boards");
    delBoardButton = document.getElementById("del_board_button");
    addBoardButton = document.getElementById("add_board_button");
    boardButtonContainer = document.getElementById("button_container");

    postitHolder = document.getElementById("postit_holder");
    addPostitButton = document.getElementById("add_postit");
    delPostitButton = document.getElementById("del_postit");
    buttonPostitHolder = document.getElementById("postit_button_holder");

    settingsButton = document.getElementById("settings");
    settingsWindow = document.getElementById("settings_window");
    closeSettingsButton = document.getElementById("close_settings_button");

    boardNameInput = document.getElementById("board_name_input");
    boardNameApply = document.getElementById("board_name_apply");

    rightsTable = document.getElementById("rights_table");
    rightsTableAdd = document.getElementById("rights_table_add");

    // settings
    settingsButton.addEventListener("click", function(){
        settingsWindow.style.display = "block";

        var boardnameselected = "";
        Array.from(boardList.children).forEach(function(el){
            if(el.getAttribute("boardid") == boardid_selected.toString()){
                boardNameInput.setAttribute("value", el.innerText);
            }
        });

        fillRightsTable(boardid_selected);
    });
    closeSettingsButton.addEventListener("click", function(){
        /* save */
        setBoardName(boardid_selected, boardNameInput.value);
        /* read table and save rights */
        for(var i = 0; i < rightsTable.rows.length; i++){
            var row = rightsTable.rows[i];
            var uid = userToId(row.cells[0].innerText);
            if(!isNaN(uid) && row.cells[0].innerText != username)
                addRights(uid, boardid_selected, row.cells[1].querySelector("input").checked);
        }

        /* quit */
        settingsWindow.style.display = "none";
    });

    rightsTableAdd.addEventListener("click", function(){
        var newRow = rightsTable.insertRow(0);

        var cellName = newRow.insertCell(0);
        var cellRights = newRow.insertCell(1);
        var cellDel = newRow.insertCell(2);

        var newP = document.createElement("p");
        newP.setAttribute("contenteditable", "true");
        newP.innerHTML = "username";
        newP.addEventListener("keydown", function(e){
            if(e.which == 13){
                e.preventDefault();
                newP.blur();
            }
        })
        cellName.appendChild(newP);

        cellRights.innerHTML = '<input type="checkbox">Write';
        cellDel.innerHTML = 'X';

        cellDel.addEventListener("click", function(e){
            var row = e.target.parentNode;
            var uid = userToId(row.cells[0].innerText);
            if(isNaN(uid)){
                row.remove();
            }else{
                delRights(uid, boardid_selected);
            }
        });

        //focus
        newP.focus();
        // select all text
        var range = document.createRange();
        var selection = window.getSelection();
        range.selectNodeContents(newP);
        selection.removeAllRanges();
        selection.addRange(range);
    });

    // save before quitting
    window.addEventListener("beforeunload", function(){
        saveBoard();
     });

    //postit button mapping 
    addPostitButton.addEventListener("click", function(){
        saveBoard();
        // add postit
        addPostit();
    });
    delPostitButton.addEventListener("click", function(){
        saveBoard();
        // del postit
        delPostit(postitid_selected, boardid_selected);
    });

    // listBoards button mapping
    delBoardButton.addEventListener("click", function(){
        delBoard(boardid_selected);
    });
    addBoardButton.addEventListener("click", function(){
        // div creation
        var divNewBoard = document.createElement("div");
        divNewBoard.classList.add("board");

        // p creation
        var pNewBoard = document.createElement("p");
        pNewBoard.setAttribute("contenteditable", "true");
        pNewBoard.onkeydown = function(e){
            if(e.which == 13){
                e.preventDefault();
                pNewBoard.blur();
            }
        }
        pNewBoard.innerHTML = "New board";

        // add <p> into the <div>
        divNewBoard.appendChild(pNewBoard);

        pNewBoard.addEventListener("focusout", function(){
            addBoard(pNewBoard.innerText);
            
        });

        //add to the beginning
        boardList.prepend(divNewBoard);
        
        //focus
        pNewBoard.focus();
        // select all text
        var range = document.createRange();
        var selection = window.getSelection();
        range.selectNodeContents(pNewBoard);
        selection.removeAllRanges();
        selection.addRange(range);

        buttonPostitHolder.setAttribute("class", "");
        settingsButton.setAttribute("class", "");
        
    });

    fillBoardsList();
});

