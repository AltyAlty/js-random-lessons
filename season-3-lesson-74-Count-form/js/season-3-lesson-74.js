let game = {
    ballCountOption: 1
};

function specifyBallCountOption(el) {
    if (el.innerHTML === '+1') {
        game.ballCountOption++;
    } else if (el.innerHTML === '-1') {
        game.ballCountOption--;
    };

    if (game.ballCountOption <= 0) {
        game.ballCountOption = 1;
    } else if (game.ballCountOption >= 11) {
        game.ballCountOption = 10;
    };

    document.getElementsByClassName('input-one')[0].innerHTML = game.ballCountOption;
};

/*-------------------------------------------------------------------------------------------------------------*/