const INFINITY = 9999999,
  HUMAN = 'X',
  COMPUTER = 'O',
  BOARDSIZE = 9;

const columns = document.querySelectorAll('.column'),
  winner = document.querySelector('.winner'),
  restart = document.querySelector('.restart');

// Setting scores for both players
const scores = {
  X: -10,
  O: 10,
};

let board = new Array(9).fill(null),
  turnValue = HUMAN;

// Resetting the Game
const restartGame = function () {
  for (let i = 0; i < 9; ++i) columns[i].innerHTML = '';
  board = new Array(9).fill(null);
  turnValue = HUMAN;
  beginGame();
  winner.textContent = '';
};
restart.addEventListener('click', restartGame);

const checkForWin = function (board) {
  //Checking the columns
  for (let i = 0; i < BOARDSIZE / 3; ++i)
    if (
      board[i] != null &&
      board[i] === board[i + 3] &&
      board[i] === board[i + 6]
    )
      return true;

  // Checking for Rows
  for (let i = 0; i < BOARDSIZE; i = i + 3)
    if (
      board[i] != null &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2]
    )
      return true;

  // Checking for diagonals
  if (board[0] != null && board[0] === board[4] && board[4] === board[8])
    return true;

  // Checking for opposite diagonal
  if (board[2] != null && board[2] === board[4] && board[4] === board[6])
    return true;
  return false;
};

const minimax = function (board, isMax, height, alpha, beta) {
  let score, bestScore;

  if (checkForWin(board)) return scores[turnValue];
  if (checkForDraw(board)) return 0;

  if (isMax) {
    bestScore = -INFINITY;
    for (let i = 0; i < BOARDSIZE; ++i)
      if (board[i] === null) {
        board[i] = COMPUTER;
        if (checkForWin(board)) {
          score = 10 - height; // Subtracting height will reduce the steps to win
        } else {
          score = minimax(board, false, height + 1, alpha, beta);
        }
        board[i] = null; // Reverting to the original value
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
  } else {
    bestScore = INFINITY;
    for (let i = 0; i < BOARDSIZE; ++i)
      if (board[i] === null) {
        board[i] = HUMAN;
        if (checkForWin(board)) {
          score = -10 + height;
        } else {
          score = minimax(board, true, height + 1, alpha, beta);
        }
        // Reverting to the original value
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
  }
  return bestScore;
};

const checkForDraw = function (board) {
  for (let i = 0; i < BOARDSIZE; ++i) if (board[i] === null) return false;
  return true;
};

// Changing the turn value after each click
const changeTurnValue = function () {
  turnValue = turnValue === HUMAN ? COMPUTER : HUMAN;
};

const updateBoard = function (index, turnValue) {
  if (board[index] === null) {
    board[index] = turnValue;
    winner.textContent = '';
    winner.style.color = '#0033cc';
  } else {
    winner.textContent = 'Invalid Move!!!';
    winner.style.color = '#be0000';
    updateBoard();
  }

  for (let i = 0; i < BOARDSIZE; ++i) {
    columns[i].innerHTML = board[i];
    if (columns[i].innerHTML === HUMAN) columns[i].style.color = '#be0000';
    else columns[i].style.color = '#f0c929';
  }
};

// Removing the eventListener for columns
const removeListener = function () {
  columns.forEach(function (column) {
    column.removeEventListener('click', startMove);
  });
  // columns.forEach(function (column, index) {
  //   let new_column = column.cloneNode(true); // creating the clone of the existing node.
  //   column.parentNode.replaceChild(new_column, column);
  // });
};

// Display winner or tie
const displayResult = function (turnValue) {
  if (checkForWin(board)) {
    winner.textContent = `${turnValue} Wins`;
    removeListener();
    return true;
  }
  if (checkForDraw(board)) {
    winner.textContent = `Game is a Tie !!!`;
    removeListener();
    return true;
  }
  changeTurnValue();
};

function startMove(event) {
  let index = event.target.dataset.value,
    bestScore = -INFINITY,
    bestIndex = -1,
    score;

  updateBoard(index, HUMAN);
  if (displayResult(turnValue)) return true;

  for (let i = 0; i < BOARDSIZE; ++i) {
    if (board[i] === null) {
      board[i] = COMPUTER;
      score = minimax(board, false, 0, -INFINITY, INFINITY);
      board[i] = null;
    }
    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }
  updateBoard(bestIndex, COMPUTER);
  checkForWin(board);
  displayResult(turnValue);
}

const beginGame = function () {
  columns.forEach(function (column, index) {
    column.addEventListener('click', startMove);
  });
};

// updateBoard();
beginGame();
