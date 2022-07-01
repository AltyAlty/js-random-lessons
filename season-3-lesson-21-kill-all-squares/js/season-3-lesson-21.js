let nonstopSquaresInterval;
let funnyBackgroundInterval;

function colorBackground() {
    setTimeout(() => {
        document.getElementsByClassName('theGame')[0].classList.remove('antiquewhite');
        document.getElementsByClassName('theGame')[0].classList.remove('green');
        document.getElementsByClassName('theGame')[0].classList.remove('red');
        document.getElementsByClassName('theGame')[0].classList.add('blue');
    }, 100);

    setTimeout(() => {
        document.getElementsByClassName('theGame')[0].classList.remove('blue');
        document.getElementsByClassName('theGame')[0].classList.remove('red');
        document.getElementsByClassName('theGame')[0].classList.add('green');
    }, 200);

    setTimeout(() => {
        document.getElementsByClassName('theGame')[0].classList.remove('blue');
        document.getElementsByClassName('theGame')[0].classList.remove('green');
        document.getElementsByClassName('theGame')[0].classList.add('red');
    }, 300);
};

function resetBackground() {
    clearInterval(funnyBackgroundInterval);
    document.getElementsByClassName('theGame')[0].classList.remove('blue');
    document.getElementsByClassName('theGame')[0].classList.remove('green');
    document.getElementsByClassName('theGame')[0].classList.remove('red');
    setTimeout(() => {
        document.getElementsByClassName('theGame')[0].classList.add('antiquewhite');
    }, 300);
};

function chooseDifficulty(squares, timer) {
    document.getElementsByClassName('difficulties')[0].classList.add('hidden');
    document.getElementsByClassName('play-buttons')[0].classList.remove('hidden');
    document.getElementsByClassName('basket')[0].classList.remove('hidden');
    document.getElementsByClassName('restart')[0].classList.remove('hidden');

    for (let i = 0; i < squares; i++) {
        addItem();
    };

    nonstopSquaresInterval = setInterval(addItem, timer);
    funnyBackgroundInterval = setInterval(colorBackground, 300);
};

/*-------------------------------------------------------------------------------------------------------------*/

let squareCount = 0;

function addItem() {
    if (squareCount < 15) {
        let square = document.createElement('div');
        square.classList.add('square', 'yellow');
        square.onclick = removeItem;
        document.getElementsByClassName('basket')[0].appendChild(square);
        squareCount++;
    } else {
        clearInterval(nonstopSquaresInterval);
        resetBackground();

        document.getElementsByClassName('play-buttons')[0].classList.add('hidden');
        document.getElementsByClassName('basket')[0].classList.add('hidden');
        document.getElementsByClassName('lose')[0].classList.remove('hidden');
        document.getElementsByClassName('restart')[0].classList.remove('hidden');
    };
};

function removeItem() {
    setTimeout(() => {
        this.classList.remove('yellow');
        this.classList.add('blue');
    }, 100);

    setTimeout(() => {
        this.classList.remove('blue');
        this.classList.add('green');
    }, 200);

    setTimeout(() => {
        this.classList.remove('green');
        this.classList.add('red');
    }, 300);

    setTimeout(() => {
        this.remove();
        squareCount--;

        if (document.getElementsByClassName('basket')[0].children.length === 0) {
            clearInterval(nonstopSquaresInterval);
            resetBackground();

            document.getElementsByClassName('play-buttons')[0].classList.add('hidden');
            document.getElementsByClassName('basket')[0].classList.add('hidden');
            document.getElementsByClassName('win')[0].classList.remove('hidden');
            document.getElementsByClassName('restart')[0].classList.remove('hidden');
        };
    }, 400);

    this.onclick = '';
};

/*-------------------------------------------------------------------------------------------------------------*/

function removeAllItems() {
    document.getElementsByClassName('basket')[0].innerHTML = '';
    squareCount = 0;
};

/*-------------------------------------------------------------------------------------------------------------*/

function restart() {
    clearInterval(nonstopSquaresInterval);
    resetBackground();

    document.getElementsByClassName('play-buttons')[0].classList.add('hidden');
    document.getElementsByClassName('basket')[0].classList.add('hidden');
    document.getElementsByClassName('win')[0].classList.add('hidden');
    document.getElementsByClassName('lose')[0].classList.add('hidden');
    document.getElementsByClassName('restart')[0].classList.add('hidden');
    document.getElementsByClassName('difficulties')[0].classList.remove('hidden');
    document.getElementsByClassName('basket')[0].innerHTML = '';
    squareCount = 0;
};