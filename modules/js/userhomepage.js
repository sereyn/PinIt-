var boardid_selected;
var postitid_selected;

// dom elements
var boardList;
var addBoardButton;
var delBoardButton;
var boardButtonContainer;

var postitHolder;
var addPostitButton;
var delPostitButton;
var buttonPostitHolder;
//

var timers = [];

function fillBoardsList(){
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/getBoards.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("demand=owned");

    if(req.status == 200){
        res = JSON.parse(req.responseText);
        boardList.innerHTML = "";
    }else{
        return;
    }

    res.forEach(function(v){
        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "board");
        newDiv.addEventListener("click", function(){
            // clear save intervals
            timers.forEach(function(el){
                clearInterval(el);
            });
            timers = [];
            // save all postits
            Array.from(postitHolder.children).forEach(function(el){
                savePostit(el.getAttribute("postitid"), boardid_selected, el.innerText);
            });
            // change board
            newDiv.focus();
            fillPostitHolder(v.id);
            boardid_selected = v.id;

            /* color */
            Array.from(boardList.children).forEach(function(val){
                val.style.backgroundColor = "#FFF";
            });
            newDiv.style.backgroundColor = "#CCC";

            boardButtonContainer.setAttribute("class", "board_button_show");
        });
        
        newDiv.innerHTML = "<p>" + v.name + "</p>";
        boardList.appendChild(newDiv);
    });
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
        var newDiv = document.createElement("div");
        newDiv.setAttribute("contenteditable", "true");
        newDiv.setAttribute("class", "postit");
        newDiv.setAttribute("postitid", v);
        newDiv.innerHTML = "<p>" + res[v] + "</p>";

        newDiv.addEventListener("focusout", function(){
            buttonPostitHolder.setAttribute("class", "postit_button_holder_up1");
        });

        newDiv.addEventListener("focusin", function(e){
            postitid_selected = e.target.getAttribute("postitid");
            buttonPostitHolder.setAttribute("class", "postit_button_holder_up2");
        });

        var currTime = 0;
        var timer;
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

        postitHolder.appendChild(newDiv);
    }

    buttonPostitHolder.setAttribute("class", "postit_button_holder_up1");
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
        
    });

    fillBoardsList();
});

