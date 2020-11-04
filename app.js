const board = document.getElementById('board');

const winningPatterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

let playerXSpots = [];
let playerOSpots = [];
let counter = 1;
let currPlayer = 'O';
let winner = 'Player 1';

const makeBoard = () => {
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
      const col = document.createElement('td');
      col.idx = counter;
      col.innerHTML = counter;

      function handleClick(e) {
        if (currPlayer === 'O') {
          playerXSpots.push(this.idx);
        } else {
          playerOSpots.push(this.idx);
          console.log(playerXSpots, playerOSpots)
        } 
        this.innerHTML = currPlayer === 'O' ? 'X' : 'O';
        currPlayer = currPlayer === 'O' ? 'X' : 'O';
        this.removeEventListener('click', arguments.callee);
        
        if (checkWin()) {
          winner = currPlayer === 'O' ? 'Player 2' : 'Player 1';
          alert(`${winner} wins!!`);
          console.log(winner + ' wins!');
        }

      }
      col.addEventListener('click', handleClick);
      row.appendChild(col);
      counter++;
    }
    board.appendChild(row);
  }
}

const checkWin = () => {
  let win = false;
  let currPlayerSpots = playerXSpots;

  if (currPlayer === 'O') {
    currPlayerSpots = playerOSpots;
  }

  if (currPlayerSpots.length === 3) {

    for (let i = 0; i < winningPatterns.length; i++) {
      const currPattern = winningPatterns[i];
      let playerHasPattern = true;

      for (let j = 0; j < currPattern.length; j++) {
        let patternFound = false;
        for (let k = 0; k < currPlayerSpots.length; k++) {
          if (currPlayerSpots[k] === currPattern[j]) {
            patternFound = true;
            break;
          }
        }
        if (!patternFound) {
          playerHasPattern = false;
          break;
        }
      }
      if (playerHasPattern) {
        win = true;
        break;
      }
    }
  }

  return win;
}

const resetBoard = () => {
  console.log('reset clicked')
  currPlayer = 'O';
  counter = 1;
  playerXSpots = [];
  playerOSpots = [];
  makeBoard();
}

makeBoard();
