const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*--------------------------------------------------------------------------------------------------------------------------------------------*/

const imageBackground = new Image(canvas.width, canvas.height);
const imagePlayer = new Image(32, 64);
const imagePlayerRunning = new Image(32, 64);

window.onload = function () {
    controls.initializePlayersControlsListening();
    imageBackground.src = './src/background/background-001.png';
    imagePlayer.src = './src/player/run-001.png';
    imagePlayerRunning.src = './src/player/character-run-001-frames.png';
};