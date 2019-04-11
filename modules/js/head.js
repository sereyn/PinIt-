function loadHTML(file, element=null){
    var req = new XMLHttpRequest();

    req.open("POST", file, false);
    req.send(null);
 
    if(req.status == 200){
        if(element != null){
            element.innerHTML = req.responseText;
        }
        return req.responseText;
    }else{
        console.log("Error: XML request impossible");
        return "";
    }
}