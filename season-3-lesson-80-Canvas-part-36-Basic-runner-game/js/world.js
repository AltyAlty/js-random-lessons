const world = {
    worldSpeed: worldDefaultSettings.worldSpeed,
    maxWorldSpeed: worldDefaultSettings.maxWorldSpeed,
    increaseWorldSpeedDivisor: worldDefaultSettings.increaseWorldSpeedDivisor,
    autoScroll: worldDefaultSettings.autoScroll,
    height: worldDefaultSettings.height,
    width: worldDefaultSettings.width,
    wallWidth: worldDefaultSettings.wallWidth,
    maximumWallHeight: worldDefaultSettings.maximumWallHeight,
    minimumWallHeight: worldDefaultSettings.minimumWallHeight,
    maximumWallsAtOneTIme: worldDefaultSettings.maximumWallsAtOneTIme,
    playerHeightMultiplayer: worldDefaultSettings.playerHeightMultiplayer,
    differnceBetweenCurrentLastWallAndNewWall: worldDefaultSettings.differnceBetweenCurrentLastWallAndNewWall,
    newWallLowHeightEnhancer: worldDefaultSettings.newWallLowHeightEnhancer,
    isLastWallAHole: worldDefaultSettings.isLastWallAHole,
    tempWallID: worldDefaultSettings.tempWallID,
    distanceTravelled: worldDefaultSettings.distanceTravelled,
    wallsPassed: worldDefaultSettings.wallsPassed,

    /*Метод для указания, что мир больше не прокручивается.*/
    stopWorld: function () {
        this.autoScroll = false;
    },

    /*Метод для генерации данных для будущих стен.*/
    addFutureWalls: function (
        maximumWallsAtOneTIme,
        playerHeightMultiplayer,
        minimumWallHeight,
        differnceBetweenCurrentLastWallAndNewWall,
        newWallLowHeightEnhancer
    ) {
        /*Если уже есть данные для минимум 4 стен, то ничего не делаем.*/
        if (walls.length >= maximumWallsAtOneTIme) {
            return;
        };

        /*Получаем данные о самой последней стене в массиве для стен.*/
        let currentLastWall = walls[walls.length - 1];

        /*Определяем на какую максимальную высоту может запрыгнуть игрок c текущей последней стены.*/
        let biggestJumpableHeight = currentLastWall.height + (players.playerOne.accelerationY - players.playerOne.gravity) * playerHeightMultiplayer;

        /*Если так получилось, что максимальная высота, на которую может запрыгнуть игрок c текущей последней стены оказалась больше, 
        чем предустановленное ограничение на максимальную высоту стены, то мы делаем так, чтобы максимальная высота, на которую 
        может запрыгнуть игрок c текущей последней стены была равна этому ограничению, чтобы случайно не создать стену, на которую
        не будет возможности запрыгнуть.*/
        if (biggestJumpableHeight > this.maximumWallHeight) {
            biggestJumpableHeight = this.maximumWallHeight;
        };

        /*Генерируем высоту для следующей стены. Полученная высота будет в диапазоне от минимально указанной высоты, до максимальной 
        высоты, на которую игрок может запрыгнуть игрок c текущей последней стены, плюс минимально указанная высота.*/
        let newWallHeight = Math.floor(Math.random() * biggestJumpableHeight) + minimumWallHeight;

        /*Если текущая последняя стена ниже, чем следующая стена, которую мы пытаемся создать, и их разница по высоте меньше установленного ограничения,
        то увеличиваем высчитанную высоту для следующей стены.*/
        if (currentLastWall.height < newWallHeight && Math.abs(newWallHeight - currentLastWall.height) < differnceBetweenCurrentLastWallAndNewWall) {
            newWallHeight += newWallLowHeightEnhancer;
        };

        /*Высчитываем координату X следующей стены, то есть там, где кончается предыдущая стены.*/
        let newWallX = currentLastWall.x + currentLastWall.width;

        let newWall; // Создаем переменную, которая будет хранить данный для следующей стены.

        /*Если текущая последняя стена не самая первая в игре, id текущей последней стены кратен указанному показателю и текущая последняя стена
        не имеет перед собой пропасти, то */
        if (currentLastWall.id !== 0 && currentLastWall.id % Math.floor(Math.random() * 6) === 0 && !this.isLastWallAHole) {

            /*высчитываем на сколько сдвинем по X следующую стену, чтобы создать пропасть,*/
            let newWallShift = Math.floor(Math.random() * this.wallWidth);

            if (newWallShift < 400) {
                newWallShift = 400;
            };

            /*создаем данные для стены, перед которой будет пропасть*/
            newWall = new Wall(
                newWallX + newWallShift, this.height - newWallHeight,
                this.wallWidth, newWallHeight,
                helper.getRandomColor(), helper.getRandomColor(),
                this.tempWallID, 2
            );

            /* и указываем, что последняя созданная стена имеет пропасть,*/
            this.isLastWallAHole = true;
        } else {
            /*иначе создаем данные для стены, перед которой не будет пропасти*/
            newWall = new Wall(
                newWallX, this.height - newWallHeight,
                this.wallWidth, newWallHeight,
                helper.getRandomColor(), helper.getRandomColor(),
                this.tempWallID, 2
            );

            /* и указываем, что последняя созданная стена не имеет пропасти.*/
            this.isLastWallAHole = false;
        };

        walls.push(newWall); /*Отправляем созданные данные в массив стен.*/

        this.tempWallID++; // Увеличиваем ID для последующей стены.        
    },

    /*Метод для удаления стен, которых больше не видно на экране.*/
    cleanOldWalls: function () {
        /*Мы не видим какой-либо стены, если она полностью ушла за экран. Это значит, что ее координата X как минимум равна отрицательному 
        значению собственной ширины.*/
        for (const i in walls) {
            if (walls[i].x <= -walls[i].width) {
                walls.splice(i, 1); /*Удаляем выбранную стену из массива с данными по стенам.*/
            };
        };
    },

    /*Метод для обновления счетчика пройденных стен.*/
    updateWallsPassed: function () {
        /*Мы не видим какой-либо стены, если она полностью ушла за экран. Это значит, что ее координата X как минимум равна отрицательному 
        значению собственной ширины.*/
        for (const i in walls) {
            if (walls[i].x <= -walls[i].width) {
                this.wallsPassed++; /*Обновляем количество пройденных стен.*/
            };
        };
    },

    /*Метод для увеличения скорости прокрутки мира каждое указанное количество пройденных стен.*/
    increaseWorldSpeed: function (divisor) {
        /*Мы не видим какой-либо стены, если она полностью ушла за экран. Это значит, что ее координата X как минимум равна отрицательному 
        значению ширины собственной ширины.*/
        for (const i in walls) {
            if (walls[i].x <= -walls[i].width) {
                if (this.wallsPassed % divisor === 0 && this.worldSpeed < this.maxWorldSpeed) {
                    this.worldSpeed++;
                };
            };
        };
    },

    /*Метод для отрисовки горизантольной границы середины экрана.*/
    drawMiddleLine: function () {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, canvas.height / 2, canvas.width, 1);
    },

    draw: function () {
        // this.drawMiddleLine();
        for (let i = 0; i < walls.length; i++) { walls[i].draw(); };
    }
};