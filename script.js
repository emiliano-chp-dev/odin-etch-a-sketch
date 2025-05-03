"use strict";

function main() {
    // Store DOM elements
    const controlPanelElement = document.querySelector('.control_panel');
    const boardElement = document.querySelector('.board');

    // Core functions
    setBoard();
    delegateButtonFunctionality();

    // Sets the default board
    function setBoard(num=16) {
        resetBoard();
        const tiles = createTilesGroup(num);
        appendTiles(tiles);
    }

    // Delegates functions to buttons
    function delegateButtonFunctionality() {
        controlPanelElement.addEventListener('click', (event) => {
            let target = event.target;
    
            if (target.classList.contains('set_board')) {
                makeBoard();
            } else if (target.classList.contains('reset_board')) {
                setBoard();
            } else if (target.classList.contains('clean_board')) {
                cleanBoard();
            }
        })
    }

    // Empties the board
    function resetBoard() {
        boardElement.innerHTML = '';
    }

    // Creates a single tile
    function createTileElement(count) {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        tileElement.style.width = `${boardElement.clientWidth/count}px`;
        tileElement.style.height = `${boardElement.clientWidth/count}px`;
        return tileElement;
    }

    // Create tiles group
    function createTilesGroup(count) {
        const tilesGroup = [];
        for (let i = 1; i <= count * count; i++) {
            tilesGroup.push(createTileElement(count));
        }
        return tilesGroup;
    }

    // Append tiles
    function appendTiles(tiles) {
        tiles.forEach(tile => boardElement.appendChild(tile));
    }

    // Creates a new board based on user's input
    function makeBoard() {
        let inputString = prompt('How many cells per side? 1-100');

        let inputNum = parseInt(inputString);

        setBoard(inputNum);
    }

    // Cleans the background color from tiles
    function cleanBoard() {
        const tileGroup = Array.from(document.querySelectorAll('.tile'));

        tileGroup.forEach((tile) => { tile.style.backgroundColor = ''; })
    }
    
    // Delegates event listeners to tiles
    boardElement.addEventListener('mouseover', (event) => {
        const target = event.target;

        if (!target.classList.contains('tile')) return;

        target.style.backgroundColor = '#000';
        target.style.opacity = '1';
    })

    // ...
}

main();