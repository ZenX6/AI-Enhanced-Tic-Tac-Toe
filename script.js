let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Modify makeMove to call the AI move function if it's 'O's turn
function makeMove(cell) {
  if (cell.textContent === '' && gameActive) {
    if (currentPlayer === 'X') {
      cell.textContent = 'X';
      checkWin();
      currentPlayer = 'O';
      aiMove(); // Call AI move function
    }
  }
}

// Add an AI move function
function aiMove() {
  let bestScore = -Infinity;
  let bestMove;
  let board = Array.from(document.querySelectorAll('.cell')).map(cell => cell.textContent);

  // Minimax algorithm to find the best move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  // Make the best move
  document.querySelectorAll('.cell')[bestMove].textContent = 'O';
  checkWin();
  currentPlayer = 'X';
}

// Minimax function
function minimax(board, depth, isMaximizing) {
  // Check for terminal state (win, lose, draw) and return a value
  // ...

  if (isMaximizing) {
    let bestScore = -Infinity;
    // Iterate over the board and call minimax for each possible move
    // ...
    return bestScore;
  } else {
    let bestScore = Infinity;
    // Iterate over the board and call minimax for each possible move
    // ...
    return bestScore;
  }
}

// Evaluation function to score each terminal state of the board
function evaluate(board) {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] === board[b] && board[b] === board[c]) {
      if (board[a] === 'O') {
        return +10;
      } else if (board[a] === 'X') {
        return -10;
      }
    }
  }
  return 0;
}

// Check if there are no moves left on the board
function isMovesLeft(board) {
  return board.some(cell => cell === '');
}

// The main Minimax function
function minimax(board, depth, isMaximizing) {
  let score = evaluate(board);

  // If Maximizer has won the game return their score
  if (score === 10) return score;

  // If Minimizer has won the game return their score
  if (score === -10) return score;

  // If there are no more moves and no winner then it is a tie
  if (!isMovesLeft(board)) return 0;

  // If this maximizer's move
  if (isMaximizing) {
    let best = -Infinity;

    // Traverse all cells
    for (let i = 0; i < board.length; i++) {
      // Check if cell is empty
      if (board[i] === '') {
        // Make the move
        board[i] = 'O';

        // Call minimax recursively and choose the maximum value
        best = Math.max(best, minimax(board, depth + 1, !isMaximizing));

        // Undo the move
        board[i] = '';
      }
    }
    return best;
  } else {
    // If this minimizer's move
    let best = Infinity;

    // Traverse all cells
    for (let i = 0; i < board.length; i++) {
      // Check if cell is empty
      if (board[i] === '') {
        // Make the move
        board[i] = 'X';

        // Call minimax recursively and choose the minimum value
        best = Math.min(best, minimax(board, depth + 1, !isMaximizing));

        // Undo the move
        board[i] = '';
      }
    }
    return best;
  }
}

// AI move function which is the modified makeMove for AI
function aiMove() {
  let bestScore = -Infinity;
  let moveIndex;

  // Retrieve the current board state
  let board = Array.from(document.querySelectorAll('.cell')).map(cell => cell.textContent);

  // Iterate over the board and calculate the best move using the minimax algorithm
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        moveIndex = i;
      }
    }
  }

  // Perform the best move
  document.querySelectorAll('.cell')[moveIndex].textContent = 'O';
  checkWin();
  currentPlayer = 'X';
}

function makeMove(cellElement, cellIndex) {
  // No need to query the cell again, as the cell element is being passed directly
  let cell = cellElement;
  
  if (cell.textContent === '' && gameActive) {
    cell.textContent = currentPlayer;
    checkWin();

    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        setTimeout(aiMove, 100); // Add a small delay before AI move for better UX
      }
    }
  }
}


function checkWin() {
  let board = Array.from(document.querySelectorAll('.cell')).map(cell => cell.textContent);
  let gameWon = false;
  let winner = null;

  for (let condition of winConditions) {
    let [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameWon = true;
      winner = board[a];
      break;
    }
  }

  if (gameWon) {
    gameActive = false;
    alert(winner + ' has won!');
    if (winner === 'X') {
      scoreX++;
    } else {
      scoreO++;
    }
    updateScoreDisplay();
  } else if (!isMovesLeft(board)) {
    gameActive = false;
    alert('Draw!');
  }
}

// Add Event Listeners to Cells
document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => makeMove(index));
});


function updateScoreDisplay() {
  document.getElementById('score-x').textContent = `Score X: ${scoreX}`;
  document.getElementById('score-o').textContent = `Score O: ${scoreO}`;
}

// Call this function to reset the game
function resetGame() {
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
  gameActive = true;
}
