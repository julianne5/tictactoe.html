window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const scoreDisplay = document.getElementById('score');
    const categorySelect = document.getElementById('category');
    const playersSelect = document.getElementById('players');

    let board = Array(5 * 6).fill('');
    let currentPlayer = 'X';
    let isGameActive = true;
    let score = { X: 0, O: 0 };

    const POINTS_TO_WIN = 5;

    const winningConditions = [
        [0, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29],
        [0, 6, 12, 18, 24],
        [1, 7, 13, 19, 25],
        [2, 8, 14, 20, 26],
        [3, 9, 15, 21, 27],
        [4, 10, 16, 22, 28],
        [5, 11, 17, 23, 29],
        [0, 7, 14, 21, 28],
        [5, 10, 15, 20, 25]
    ];

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const cells = winCondition.map(index => board[index]);
            if (cells.every(cell => cell === 'X') || cells.every(cell => cell === 'O')) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            score[currentPlayer]++;
            scoreDisplay.innerText = Score: ${score.X} - ${score.O};
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes('') && !roundWon)
            announce(TIE);
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(player${currentPlayer});
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = Array(5 * 6).fill('');
        isGameActive = true;
        announcer.classList.add('hide');

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });

        currentPlayer = 'X'; // Reset current player
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);

    // AI functionality
    const aiPlayer = () => {
        if (isGameActive && playersSelect.value === 'ai' && currentPlayer === 'O') {
            const emptyTiles = tiles.filter(tile => tile.innerText === '');
            const randomIndex = Math.floor(Math.random() * emptyTiles.length);
            const selectedTile = emptyTiles[randomIndex];
            if (selectedTile) {
                userAction(selectedTile, tiles.indexOf(selectedTile));
            }
        }
    }

    setInterval(aiPlayer, 1000); // Adjust the interval as needed
});
