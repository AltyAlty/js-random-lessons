let colorWinnerInterval;
colorWinnerTimeouts = [];

function colorWinner() {
    setTimeout(() => {
        document.getElementsByTagName('body')[0].className = 'background-two';
    }, 450);

    colorWinnerInterval = setInterval(() => {
        colorWinnerTimeouts[0] = setTimeout(() => {
            document.getElementsByClassName('characters')[0].className = 'characters winner-one';
        }, 75);

        colorWinnerTimeouts[1] = setTimeout(() => {
            document.getElementsByClassName('characters')[0].className = 'characters winner-two';
        }, 150);

        colorWinnerTimeouts[2] = setTimeout(() => {
            document.getElementsByClassName('characters')[0].className = 'characters winner-three';
        }, 225);

        colorWinnerTimeouts[3] = setTimeout(() => {
            document.getElementsByClassName('characters')[0].className = 'characters winner-four';
        }, 300);

        colorWinnerTimeouts[4] = setTimeout(() => {
            document.getElementsByClassName('characters')[0].className = 'characters winner-five';
        }, 375);
    }, 375);
};

/*-------------------------------------------------------------------------------------------------------------*/

let audio = new Audio('./src/audio.mp3');
audio.volume = 0.10;

let amountOfCharactersChildren = document.getElementsByClassName('characters')[0].children.length;

let currentRandomNumber;
let previousRandomNumber;

function randomize() {
    document.getElementsByTagName('body')[0].className = 'background-one';

    clearInterval(colorWinnerInterval);

    for (let d = 0; d < colorWinnerTimeouts.length; d++) {
        clearTimeout(colorWinnerTimeouts[d]);
    };

    document.getElementsByClassName('roll')[0].disabled = true;

    audio.pause();
    audio.currentTime = 0;

    document.getElementsByClassName('characters')[0].className = 'characters not-winner';

    for (let a = 0; a < amountOfCharactersChildren; a++) {
        document.getElementsByClassName('characters')[0].children[a].classList.add('hidden');
    };

    audio.play();

    for (let b = 0; b < 45; b++) {
        setTimeout(() => {
            for (let c = 0; c < amountOfCharactersChildren; c++) {
                document.getElementsByClassName('characters')[0].children[c].classList.add('hidden');
            };

            currentRandomNumber = Math.floor(Math.random() * 17);

            if (currentRandomNumber !== previousRandomNumber) {
                document.getElementsByClassName('characters')[0].children[currentRandomNumber].classList.remove('hidden');
            } else if (currentRandomNumber !== amountOfCharactersChildren - 1) {
                currentRandomNumber++;
                document.getElementsByClassName('characters')[0].children[currentRandomNumber].classList.remove('hidden');
            } else if (currentRandomNumber === amountOfCharactersChildren - 1) {
                currentRandomNumber--;
                document.getElementsByClassName('characters')[0].children[currentRandomNumber].classList.remove('hidden');
            };

            previousRandomNumber = currentRandomNumber;

            if (b === 44) {
                colorWinner();

                setTimeout(() => {
                    previousRandomNumber = amountOfCharactersChildren + 1;

                    document.getElementsByClassName('roll')[0].disabled = false;
                }, 480);
            };
        }, 100 + b * b * 2.5);
    };
};

/*-------------------------------------------------------------------------------------------------------------*/

let backgroundMusic = new Audio('./src/background-music.mp3');
backgroundMusic.volume = 0.02;
backgroundMusic.loop = true;
isBackgroundMusicOn = false;

function playBackgroundMusic() {
    if (!isBackgroundMusicOn) {
        backgroundMusic.play();
        isBackgroundMusicOn = true;
    } else {
        backgroundMusic.pause();
        isBackgroundMusicOn = false;
    };
};