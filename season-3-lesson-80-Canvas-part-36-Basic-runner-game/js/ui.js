const ui = {
    play: function () {
        document.getElementsByClassName('play-button')[0].disabled = true;
        document.getElementsByClassName('restart-button')[0].disabled = false;

        audio.initiateBackgroudMusicLooping();
        audio.playSound(audio.defaultBackgroundMusic);

        game.tick();
    },

    restart: function () {
        audio.playSound(audio.defaultBackgroundMusic);

        game.reset();
        game.tick();
    }
};