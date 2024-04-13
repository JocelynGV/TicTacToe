const piece = ["X", "O"]

function displayBoard() {
    // get board div from html file
    var board = document.getElementById("board");
    board.style.visibility = "visible";
    board.replaceChildren();

    for(var i = 1; i <=9; i++) {
        // create grid elements and add to grid div
        var element = document.createElement("div");
        element.setAttribute("class", "grid-item");
        element.setAttribute("id", i);
        element.addEventListener("click", addPiece);;
        board.appendChild(element);
    }
}

// display board after pressing start
var start = document.getElementById("start");
start.addEventListener("click", displayBoard);
start.addEventListener("mouseover", event => {
    event.target.style.backgroundColor = "lavender";
});
start.addEventListener("mouseout", event => {
    event.target.style.backgroundColor = "beige";
});


function addPiece(event) {
    // event.target.style.backgroundColor = "red";
    event.target.innerHTML ="X";
}