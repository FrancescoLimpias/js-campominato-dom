// Game Configuration
let cellsN = 100;
let bombsN = 16;
let difficulty = "easy";

// Game Data
let pause = false;
let score = 0;
let bombs = [];
let timer, timerSeconds;

// References
const difficultySelector = document.getElementById("input-difficulty");
const startButton = document.getElementById("button-start");
const timerElement = document.getElementById("timer");
const gridElement = document.getElementById("grid");
const scoreViewElement = document.getElementById("score-view");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

// Link UI with JS
difficultySelector.addEventListener("click", updateDifficulty);
startButton.addEventListener("click", startGame);

// Difficulty
function updateDifficulty() {
    difficulty = difficultySelector.value;
    switch (difficulty) {
        case "easy":
            cellsN = 100;
            break;
        case "hard":
            cellsN = 81;
            break;
        case "impossible":
            cellsN = 49;
            break;
    }
}

// Game logics
function startGame() {
    generateGrid();
    resetTimer();
    score = 0;
    scoreViewElement.classList.remove("active");
    
    resumeGame();
}
function finishGame(win) {

    // Stop game
    stopGame();

    // Show Bombs
    for (let i = 0; i < bombs.length; i++) {
        gridElement.children[bombs[i] - 1].classList.add("bomb", "revealed");
    }

    // Display results
    scoreViewElement.classList.add("active");
    if(win){
        resultElement.innerHTML = "vinto!";
    } else {
        resultElement.innerHTML = "perso";
    }
    scoreElement.innerHTML = score;

}

function resumeGame() {
    startTimer();
    pause = false;
}
function stopGame() {
    stopTimer();
    pause = true;
}

// Grid logics
function generateGrid() {

    // Clear grid
    clearGrid();

    // Generate available cells array
    let availableCells = [];
    for (let i = 1; i <= cellsN; i++) {
        availableCells.push(i);
    }

    // Generate bomb array
    bombs = [];
    for (let i = 1; i <= bombsN; i++) {

        // Take one random available cell index
        const randomAvailableCellIndex = Math.round(1 + (Math.random() * (availableCells.length - 2)));

        // Look for the cell index it is holding and store it in the bombs array
        bombs.push(availableCells[randomAvailableCellIndex]);

        // Remove the bomb cell from the available cells
        availableCells.splice(randomAvailableCellIndex, 1);

    }

    // Create a reusable cell mould
    const mouldCell = document.createElement("div");
    mouldCell.classList.add("cell", difficulty);

    // Create N cells
    for (let i = 0; i < cellsN; i++) {

        const cellN = i + 1;

        // Create cell
        const cell = mouldCell.cloneNode(); //clone
        cell.insertAdjacentHTML("beforeend", "<span>" /* + cellN  */ + "</span>"); //insert number

        // Add click response
        cell.addEventListener("click", function () {

            // Check if game is active
            if(pause){
                return;
            }

            // Revealing logic
            if (!cell.classList.contains("revealed")) {

                // Rivela la cella
                cell.classList.add("revealed");
                console.log(`[${cellN}]`);

            } else {

                // Cell already revealed
                console.log(`Cella già rivelata! [${cellN}]`);
                return;

            }

            // Check if cell is a bomb
            if (bombs.includes(cellN)) {
                finishGame(false);
            } else {
                score++;
                if(score == cellsN - bombsN){
                    finishGame(true);
                }
            }
        });

        // Add to the grid
        gridElement.append(cell);
    }
}

function clearGrid() {
    while (gridElement.firstChild) {
        gridElement.removeChild(gridElement.firstChild);
    }
}

// Timer logics
function resetTimer() {

    // Clear eventual previous timer
    if (timer) {
        stopTimer();
    }

    // Reset counter
    timerSeconds = 0;

    // Display new timer
    updateTimer();

}
function startTimer() {

    // Start counting
    timer = setInterval(function () {
        timerSeconds++;
        updateTimer();
    }, 1000);

}
function stopTimer() {
    clearInterval(timer);
}
function updateTimer() {
    const shownSeconds = (timerSeconds + 60) % 60;
    const shownMinutes = parseInt(timerSeconds / 60);
    timerElement.innerHTML = `${shownMinutes}:${shownSeconds}`;
}
