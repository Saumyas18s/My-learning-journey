const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 'red';
let gameOver = false;

// Load from localStorage if available
function loadGame() {
  const saved = localStorage.getItem('connect4');
  if (saved) {
    const state = JSON.parse(saved);
    for (let r = 0; r < ROWS; r++) {
      board[r] = [...state.board[r]];
    }
    currentPlayer = state.currentPlayer;
    gameOver = state.gameOver;
  } else {
    for (let r = 0; r < ROWS; r++) {
      board[r] = Array(COLS).fill(null);
    }
  }
}

// Save to localStorage
function saveGame() {
  localStorage.setItem('connect4', JSON.stringify({
    board,
    currentPlayer,
    gameOver
  }));
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (board[r][c]) cell.classList.add(board[r][c]);
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', () => placeDisc(c));
      gameBoard.appendChild(cell);
    }
  }

  document.getElementById('status').textContent = gameOver
    ? `${currentPlayer === 'red' ? 'Yellow' : 'Red'} wins!`
    : `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn`;
}

function placeDisc(col) {
  if (gameOver) return;

  for (let r = ROWS - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      if (checkWinner(r, col)) {
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      }
      saveGame();
      createBoard();
      return;
    }
  }
}

function checkWinner(row, col) {
  const directions = [
    [[0, 1], [0, -1]],     // Horizontal
    [[1, 0], [-1, 0]],     // Vertical
    [[1, 1], [-1, -1]],    // Diagonal \
    [[1, -1], [-1, 1]]     // Diagonal /
  ];

  for (let dir of directions) {
    let count = 1;
    for (let [dr, dc] of dir) {
      let r = row + dr, c = col + dc;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += dr;
        c += dc;
      }
    }
    if (count >= 4) return true;
  }
  return false;
}

function resetGame() {
  localStorage.removeItem('connect4');
  location.reload();
}

// Init game
loadGame();
createBoard();
