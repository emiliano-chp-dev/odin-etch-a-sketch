"use strict";

function main() {
    // Store DOM elements
    const controlPanelElement = document.querySelector('.control_panel');
    const boardElement = document.querySelector('.board');

    // Variables
    let colorMode = 'grayscale';
    let fillMode = 'solid';

    // Core functions
    setBoard();
    delegateButtonFunctionality();
    colorTiles();

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
            } else if (target.classList.contains('set_color_mode')) {
                setColorMode(event);
            } else if (target.classList.contains('fill_mode')) {
                toggleFillMode(event);
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
    
    // Sets the color mode
    function setColorMode(event) {
        event.target.classList.toggle('grayscale');
        event.target.classList.toggle('color');
        colorMode = [...event.target.classList].at(-1);
        console.log(colorMode);
    }

    // Colors tiles based on color mode
    function colorTiles() {
        boardElement.addEventListener('mouseover', (event) => {
            if (!event.target.classList.contains('tile')) return;

            if (colorMode === 'grayscale') {
                event.target.style.backgroundColor = '#000';
            } else if (colorMode === 'color'){
                event.target.style.backgroundColor = `${getRandomColor()}`;
            }

            if (fillMode !== 'increment') {
                event.target.style.opacity = 1;
            } else {
                incrementOpacity(event.target);
            }
        });
    }

    // Returns a random colro hex code
    function getRandomColor() {
        let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        return randomColor;
    }

    // Toggles fill mode
    function toggleFillMode(event) {
        const isIncrement = event.target.classList.toggle('increment');
        fillMode = isIncrement ? 'increment' : 'solid';
        console.log(fillMode);
    }

    // Increments opacity
    function incrementOpacity(elem) {
        let currentOpacity = parseFloat(elem.style.opacity) || 0;
        if (currentOpacity < 1) {
            elem.style.opacity = (currentOpacity + 0.1).toFixed(1);
        }
    }
}

main();