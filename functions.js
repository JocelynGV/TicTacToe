const piece = ["X", "O"]
var index = 0;
var otherButton = null;

var winner;
var isOver = false;
var xWins = 0;
var oWins = 0;

var selectPiece = document.getElementById("pieceContainer");
var pieceButtons = selectPiece.childNodes;
for (var i = 0; i < pieceButtons.length; i++) {
    pieceButtons[i].addEventListener("click", selectStartingPiece);
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
    updatePoints();
    resetBoard();
    board.style.visibility = "visible";
    board.replaceChildren();

    for(var i = 1; i <=9; i++) {
        // create grid elements and add to grid div
        var element = document.createElement("div");
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
    if (!event.target.classList.contains("isClicked") && !isOver) {
        if (index % 2 == 0) {
            event.target.innerHTML ="X";
            event.target.id = "X";
            
        } else {
            event.target.innerHTML = "O";
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

    var playerX = document.getElementById("playerX");
    var playerO = document.getElementById("playerO");
    if (piece[index % 2] == "X") {
        // underline current player
        playerX.style.textDecoration = "underline";
        playerX.style.textDecorationColor = "white";
        playerX.style.textDecorationThickness = "3px";
        // remove underline from other player
        playerO.style.textDecoration = "none";
    } else {
        // underline current player
        playerO.style.textDecoration = "underline";
        playerO.style.textDecorationColor = "white";
        playerO.style.textDecorationThickness = "3px";
        // remove underline from other player
        playerX.style.textDecoration = "none";
    }
}

var draw = false;
var gridItems = board.childNodes;
let winPos;

function checkWinner() {
    
    // check for matches vertically
    for (var i = 0; i < 3; i++) {
        if (gridItems[i].id == gridItems[i + 3].id && gridItems[i + 3].id == gridItems[i + 6].id) {
            winner = gridItems[i].id;
            winPos = [i, i + 3, i + 6];
            endGame();
            return true;
        }
    }

    // check for matches horizontally
    for (var i = 0; i < 7; i+=3) {
        if (gridItems[i].id == gridItems[i + 1].id && gridItems[i + 1].id == gridItems[i + 2].id) {
            winner = gridItems[i].id;
            winPos = [i, i + 1, i + 2];
            endGame();
            return true;
        }
    }

    // just felt like hardcoding the diagonal part
    if (gridItems[0].id == gridItems[4].id && gridItems[4].id == gridItems[8].id) {
        winner = gridItems[0].id;
        winPos = [0, 4, 8];
        endGame();
        return true;
    }

    if (gridItems[2].id == gridItems[4].id && gridItems[4].id == gridItems[6].id) {
        winner = gridItems[2].id;
        winPos = [2, 4, 6];
        endGame();
        return true;
    }

    draw = true;
    for(var i = 0; i < gridItems.length; i++ ){
        if(!gridItems[i].classList.contains("isClicked")){
            draw = false;
        }
    }

    if(draw){
        winner = "Draw";
        endGame();
        return true;
    }
}

var playAgain = document.getElementById("playAgain");

function endGame() {
    if (draw){
        player.innerHTML = winner;
        document.getElementById("body").style.backgroundColor = "rgb(237, 247, 108)";
    } else {
        player.innerHTML = winner + " wins!";

        // increase point value for player that won round
        if (winner == "X") {
            xWins++;
            console.log("x wins: " + xWins);
        } else {
            oWins++;
            console.log("o wins: " + oWins);
        }
        updatePoints();
        displayWin();

        // change background color
        document.getElementById("body").style.backgroundColor = "lightgreen";
    }

    // player.style.backgroundColor = "yellow";
    isOver = true;

    playAgain.style.visibility = "visible";

    playAgain.addEventListener("click", displayBoard);
}

// update point values on screen
function updatePoints() {
    document.getElementById("xPoints").innerHTML = xWins;
    document.getElementById("oPoints").innerHTML = oWins;
}

function displayWin() {
    //  color background of winning grid items
    for (var i = 0; i < winPos.length; i++) {
        gridItems[winPos[i]].style.backgroundColor = "rgb(64, 224, 208)";
    }
}

function resetBoard() {
    player.innerHTML = "";
    player.style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("body").style.backgroundColor = "rgb(146, 119, 243)";
    playAgain.style.visibility = "hidden";
    isOver = false;
}