(function Gameboard() {
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
    }
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

    // No win found
    return false;
  };

  const checkDraw = () => {
    const isFull = board.every((row) => row.every((cell) => cell !== null));

    const winner = checkWin();

    return isFull, !winner;
  };

  return { getBoard, printBoard, addMark, checkWin, checkDraw };
})();

function GameControl() {
  const board = Gameboard();
}
