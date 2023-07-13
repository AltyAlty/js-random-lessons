const game = {
    tickTimeout: null,
    tickRate: gameDefaultSettings.tickRate,
    ticks: gameDefaultSettings.ticks,

    tick: function () {
        window.clearTimeout(game.tickTimeout);
        game.prepareDataForNextTick();
        window.requestAnimationFrame(game.renderPreparedDataForNextTick);

        if (world.autoScroll) {
            game.tickTimeout = window.setTimeout('game.tick()', game.tickRate);
        } else {
            audio.playSound(audio.loseSound); // Воспрозводим звук проигрыша.
        };
    },

    /*Метод для сброса данных игры в случае рестарта.*/
    reset: function () {
        this.ticks = gameDefaultSettings.ticks;

        players.playerOne.isActive = playerDefaultSettings.isActive;
        players.playerOne.y = playerDefaultSettings.y;
        players.playerOne.maximumJumpedDistance = playerDefaultSettings.maximumJumpedDistance;
        players.playerOne.jumpUpgrades = playerDefaultSettings.jumpUpgrades;

        walls = [new Wall(0, 550, 1400, canvas.height - 400, helper.getRandomColor(), helper.getRandomColor(), 1, 2)];

        world.worldSpeed = worldDefaultSettings.worldSpeed;
        world.autoScroll = worldDefaultSettings.autoScroll;
        world.distanceTravelled = worldDefaultSettings.distanceTravelled;
        world.wallsPassed = worldDefaultSettings.wallsPassed;
        world.tempWallID = worldDefaultSettings.tempWallID;

        audio.defaultBackgroundMusic.currentTime = 0;

        background.parallaxSpeedX = backgroundDefaultSettings.parallaxSpeedX;
    },

    prepareDataForNextTick: function () {
        if (!players.playerOne.isActive) { // Если игрок не активный, то останавливаем прокрутку мира.
            world.stopWorld();
            audio.pauseSound(audio.defaultBackgroundMusic); // Отключаем музыку.
        };

        world.updateWallsPassed(); // Обновляем количество пройденных стен.
        world.increaseWorldSpeed(world.increaseWorldSpeedDivisor); // Увеличиваем скорость прокрутки мира каждое указанное количество пройденных стен.
        world.cleanOldWalls(); // Удаляем ненужные стены.
        world.addFutureWalls( // Генерируем данные для будущих стен.
            world.maximumWallsAtOneTIme,
            world.playerHeightMultiplayer,
            world.minimumWallHeight,
            world.differnceBetweenCurrentLastWallAndNewWall,
            world.newWallLowHeightEnhancer,
            world.firstWallWithHoleID,
            world.addingHoleDivisor,
            world.minimumHoleWidth
        );

        if (this.ticks !== 0 && this.ticks % players.playerOne.upgradeJumpTickDivisor === 0) { // Улучшаем прыжок игрока через каждое указанное количество тиков.
            players.playerOne.maximumJumpedDistance += players.playerOne.jumpUpgradeDistance;
            players.playerOne.jumpUpgrades++;
        };
        players.playerOne.checkIfPlayerIsInAHole();
        players.playerOne.move();

        if (world.autoScroll) { // Пока прокручивается мир, двигаем стены.
            for (let i = 0; i < walls.length; i++) { walls[i].move(world.worldSpeed); };
            world.distanceTravelled += world.worldSpeed; // Высчитываем пройденный путь.
            this.ticks++; // Увеличиваем таймер.
        };
    },

    /*Метод для отрисовки результатов.*/
    drawScore: function () {
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.fillText('Speed: ' + world.worldSpeed, 10, 80); /*Выводим текст о текущей скорости прокрутки мира.*/
        ctx.fillText('Distance: ' + world.distanceTravelled, 10, 105); /*Выводим текст о том, какое расстояние было пройдено.*/
        ctx.fillText('Walls: ' + world.wallsPassed, 10, 130); /*Выводим текст о том, сколько стен было пройдено.*/
        ctx.fillText('Jump Upgrades: ' + players.playerOne.jumpUpgrades, 10, 155); /*Выводим текст о том, сколько раз улучшили прыжок.*/
        ctx.fillText('Seconds: ' + Math.floor(this.ticks / 60), 10, 180); /*Выводим секунды.*/
        ctx.fillText('Ticks: ' + this.ticks, 10, 205); /*Выводим тики.*/
    },

    renderPreparedDataForNextTick: function () {
        /*Делаем перерисовку только пока игрок активный.*/
        if (players.playerOne.isActive) {
            /*Увеличиваем скорость движения фона каждое указанное количество пройденных стен.*/
            if (world.wallsPassed > 0 && world.wallsPassed % background.increaseParallaxSpeedXDivisor === 0) { background.parallaxSpeedX += background.parallaxAccelerationX; };
            background.draw(background.parallaxSpeedX);
            world.draw();
            players.playerOne.draw();
            game.drawScore();
        };
    }
};