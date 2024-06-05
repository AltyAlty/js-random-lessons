const game = {
    setTimeoutID: null,
    ticks: 0,
    finished: false,

    tick: function () {
        window.clearTimeout(this.setTimeoutID);
        if (this.finished) { return };
        this.prepareDataForNextTick();
        this.renderPreparedDataForNextTick();
        this.setTimeoutID = window.setTimeout('game.tick()', 1000 / 60);
    },

    prepareDataForNextTick: function () {
        this.ticks++;
        enemies.prepareEnemiesData();
        world.prepareWorldData();
        player.preparePlayerData();
    },

    renderPreparedDataForNextTick: function () {
        world.draw();
        player.draw();
        for (let i = 0; i < enemies.enemiesList.length; i++) { enemies.enemiesList[i].draw() };
    },

    start: function () {
        document.getElementsByClassName('play-button')[0].disabled = true;
        document.getElementsByClassName('restart-button')[0].disabled = false;

        audio.playSound(audio.backgroundMusic);
        this.tick();
        this.showFPS();

        setTimeout(function () {
            world.fillWorldGrid();
            console.log(world.worldGrid);
        }, 100);
    },

    stop: function (reason) {
        this.finished = true;
        audio.pauseSound(audio.backgroundMusic);
        window.clearTimeout(this.setTimeoutID);
        alert(reason === 'win' ? 'You won!' : 'You lost!');
    },

    showFPS: function () {
        setInterval(() => {
            let currentTicks = game.ticks;

            setTimeout(() => {
                console.log('FPS: ' + (game.ticks - currentTicks));
            }, 1000);
        }, 1000);
    },
};