// Game
let cellsN = 100;
let difficulty = "easy";
let timer, timerSeconds;

// References
const difficultySelector = document.getElementById("input-difficulty");
const startButton = document.getElementById("button-start");
const timerElement = document.getElementById("timer");
const gridElement = document.getElementById("grid");

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
    startTimer();
}
function stopGame() {
    stopTimer();
}

// Grid logics
function generateGrid() {

    // Clear grid
    clearGrid();

    // Create a reusable mould
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

            if (!cell.classList.contains("revealed")) {

                // Rivela la cella
                cell.classList.add("revealed");
                console.log(`[${cellN}]`);

            } else {

                // Cell already revealed
                console.log(`Cella già rivelata! [${cellN}]`)

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
function startTimer() {

    // Clear eventual previous timer
    if (timer) {
        stopTimer();
    }

    // Update timer counters
    timerSeconds = 0;
    timer = setInterval(function () {
        timerSeconds++;
        updateWatch();
    }, 1000);

    // Display new timer
    updateWatch();
}
function updateWatch() {
    const shownSeconds = (timerSeconds + 60) % 60;
    const shownMinutes = parseInt(timerSeconds / 60);
    timerElement.innerHTML = `${shownMinutes}:${shownSeconds}`;
}
function stopTimer() {
    clearInterval(timer);
}
