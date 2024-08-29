// Tic - Tac - Toe
// const prompt = require('prompt-sync')();


const board = (function Gameboard() {
    const board = [];
    const rows = 3;
    const cols = 3;

    // populate board on init
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
          board[i].push(Cell());
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        // console.log(boardWithCellValues);
    }

    const playToken = (row, col, token) => {
        // space already taken
        board[row][col].addToken(token);
        return board[row][col];
    };

    const checkWin = (row, col, token) => {
        // horizontal
        if (board[row].every(cell => cell.getValue() === token)) return true;

        // vertical
        if (board.every(r => r[col].getValue() === token)) return true;

        // main diagonal
        let mainDiag = true;
        if (row === col) {
            for (let i = 0; i < board.length; i++) {
                if (board[i][i].getValue() !== token) {
                    mainDiag = false;
                    break;
                }
            }
        } else {
            mainDiag = false;
        }
        if (mainDiag) return true;

        // anti diagonal
        let antiDiag = true;
        if (row + col === board.length - 1) {
            for (let i = 0; i < board.length; i++) {
                if (board[i][board.length - 1 - i].getValue() !== token) {
                    antiDiag = false;
                    break;
                }
            }
        } else {
            antiDiag = false;
        }
        if (antiDiag) return true;

        return false;
    }

    // for UI
    const getBoard = () => board;

    const isBoardFull = () => {
        const availableCells = board.flatMap(row => row.filter(cell => cell.getValue() === 0));

        // no available cell to play -> tie
        if (!availableCells.length) return true;
        return false;
    }

    return { getBoard, playToken, printBoard, checkWin, isBoardFull };
})()


function Player(name, token) {
    return { name, token };
}


function Cell() {
    let value = 0;

    const getValue = () => value;

    const addToken = (token) => {
        value = token;
    }

    return { addToken, getValue };
}


function GameController(board, players) {
    let activePlayer =  players[0];
    
    const getActivePlayer = () => activePlayer;


    const playRound = (row, column) =>{
        // console.log(`${getActivePlayer().name} playing at row ${row} and column ${column}`);
        let cell = board.playToken(row, column, getActivePlayer().token);
        if (cell) {
            if (board.checkWin(row, column, getActivePlayer().token)) return 1;
            if (board.isBoardFull()) return 5;
            switchPlayerTurn();
            printNewRound();
        } else {
            console.log('Invalid move. Try again.');
            return 2;
        }
    }

    const printNewRound = () => {
        board.printBoard();
        // console.log(`${getActivePlayer().name}'s turn.`);
    };

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };


    // initial display of board
    printNewRound();

    return { getActivePlayer, playRound, getBoard: board.getBoard }
};


function displayController(board) {
    const players = [Player('Player 1', 1), Player('Player 2', 2)];
    const game = GameController(board, players);
    const boardDiv = document.querySelector('.board');
    const restartBtn = document.querySelector('.restart');
    const addBtn = document.querySelector('.add');
    const activePlayerDiv = document.querySelector('.turn');
    const dialog = document.querySelector("dialog");
    const submit = document.getElementById("submit");
    const form = document.querySelector("form");

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        activePlayerDiv.textContent = `${game.getActivePlayer().name}'s turn ...`;

        // Render board squares
        let counter = 0;
        board.forEach((row, rowIdx) => {
            row.forEach((cell, index) => {
                counter++;
                const cellButton = document.createElement("button");
                cellButton.classList.add("box");
                cellButton.classList.add(`b-${counter}`);

                updateBtn(cellButton, rowIdx, index, cell.getValue());
                boardDiv.appendChild(cellButton);
            })
        });
    };

    const updateBtn = (cellButton, row, col, val) => {
        cellButton.dataset.row = row;
        cellButton.dataset.column = col;
        cellButton.dataset.val = val;

        if (val === 1) {
            cellButton.textContent = "X";
        } else if (val === 2) {
            cellButton.textContent = "O";
        } else {
            cellButton.textContent = "";
        }
    }

    const clickHandlerBoard = (e) => {
        const col = parseInt(e.target.dataset.column);
        const row = parseInt(e.target.dataset.row);
        const val = parseInt(e.target.dataset.val);

        if (typeof col !== "number") return;
        if (typeof row !== "number") return;
        if (row < 0 || row > 2 || col < 0 || col > 2) return;

        if (val === 1 || val === 2) {
            alert('Space taken. Try another.');
            return;
        } else if (val === 0) {
            const res = game.playRound(row, col);
            updateScreen();
            if (res === 1) {
                setTimeout(() => alert(`${game.getActivePlayer().name} wins!`), 1);
                location.reload();
            } else if (res === 5) {
                setTimeout(() => alert('It\'s a tie!'), 1);
                location.reload();
            }
        }
        return;
    };

    const restartHandler = (e) => {
        window.location.reload();
    }

    const getPlayers = (e) => {
        console.log('here');
        e.preventDefault();
        let name = form.elements['player1'].value;
        if (name !== "") {
            const player1 = Player(name, 1);
            players[0] = player1;
            activePlayerDiv.textContent = `${name}'s turn ...`;
        }

        name = form.elements['player2'].value;
        if (name !== "") {
            const player2 = Player(name, 2);
            players[1] = player2;
        }
        console.log(players);
        dialog.close();
    }

    addBtn.addEventListener("click", (e) => dialog.showModal());
    restartBtn.addEventListener("click", restartHandler);
    boardDiv.addEventListener("click", clickHandlerBoard);
    submit.addEventListener("click", getPlayers);
    form.addEventListener("submit", getPlayers);
    updateScreen();
}

// Console version
const players = [Player('Player 1', 1), Player('Player 2', 2)];
const game = GameController(board, players);

displayController(board);