// dom elements
var boardList;
var addBoardButton;
var delBoardButton;
//

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
        boardList.innerHTML += "<div class='board'><p>" + v.name + "</p></div>";
    });
}

function addBoard(title){
    var req = new XMLHttpRequest();

    req.open("POST", "/requests/addBoard.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("title=" + title);

    if(req.status == 200){
        fillBoardsList()
    }
}

window.addEventListener("load", function(){
    // dom elements
    boardList = document.getElementById("list_boards");
    delBoardButton = document.getElementById("del_board_button");
    addBoardButton = document.getElementById("add_board_button");

    // listBoards button mapping
    delBoardButton.addEventListener("click", function(){
        
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
                addBoard(pNewBoard.innerText);
            }
        }
        pNewBoard.innerHTML = "New board";

        // add <p> into the <div>
        divNewBoard.appendChild(pNewBoard);

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

