const grid = document.querySelector("#grid");
const winnerTextfield = document.querySelector("#winner");
const player1Textfield = document.querySelector("#player-1-name");
const player2Textfield = document.querySelector("#player-2-name");
const player1Scorefield = document.querySelector("#player-1-score");
const player2Scorefield = document.querySelector("#player-2-score");

const gameStatus = {
  draw: false,
  over: false,
};

// Draw the 3x3 playing grid
function drawGrid() {
  for (let i = 0; i < 9; i++) {
    const newTile = grid.appendChild(document.createElement("div"));
    newTile.classList.add("grid-tile");
    newTile.addEventListener("click", (e) => {
      playRound(e.target);
      updateActivePlayer();
    });
    newTile.setAttribute("id", `tile-${i}`);
  }
}
drawGrid();

// Constructing the players
function Player(name, mark, score, isTurn) {
  this.name = name;
  this.mark = mark;
  this.score = score;
  this.isTurn = isTurn;
}
const player1 = new Player("Player 1", '<i class="fa-solid fa-xmark"></i>', 0, false);
const player2 = new Player("Player 2", '<i class="fa-solid fa-o"></i>', 0, false);

// Playing the game!
player1.isTurn = true;

function playRound(activeTile) {
  if (activeTile.innerHTML !== "") return; //Check for empty tile
  //Player 1 turn
  if (player1.isTurn == true) {
    activeTile.innerHTML = player1.mark;
    checkWinner();
    player1.isTurn = false;
    player2.isTurn = true;
    return;
  }

  // Player 2 turn
  if (player2.isTurn == true) {
    activeTile.innerHTML = player2.mark;
    checkWinner();
    player1.isTurn = true;
    player2.isTurn = false;
    return;
  }
}

// Check for a winner
function checkWinner() {
  const tile0 = document.getElementById("tile-0").innerHTML;
  const tile1 = document.getElementById("tile-1").innerHTML;
  const tile2 = document.getElementById("tile-2").innerHTML;
  const tile3 = document.getElementById("tile-3").innerHTML;
  const tile4 = document.getElementById("tile-4").innerHTML;
  const tile5 = document.getElementById("tile-5").innerHTML;
  const tile6 = document.getElementById("tile-6").innerHTML;
  const tile7 = document.getElementById("tile-7").innerHTML;
  const tile8 = document.getElementById("tile-8").innerHTML;

  // Horizontal check
  if (tile0 == tile1 && tile1 == tile2 && tile0 != "" && tile1 != "" && tile2 != "")
    announceWinner();
  if (tile3 == tile4 && tile4 == tile5 && tile3 != "" && tile4 != "" && tile5 != "")
    announceWinner();
  if (tile6 == tile7 && tile7 == tile8 && tile6 != "" && tile7 != "" && tile8 != "")
    announceWinner();

  // Vertical check
  if (tile0 == tile3 && tile3 == tile6 && tile0 != "" && tile3 != "" && tile6 != "")
    announceWinner();
  if (tile1 == tile4 && tile4 == tile7 && tile1 != "" && tile4 != "" && tile7 != "")
    announceWinner();
  if (tile2 == tile5 && tile5 == tile8 && tile2 != "" && tile5 != "" && tile8 != "")
    announceWinner();

  // Diagonal check
  if (tile0 == tile4 && tile4 == tile8 && tile0 != "" && tile4 != "" && tile8 != "")
    announceWinner();
  if (tile2 == tile4 && tile4 == tile6 && tile2 != "" && tile4 != "" && tile6 != "")
    announceWinner();

  // Check for a draw
  if (
    tile0 != "" &&
    tile1 != "" &&
    tile2 != "" &&
    tile3 != "" &&
    tile4 != "" &&
    tile5 != "" &&
    tile6 != "" &&
    tile7 != "" &&
    tile8
  ) {
    gameStatus.draw = true;
    announceWinner();
  }
}

//Announce the winner
function announceWinner() {
  updateScoreboard();
  gameStatus.over = true;
  if (gameStatus.draw == true) {
    winnerTextfield.textContent = "It's a draw.";
    draw = false;
  } else if (player1.isTurn == true) {
    winnerTextfield.textContent = "Player 1 wins!";
  } else if (player2.isTurn == true) {
    winnerTextfield.textContent = "Player 2 wins!";
  }

  grid.addEventListener(
    "mousedown",
    () => {
      resetGame();
    },
    { once: true }
  );
}

// Update the active player display
function updateActivePlayer() {
  if (gameStatus.over == true) {
    player1Textfield.style.outline = "";
    player2Textfield.style.outline = "";
    return;
  }

  if (player1.isTurn == true) {
    player1Textfield.style.outline = "6px solid var(--main-color-1)";
    player2Textfield.style.outline = "";
    return;
  }
  if (player2.isTurn == true) {
    player1Textfield.style.outline = "";
    player2Textfield.style.outline = "6px solid var(--main-color-1)";
    return;
  }
}
updateActivePlayer();

// Update the scoreboard
function updateScoreboard() {
  if (gameStatus.draw == true) return;
  if (player1.isTurn == true) player1.score++;
  if (player2.isTurn == true) player2.score++;
  player1Scorefield.textContent = player1.score;
  player2Scorefield.textContent = player2.score;
}

//Reset the game
function resetGame() {
  gameStatus.draw = false;
  gameStatus.over = false;
  winnerTextfield.textContent = "";
  player1.isTurn = true;
  player2.isTurn = false;
  grid.innerHTML = "";
  updateActivePlayer();
  drawGrid();
}
