const gameboard = (function Gameboard() {
  let columns = 3;
  let rows = 3;
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(null);
    }
  }

  const getBoard = () => board;

  const printBoard = () => {
    board.forEach((row) => {
      const updatedRow = row.map((cell) => cell || " ").join("|");
      console.log(updatedRow);
    });
  };

  const addMark = (row, column, mark) => {
    if (board[row][column] === null) {
      board[row][column] = mark;
    } else {
      return false; // Mark placement failed, cell already occupied
    }
    return true; // Mark placement succeeded
  };

  const checkWin = () => {
    const numRows = board.length;
    const numCols = board[0].length;

    // Check for horizontal wins (rows)
    for (let row = 0; row < numRows; row++) {
      if (board[row].every((cell) => cell === board[row][0] && cell !== null)) {
        return true; // Row win
      }
    }

    // Check for vertical wins (columns)
    for (let col = 0; col < numCols; col++) {
      const columnValues = board.map((row) => row[col]);
      if (
        columnValues.every(
          (value) => value === columnValues[0] && value !== null
        )
      ) {
        return true; // Column win
      }
    }

    // Check for diagonal wins
    if (
      (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0] !== null) ||
      (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2] !== null)
    ) {
      return true; // Diagonal win
    }

    // No win found
    return false;
  };

  const checkDraw = () => {
    const isFull = board.every((row) => row.every((cell) => cell !== null));
    return isFull && !checkWin();
  };

  return { getBoard, printBoard, addMark, checkWin, checkDraw };
})();

function GameControl() {
  const PlayerOneName = "PlayerOne";
  const PlayerTwoName = "PlayerTwo";

  const players = [
    {
      name: PlayerOneName,
      mark: "X",
    },
    {
      name: PlayerTwoName,
      mark: "O",
    },
  ];

  let activePlayer = players[0];

  function switchTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  function getMarkInput() {
    const row = parseInt(prompt("Enter the row number (0, 1, 2):"), 10);
    const column = parseInt(prompt("Enter the column number (0, 1, 2):"), 10);
    return { row, column };
  }

  function gameLoop() {
    while (true) {
      gameboard.printBoard();
      const { row, column } = getMarkInput();

      if (row >= 0 && row < 3 && column >= 0 && column < 3) {
        const markPlaced = gameboard.addMark(row, column, activePlayer.mark);

        if (!markPlaced) {
          console.log("Cell already occupied, try again.");
          continue;
        }

        if (gameboard.checkWin()) {
          gameboard.printBoard();
          console.log(`${activePlayer.name} wins!`);
          break;
        }

        if (gameboard.checkDraw()) {
          gameboard.printBoard();
          console.log("It's a draw!");
          break;
        }

        switchTurn();
      } else {
        console.log(
          "Invalid input. Please enter a row and column between 0 and 2."
        );
      }
    }
  }

  gameLoop();
}
GameControl();
