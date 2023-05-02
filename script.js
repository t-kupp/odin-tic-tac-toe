// Draw the 3x3 playing grid
for (let i = 0; i < 9; i++) {
  const grid = document.querySelector("#grid");
  const newTile = grid.appendChild(document.createElement("div"));
  newTile.classList.add("grid-tile");
  newTile.addEventListener("click", (e) => {
    playRound(e.target);
  });
}

// Constructing the players
function Player(name, mark, isTurn) {
  this.name = name;
  this.mark = mark;
  this.isTurn = isTurn;
}
const player1 = new Player("Player 1", '<i class="fa-solid fa-xmark"></i>', false);
const player2 = new Player("Player 2", '<i class="fa-solid fa-o"></i>', false);

// Playing the game!
player1.isTurn = true;

function playRound(activeTile) {
  if (activeTile.innerHTML !== "") return; //Check for empty tile

  //Player 1 turn
  if (player1.isTurn == true) {
    activeTile.innerHTML = player1.mark;
    player1.isTurn = false;
    player2.isTurn = true;
    return;
  }

  // Player 2 turn
  if (player2.isTurn == true) {
    activeTile.innerHTML = player2.mark;
    player1.isTurn = true;
    player2.isTurn = false;
    return;
  }
}
