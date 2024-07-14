const ui = {
    playTimeout: null,
    resetTimeout: null,

    play: function () {
        document.getElementsByClassName('play-button')[0].disabled = true;
        document.getElementsByClassName('restart-button')[0].disabled = false;

        audio.initiateBackgroudMusicLooping();
        audio.playSound(audio.defaultBackgroundMusic);

        game.tick();

        ui.playTimeout = window.setTimeout(() => {
            world.drawTickDisco();
        }, 33950);
    },

    restart: function () {
        world.drawTickDisco();
        window.clearTimeout(world.tickTimeoutDisco);

        audio.playSound(audio.defaultBackgroundMusic);

        game.reset();
        game.tick();

        window.clearTimeout(ui.playTimeout);
        window.clearTimeout(ui.resetTimeout);
        ui.resetTimeout = window.setTimeout(() => {
            world.drawTickDisco();
        }, 33950);
    }
};