function displayBoard() {
    // get board div from html file
    var board = document.getElementById("board");

    for(var i = 1; i <=9; i++) {
        // create grid elements and add to grid div
        var element = document.createElement("div");
        element.setAttribute("class", "grid-item");
        element.setAttribute("id", i);
        element.addEventListener("click", addPiece);;
        board.appendChild(element);
    }
}

displayBoard();

function addPiece(event) {
//     var curr = document.getElementById(id);
    // curr.innerHTML = "x";
}