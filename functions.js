const piece = ["X", "O"]
var index = 0;
var otherButton = null;

var selectPiece = document.getElementById("pieceContainer");
var pieceButtons = selectPiece.childNodes;
for (var i = 0; i < pieceButtons.length; i++) {
    pieceButtons[i].addEventListener("click", selectStartingPiece);
    
    // // change colors 
    // pieceButtons[i].addEventListener("mouseover", event => {
    //     event.target.style.backgroundColor = "lavender";
    // });
    // pieceButtons[i].addEventListener("mouseout", event => {
    //     event.target.style.backgroundColor = "beige";
    // });
}

function selectStartingPiece(event) {
    var getPiece = event.target.innerHTML;
    if (getPiece == "O") {
        index = 1;
    } else {
        index = 0;
    }
    // change color of other button of button is selected
    if (otherButton != null) {
        otherButton.style.backgroundColor = "beige";
    } 
    event.target.style.backgroundColor = "seagreen";

    otherButton = event.target;
}

// get board div from html file
var board = document.getElementById("board");
function displayBoard() {
    board.style.visibility = "visible";
    board.replaceChildren();

    for(var i = 1; i <=9; i++) {
        // create grid elements and add to grid div
        var element = document.createElement("div");
        // element.setAttribute("class", "grid-item");
        element.classList.add("grid-item");
        element.setAttribute("id", i);
        element.addEventListener("click", addPiece);;
        board.appendChild(element);
    }

    changePlayer();
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

    if (!event.target.classList.contains("isClicked")) {
        if (index % 2 == 0) {
            event.target.innerHTML ="X";
            // event.target.classList.add("X");
            event.target.id = "X";
            
        } else {
            event.target.innerHTML = "O";
            // event.target.classList.add("O");
            event.target.id = "O";
        }

        index++;
        event.target.classList.add("isClicked");
        changePlayer();
        checkWinner();
    }
}

var player = document.getElementById("player");
function changePlayer() {
    player.innerHTML = piece[index % 2] + "'s turn!";
}

function checkWinner() {
    var gridItems = board.childNodes;
    
    // check for matches vertically
    for (var i = 0; i < 3; i++) {
        if (gridItems[i].id == gridItems[i + 3].id && gridItems[i + 3].id == gridItems[i + 6].id) {
            player.innerHTML = gridItems[i].id + " wins!";
            player.style.backgroundColor = "yellow";
            return true;
        }
    }

    // check for matches horizontally
    for (var i = 0; i < 7; i+=3) {
        if (gridItems[i].id == gridItems[i + 1].id && gridItems[i + 1].id == gridItems[i + 2].id) {
            player.innerHTML = gridItems[i].id + " wins!";
            player.style.backgroundColor = "yellow";
            return true;
        }
    }

    // just felt like hardcoding the diagonal part
    if (gridItems[0].id == gridItems[4].id && gridItems[4].id == gridItems[8].id) {
        player.innerHTML = gridItems[0].id + " wins!";
        player.style.backgroundColor = "yellow";
        return true;
    }

    if (gridItems[2].id == gridItems[4].id && gridItems[4].id == gridItems[6].id) {
        player.innerHTML = gridItems[2].id + " wins!";
        player.style.backgroundColor = "yellow";
        return true;
    }
}