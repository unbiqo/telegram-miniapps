// script.js
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

function drawBoard() {
  boardEl.innerHTML = "";
  board.forEach((cell, i) => {
    const cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.innerText = cell;
    cellEl.addEventListener("click", () => makeMove(i));
    boardEl.appendChild(cellEl);
  });
}

function makeMove(index) {
  if (board[index] || gameOver) return;
  board[index] = currentPlayer;
  drawBoard();
  if (checkWinner()) {
    statusEl.innerText = `${currentPlayer} wins!`;
    gameOver = true;
  } else if (board.every(cell => cell)) {
    statusEl.innerText = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusEl.innerText = `Current: ${currentPlayer}`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusEl.innerText = `Current: ${currentPlayer}`;
  drawBoard();
}

resetGame();
