const controls = {
    isUpKeyPressed: false,
    isDownKeyPressed: false,

    initializePlayersControlsListening: function () {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'w':
                case 'W':
                case 'ц':
                case 'Ц':
                    this.isUpKeyPressed = true;
                    break;

                case 's':
                case 'S':
                case 'ы':
                case 'Ы':
                    this.isDownKeyPressed = true;
                    break;

                default:
                    break;
            };
        }, false);

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'w':
                case 'W':
                case 'ц':
                case 'Ц':
                    this.isUpKeyPressed = false;
                    break;

                case 's':
                case 'S':
                case 'ы':
                case 'Ы':
                    this.isDownKeyPressed = false;
                    break;

                default:
                    break;
            };
        }, false);
    },
};