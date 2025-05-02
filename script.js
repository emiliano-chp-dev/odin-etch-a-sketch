"use strict";

function main() {
    // Store DOM elements
    const controlPanelElement = document.querySelector('.control_panel');
    const boardElement = document.querySelector('.board');

    // Core functions
    setBoard();

    // Sets the default board
    function setBoard(num=16) {
        let count = num;
        resetBoard();
        createTiles(count);
        appendTiles();
    }

    // ...
}

main();