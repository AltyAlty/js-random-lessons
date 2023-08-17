const controls = {
    isLeftKeyDown: false,
    isRightKeyDown: false,
    isUpKeyDown: false,
    isDownKeyDown: false,

    mapping: {
        65: 'isLeftKeyDown',
        68: 'isRightKeyDown',
        87: 'isUpKeyDown',
        83: 'isDownKeyDown'
    },

    buttonPress: function (event) { this[this.mapping[event.keyCode]] = true },
    buttonRelease: function (event) { this[this.mapping[event.keyCode]] = false },

    initializePlayersControlsListening: function () {
        window.addEventListener('keydown', function (event) { controls.buttonPress(event) }, false);
        window.addEventListener('keyup', function (event) { controls.buttonRelease(event) }, false);
    }
};
