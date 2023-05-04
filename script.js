const grid = document.querySelector("#grid");
const winnerTextfield = document.querySelector("#winner");
const player1NameField = document.querySelector("#player-1-name");
const player2NameField = document.querySelector("#player-2-name");
const player1ScoreField = document.querySelector("#player-1-score");
const player2ScoreField = document.querySelector("#player-2-score");
const friendModeBtn = document.querySelector("#friend-mode");
const computerModeBtn = document.querySelector("#computer-mode");
const modeSelectWrapper = document.querySelector("#mode-select-wrapper");

// Game mode selection
friendModeBtn.addEventListener("click", () => {
  gameStatus.mode = "friend";
  modeSelectWrapper.style.display = "none";
  updatePlayerNames();
});
computerModeBtn.addEventListener("click", () => {
  gameStatus.mode = "computer";
  modeSelectWrapper.style.display = "none";
  updatePlayerNames();
});

let gridTiles = ["", "", "", "", "", "", "", "", ""];

// Constructing the players
function Player(name, mark, score) {
  this.name = name;
  this.mark = mark;
  this.score = score;
}

const player1 = new Player("Player 1", "x", 0);
const player2 = new Player("Player 2", "o", 0);
const playerAI = new Player("Computer", "o", 0);

// Game status data storage
const gameStatus = {
  activePlayer: player1,
};

// Draw the grid and update the marks when a player clicks on the tiles
function drawGrid() {
  showActivePlayer();
  grid.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const newTile = grid.appendChild(document.createElement("div"));
    newTile.classList.add("grid-tile");
    newTile.setAttribute("id", `${i}`);
    newTile.addEventListener("click", (e) => {
      updateArray(e.target.id);
      checkForWin();
      switchActivePlayer();
      drawGrid();
    });
    newTile.innerHTML = gridTiles[i];
  }
}
drawGrid();

// Update the array on tile click
function updateArray(targetTile) {
  convertToIcon();
  if (gridTiles[targetTile] == "") {
    gridTiles[targetTile] = gameStatus.activePlayer.mark;
  }
  convertToMark();
}

// Convert marks to icons
function convertToIcon() {
  if (gameStatus.activePlayer.mark == "x")
    gameStatus.activePlayer.mark = '<i class="fa-solid fa-xmark"></i>';
  if (gameStatus.activePlayer.mark == "o")
    gameStatus.activePlayer.mark = '<i class="fa-solid fa-o"></i>';
}

// Convert icons to marks
function convertToMark() {
  if (gameStatus.activePlayer.mark == '<i class="fa-solid fa-xmark"></i>')
    gameStatus.activePlayer.mark = "x";
  if (gameStatus.activePlayer.mark == '<i class="fa-solid fa-o"></i>')
    gameStatus.activePlayer.mark = "o";
}

// Switch active player
function switchActivePlayer() {
  if (gameStatus.mode == "computer") return;
  if (gameStatus.activePlayer == player1) {
    gameStatus.activePlayer = player2;
  } else {
    gameStatus.activePlayer = player1;
  }
}

// Check for winning conditions
function checkForWin() {
  if (
    // Horizontal checks
    (gridTiles[0] == gridTiles[1] && gridTiles[1] == gridTiles[2] && gridTiles[0] != "") ||
    (gridTiles[3] == gridTiles[4] && gridTiles[4] == gridTiles[5] && gridTiles[3] != "") ||
    (gridTiles[6] == gridTiles[7] && gridTiles[7] == gridTiles[8] && gridTiles[6] != "") ||
    // Vertical checks
    (gridTiles[0] == gridTiles[3] && gridTiles[3] == gridTiles[6] && gridTiles[0] != "") ||
    (gridTiles[1] == gridTiles[4] && gridTiles[4] == gridTiles[7] && gridTiles[1] != "") ||
    (gridTiles[2] == gridTiles[5] && gridTiles[5] == gridTiles[8] && gridTiles[2] != "") ||
    // Diagonal checks
    (gridTiles[0] == gridTiles[4] && gridTiles[4] == gridTiles[8] && gridTiles[0] != "") ||
    (gridTiles[2] == gridTiles[4] && gridTiles[4] == gridTiles[6] && gridTiles[2] != "")
  ) {
    gameStatus.result = "winner";
    announceResult();
    gameStatus.activePlayer.score++;
    updateScoreboard();

    return;
  } else if (
    // Draw check (all tiles are filled and no winner has been declared yet)
    gridTiles[0] != "" &&
    gridTiles[1] != "" &&
    gridTiles[2] != "" &&
    gridTiles[3] != "" &&
    gridTiles[4] != "" &&
    gridTiles[5] != "" &&
    gridTiles[6] != "" &&
    gridTiles[7] != "" &&
    gridTiles[8] != ""
  ) {
    gameStatus.result = "draw";
    announceResult();
  }
}

// Announce the end result of the game
function announceResult() {
  grid.addEventListener(
    "mousedown",
    () => {
      resetGame();
    },
    { once: true }
  );
  if (gameStatus.result == "draw") {
    winnerTextfield.textContent = "It's a draw.";
    return;
  }
  winnerTextfield.textContent = `${gameStatus.activePlayer.name} won!`;
}

// Indicate which players turn it is
function showActivePlayer() {
  if (gameStatus.result == "winner" || gameStatus.result == "draw") {
    player1NameField.style.outline = "";
    player2NameField.style.outline = "";
    return;
  }
  if (gameStatus.activePlayer == player1) {
    player1NameField.style.outline = "6px solid var(--main-color-1)";
    player2NameField.style.outline = "";
  }
  if (gameStatus.activePlayer == player2) {
    player1NameField.style.outline = "";
    player2NameField.style.outline = "6px solid var(--main-color-1)";
  }
}

// Update the player names
function updatePlayerNames() {
  player1NameField.innerHTML = `${player1.name} - <i class="fa-solid fa-xmark"></i>`;
  player2NameField.innerHTML = `${player2.name} - <i class="fa-solid fa-o"></i>`;
  if (gameStatus.mode == "computer")
    player2NameField.innerHTML = `${playerAI.name} - <i class="fa-solid fa-o"></i>`;
}

// Update the scoreboard
function updateScoreboard() {
  player1ScoreField.textContent = player1.score;
  player2ScoreField.textContent = player2.score;
}

// Reset the game to default settings
function resetGame() {
  gridTiles = ["", "", "", "", "", "", "", "", ""];
  gameStatus.result = "";
  winnerTextfield.textContent = "";
  drawGrid();
}
