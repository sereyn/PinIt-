function fillBoardsList(domEl){
    var req = new XMLHttpRequest();
    var res;

    req.open("POST", "/requests/getBoards.php", false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("demand=owned&session=" + session);

    if(req.status == 200){
        res = JSON.parse(req.responseText);
        domEl.innerHTML = "";
    }else{
        return;
    }

    res.forEach(function(v){
        domEl.innerHTML += "<div class='board'><p>" + v.name + "</p></div>";
    });
}

window.addEventListener("load", function(){
    var boardList = document.getElementById("list_boards");

    fillBoardsList(boardList);
});

