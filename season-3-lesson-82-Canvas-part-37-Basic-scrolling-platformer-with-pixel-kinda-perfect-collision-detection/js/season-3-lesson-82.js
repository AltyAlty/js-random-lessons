const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

window.onload = function () { controls.initializePlayersControlsListening() };

/*-------------------------------------------------------------------------------------------------------------------*/

// "FPS"
setInterval(() => {
    let currentTicks = game.ticks;

    setTimeout(() => {
        console.log(game.ticks - currentTicks);
    }, 1000);
}, 1000);