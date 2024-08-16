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
    updateCurrentPlayerDisplay(); // Update display when switching turns
  }

  function handleCellClick(row, column) {
    if (gameboard.addMark(row, column, activePlayer.mark)) {
      if (gameboard.checkWin()) {
        gameboard.printBoard();
        alert(`${activePlayer.name} wins!`);
        resetGame();
        return;
      }

      if (gameboard.checkDraw()) {
        gameboard.printBoard();
        alert("It's a draw!");
        resetGame();
        return;
      }

      switchTurn(); // Switch player and update display
      updateUI();
    } else {
      alert("Cell already occupied, try again.");
    }
  }

  function updateUI() {
    const board = gameboard.getBoard();
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const button = document.querySelector(
          `[data-row="${rowIndex}"][data-column="${colIndex}"]`
        );
        if (button) {
          button.textContent = cell || "";
          button.classList.remove("x", "o"); // Remove any existing classes
          if (cell === "X") {
            button.classList.add("x"); // Add X class
          } else if (cell === "O") {
            button.classList.add("o"); // Add O class
          }
        }
      });
    });
  }

  function updateCurrentPlayerDisplay() {
    const playerNameElement = document.getElementById("player-name");
    if (playerNameElement) {
      playerNameElement.textContent = activePlayer.name;
    }
  }

  function displayController() {
    const buttons = document.querySelectorAll(".game-cell"); // Select all button elements

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const row = parseInt(button.dataset.row); // Get row from button data attribute
        const column = parseInt(button.dataset.column); // Get column from button data attribute

        handleCellClick(row, column);
      });
    });
  }

  function resetGame() {
    const board = gameboard.getBoard();
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[row][col] = null;
      }
    }
    updateUI();
    activePlayer = players[0]; // Reset to PlayerOne
    updateCurrentPlayerDisplay(); // Update display when resetting the game
  }

  // Initialize the UI
  updateCurrentPlayerDisplay(); // Ensure the current player is displayed on load
  updateUI();
  displayController();
}

GameControl();
