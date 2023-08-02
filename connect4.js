// Get the HTML board node
const board = document.getElementById('board');

// Function to create the HTML game board
function makeHTMLBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('data-col', x);
      cell.setAttribute('data-row', y);
      row.append(cell);
    }
    board.append(row);
  }
}

// Function to add a piece to the HTML game board
function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);
  const cell = document.querySelector(`[data-row="${y}"][data-col="${x}"]`);
  cell.append(piece);
}

// Function to handle the player's move
function handleClick(evt) {
  // Get the x coordinate of the clicked cell
  const x = +evt.target.getAttribute('data-col');
  
  // Find the lowest empty spot in the column
  const y = findSpotForCol(x);
  if (y === null) {
    return; // Column is filled, do nothing
  }

  // Place the piece on the board and in the HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // Check if the player has won
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }

  // Check if the board is filled (tie)
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // Switch to the other player
  currPlayer = currPlayer === 1 ? 2 : 1;
}

// Add click event listeners to each cell in the board
board.addEventListener('click', handleClick);
