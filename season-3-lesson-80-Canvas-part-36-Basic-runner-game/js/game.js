const game = {
    tickTimeout: null,
    tickRate: gameDefaultSettings.tickRate,

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
        players.playerOne.isActive = playerDefaultSettings.isActive;
        players.playerOne.y = playerDefaultSettings.y;
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
            world.newWallLowHeightEnhancer
        );

        players.playerOne.checkIfPlayerIsInAHole();
        players.playerOne.move();

        if (world.autoScroll) { // Пока прокручивается мир, двигаем стены.
            for (let i = 0; i < walls.length; i++) { walls[i].move(world.worldSpeed); };
            world.distanceTravelled += world.worldSpeed; // Высчитываем пройденный путь.
        };
    },

    /*Метод для отрисовки результатов.*/
    drawScore: function () {
        ctx.fillStyle = 'white';
        ctx.font = '28px Arial';
        ctx.fillText('Скорость: ' + world.worldSpeed, 10, 40); /*Выводим текст о текущей скорости прокрутки мира.*/
        ctx.fillText('Пройдено дистанции: ' + world.distanceTravelled, 10, 75); /*Выводим текст о том, какое расстояние было пройдено.*/
        ctx.fillText('Пройдено стен: ' + world.wallsPassed, 10, 110); /*Выводим текст о том, сколько стен было пройдено.*/
    },

    renderPreparedDataForNextTick: function () {
        /*Делаем перерисовку только пока игрок активный.*/
        if (players.playerOne.isActive) {
            /*Увеличиваем скорость движения фона каждое указанное количество пройденных стен.*/
            if (world.wallsPassed > 0 && world.wallsPassed % background.increaseParallaxSpeedXDivisor === 0) { background.parallaxSpeedX += background.parallaxAccelerationX; };
            background.draw(background.parallaxSpeedX);
            players.playerOne.draw();
            world.draw();
            game.drawScore();
        };
    }
};