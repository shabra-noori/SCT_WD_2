// Get all cells
const cells = document.querySelectorAll(".cell");

// Get HTML elements
const statusText = document.getElementById("status");

const resetButton = document.getElementById("reset");

const playerScoreText =
    document.getElementById("playerScore");

const computerScoreText =
    document.getElementById("computerScore");


// Game board
let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];


// Game status
let gameOver = false;


// Scores
let playerScore = 0;
let computerScore = 0;


// Winning combinations
const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// PLAYER MOVE
cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        const index = cell.dataset.index;


        // Don't allow invalid move
        if (board[index] !== "" || gameOver) {
            return;
        }


        // Player = X
        board[index] = "X";

        cell.textContent = "X";

        cell.classList.add("x");


        // Check player win
        if (checkWinner("X")) {

            statusText.textContent = "🎉 You Win!";

            playerScore++;

            playerScoreText.textContent =
                playerScore;

            gameOver = true;

            return;
        }


        // Check draw
        if (checkDraw()) {

            statusText.textContent =
                "🤝 It's a Draw!";

            gameOver = true;

            return;
        }


        // Computer turn
        statusText.textContent =
            "Computer's Turn...";


        setTimeout(computerMove, 500);

    });

});


// COMPUTER MOVE
function computerMove() {

    if (gameOver) {
        return;
    }


    // Find empty cells
    let emptyCells = [];


    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {

            emptyCells.push(i);

        }

    }


    // Select random empty cell
    const randomPosition =
        Math.floor(
            Math.random() * emptyCells.length
        );


    const computerIndex =
        emptyCells[randomPosition];


    // Computer = O
    board[computerIndex] = "O";

    cells[computerIndex].textContent = "O";

    cells[computerIndex].classList.add("o");


    // Check computer win
    if (checkWinner("O")) {

        statusText.textContent =
            "💻 Computer Wins!";

        computerScore++;

        computerScoreText.textContent =
            computerScore;

        gameOver = true;

        return;
    }


    // Check draw
    if (checkDraw()) {

        statusText.textContent =
            "🤝 It's a Draw!";

        gameOver = true;

        return;
    }


    // Player turn again
    statusText.textContent =
        "Your Turn (X)";
}


// CHECK WINNER
function checkWinner(player) {

    return winningCombinations.some(
        function(combination) {

            return combination.every(
                function(index) {

                    return board[index] === player;

                }
            );

        }
    );
}


// CHECK DRAW
function checkDraw() {

    return board.every(
        function(cell) {

            return cell !== "";

        }
    );
}


// RESET GAME
resetButton.addEventListener("click", function() {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];


    gameOver = false;


    statusText.textContent =
        "Your Turn (X)";


    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

    });

});