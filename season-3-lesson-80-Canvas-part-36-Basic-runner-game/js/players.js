const players = { playerOne: new Player() };

function Player(
    x, y,
    width, height,
    maxSpeedX, maxSpeedY,
    currentAccelerationY, accelerationY,
    gravity, accelerationX,
    friction, color
) {
    this.x = playerDefaultSettings.x;
    this.y = playerDefaultSettings.y;
    this.width = playerDefaultSettings.width;
    this.height = playerDefaultSettings.height;
    this.currentSpeedX = 0;
    this.currentSpeedY = 0;
    this.maxSpeedX = playerDefaultSettings.maxSpeedX;
    this.maxSpeedY = playerDefaultSettings.maxSpeedY;
    this.currentAccelerationY = playerDefaultSettings.currentAccelerationY;
    this.accelerationY = playerDefaultSettings.accelerationY;
    this.gravity = playerDefaultSettings.gravity;
    this.accelerationX = playerDefaultSettings.accelerationX;
    this.friction = playerDefaultSettings.friction;
    this.color = playerDefaultSettings.color;
    this.isActive = playerDefaultSettings.isActive;
    this.jumpedDistance = 0; // Переменная для подсчета какое расстояние игрок проделал находясь в воздухе во время прыжка.
    this.maximumJumpedDistance = playerDefaultSettings.maximumJumpedDistance;
    this.jumpUpgrades = playerDefaultSettings.jumpUpgrades;
    this.jumpUpgradeDistance = playerDefaultSettings.jumpUpgradeDistance;
    this.upgradeJumpTickDivisor = playerDefaultSettings.upgradeJumpTickDivisor;

    this.predictedHorizontalWayToTheRight = null;
    this.predictedHorizontalWayToTheLeft = null;
    this.predictedVerticalWayDown = null;
    this.predictedVerticalWayUp = null;

    this.isCollidedWithBottomSide = false; // Переменная, указывающая, что игрок касается какой-то стены нижней стороной.

    this.xGIFcoordinate = 0; /*Координата сдвига по Х оригинального изображения, чтобы двигать его внутри области изображения на холсте, 
    с целью имитации анимации.*/
    this.gifFrames = 0; // Переменная, отслеживающая сколько кадров анимации мы отрисовали.
    this.drawSlowingRate = playerDefaultSettings.drawSlowingRate;

    /*Метод для проверки не упал ли игрок в яму.*/
    this.checkIfPlayerIsInAHole = function () {
        if (this.y >= world.height) {
            this.isActive = false;
        };
    };

    this.predictCloseCollision = function () {
        /*Подготавливаем данные, где окажется игрок в следующий тик, если будет двигаться по Y.*/
        let predictedVerticalPosition = {
            x: this.x,
            y: this.y + this.currentSpeedY,
            width: this.width,
            height: this.height
        };

        /*Проверяем не будет ли коллизии между игроком и стенами по X в текущем тике и 
        коллизии между игроком и стенами по Y в следующем тике.*/
        for (let i = 0; i < walls.length; i++) { // Перебираем каждую стену.
            /*Проверяем нет ли коллизии между игроком и стенами в текущем тике по X.*/
            if (helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                this.x + this.width, walls[i].x,
                this.x, walls[i].x + walls[i].width,
                this.y + this.height, walls[i].y,
                this.y, walls[i].y + walls[i].height)
            ) {
                this.isActive = false; // Если есть коллизия между игроком и стенами в текущем тике по X, то останавливаем игрока.
            };

            /*Проверяем не будет ли коллизии между игроком и стенами в следующем тике, если он будет двигаться по Y.*/
            if (helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                predictedVerticalPosition.x + predictedVerticalPosition.width, walls[i].x,
                predictedVerticalPosition.x, walls[i].x + walls[i].width,
                predictedVerticalPosition.y + predictedVerticalPosition.height, walls[i].y,
                predictedVerticalPosition.y, walls[i].y + walls[i].height)
            ) {
                /*Если такая коллизия есть, то пока такая коллизия имеет место быть, сдвигаем по Y предполагаемую
                проекцию игрока, которая будет в следующем тике, ближе к текущей позиции игрока на 1 до тех пор, пока 
                не пропадет коллизия между предполагаемой позицией игрока и какой-то стеной. Делаем это пока игрок активный.*/
                while (helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                    predictedVerticalPosition.x + predictedVerticalPosition.width, walls[i].x,
                    predictedVerticalPosition.x, walls[i].x + walls[i].width,
                    predictedVerticalPosition.y + predictedVerticalPosition.height, walls[i].y,
                    predictedVerticalPosition.y, walls[i].y + walls[i].height)
                ) {
                    if (this.isActive) {
                        predictedVerticalPosition.y -= Math.sign(this.currentSpeedY);
                    } else {
                        predictedVerticalPosition.y -= 1; // Сдвигаем на 1 вручную, так как когда игрок не активен, его скорость по Y равна 0.
                    };
                };

                /*Как только мы перестанем сдвигать по Y предполагаемую проекцию игрока, которая будет в следующем тике, ближе 
                к текущей позиции игрока, то это будет означать, что мы имеем самую близку позицию игрока для следующего тика,
                когда игрок будет касаться какой-то стены, но не проходит через нее. Поэтому указываем, что координата Y
                этой предполагаемой позиции должна быть текущей координатой Y игрока и останавливаем игрока по Y, чтобы он не
                пытался двигаться дальше в стену, так как это приведет к бесконечной работе цикла "while".*/
                if (this.isActive) { // Сдвигаем игрока по Y только если он активен.
                    this.y = predictedVerticalPosition.y;
                    this.currentSpeedY = 0;
                    this.isCollidedWithBottomSide = true; // Указываем, что игрок касается какой-то стены нижней стороной.
                };
            };
        };
    };

    this.predictFarCollision = function () {
        /*Подготавливаем данные, описывающие путь, который игрок может пройти за следующий тик, если будет двигаться по X.*/
        if (world.worldSpeed > 0) { /* Если будет двигаться вправо. Теперь проверяем в зависимости от скорости прокрутки мира, 
        а не от собственной скорости игрока по X, так как он больше сам не двигается по X.*/
            this.predictedHorizontalWayToTheRight = {
                x: this.x + this.width,
                y: this.y,
                width: world.worldSpeed - this.width,
                height: this.height
            };
        } else {
            this.predictedHorizontalWayToTheRight = null;
        };

        /*Подготавливаем данные, описывающие путь, который игрок может пройти за следующий тик, если будет двигаться по Y.*/
        if (Math.abs(this.currentSpeedY) > this.height) {
            if (this.currentSpeedY > 0) { // Если будет двигаться вниз.
                this.predictedVerticalWayDown = {
                    x: this.x,
                    y: this.y + this.height,
                    width: this.width,
                    height: this.currentSpeedY - this.height
                };
            } else {
                this.predictedVerticalWayDown = null;
            };

            if (this.currentSpeedY < 0) { // Если будет двигаться вверх.
                this.predictedVerticalWayUp = {
                    x: this.x,
                    y: this.y - Math.abs(this.currentSpeedY) + this.height,
                    width: this.width,
                    height: Math.abs(this.currentSpeedY) - this.height
                };
            } else {
                this.predictedVerticalWayUp = null;
            };
        };

        /*Создаем переменные, которые будут хранить расстояния до препятствий, которые могут потенциально оказаться на пути,
        который игрок пройдет за следующий тик.*/
        let potentialCollisionsRight = [];
        let potentialCollisionsDown = [];
        let potentialCollisionsUp = [];

        for (let i = 0; i < walls.length; i++) { // Перебираем все стены.
            if (this.predictedHorizontalWayToTheRight) { // Если рассчитан путь вправо на следующий тик,
                if (helper.checkIntersectionBetweenTwoNotRotatedRectangles( // то проверяем не пересекается ли он с каким-то стенами,
                    this.predictedHorizontalWayToTheRight.x + this.predictedHorizontalWayToTheRight.width, walls[i].x,
                    this.predictedHorizontalWayToTheRight.x, walls[i].x + walls[i].width,
                    this.predictedHorizontalWayToTheRight.y + this.predictedHorizontalWayToTheRight.height, walls[i].y,
                    this.predictedHorizontalWayToTheRight.y, walls[i].y + walls[i].height
                )) { // и если пересекается, то сохраняем расстояние от игрока до этой стены.
                    potentialCollisionsRight.push(walls[i].x - this.x - this.width);
                };
            };

            if (this.predictedVerticalWayDown) { // Если рассчитан путь вниз на следующий тик,
                if (helper.checkIntersectionBetweenTwoNotRotatedRectangles( // то проверяем не пересекается ли он с каким-то стенами,
                    this.predictedVerticalWayDown.x + this.predictedVerticalWayDown.width, walls[i].x,
                    this.predictedVerticalWayDown.x, walls[i].x + walls[i].width,
                    this.predictedVerticalWayDown.y + this.predictedVerticalWayDown.height, walls[i].y,
                    this.predictedVerticalWayDown.y, walls[i].y + walls[i].height
                )) { // и если пересекается, то сохраняем расстояние от игрока до этой стены.
                    potentialCollisionsDown.push(walls[i].y - this.y - this.height);
                };
            };

            if (this.predictedVerticalWayUp) { // Если рассчитан путь вверх на следующий тик,
                if (helper.checkIntersectionBetweenTwoNotRotatedRectangles( // то проверяем не пересекается ли он с каким-то стенами,
                    this.predictedVerticalWayUp.x + this.predictedVerticalWayUp.width, walls[i].x,
                    this.predictedVerticalWayUp.x, walls[i].x + walls[i].width,
                    this.predictedVerticalWayUp.y + this.predictedVerticalWayUp.height, walls[i].y,
                    this.predictedVerticalWayUp.y, walls[i].y + walls[i].height
                )) { // и если пересекается, то сохраняем расстояние от игрока до этой стены.
                    potentialCollisionsUp.push(this.y - walls[i].y - walls[i].height);
                };
            };
        };

        /*Среди полученных расстояний находим самые маленькие.*/
        let closestCollisionRight = helper.findTheSmallestElementInArrayOfNumbers(potentialCollisionsRight);
        let closestCollisionDown = helper.findTheSmallestElementInArrayOfNumbers(potentialCollisionsDown);
        let closestCollisionUp = helper.findTheSmallestElementInArrayOfNumbers(potentialCollisionsUp);

        if (world.worldSpeed > 0 && closestCollisionRight) { // Если мир прокручивается и игрок движется вправо и на его пути потенциально есть препятствия,
            // world.worldSpeed = closestCollisionRight; // то в следующий тик его скорость равна расстоянию до самого ближайшего из этих препятствий.

            /*то сдвигаем все стенки на расстояние этой коллизии, чтобы они перескачили через игрока.*/
            for (let i = 0; i < walls.length; i++) {
                walls[i].x -= closestCollisionRight;
            };
        };

        if (this.currentSpeedY > 0 && closestCollisionDown) { // Если игрок движется вниз и на его пути потенциально есть препятствия,
            this.currentSpeedY = closestCollisionDown - 1; // то в следующий тик его скорость равна расстоянию до самого ближайшего из этих препятствий.
        };

        if (this.currentSpeedY < 0 && closestCollisionUp) { // Если игрок движется вверх и на его пути потенциально есть препятствия,
            this.currentSpeedY = -closestCollisionUp + 1; // то в следующий тик его скорость равна расстоянию до самого ближайшего из этих препятствий.
        };
    };

    this.move = function () {
        if (this.isActive) { // Реализуем движение игрока, если он активен.
            /*Обработка скоростей по Y.*/
            if (controls.isUpKeyPressed) { // Если нажато вверх,
                this.currentSpeedY -= this.currentAccelerationY; // то значит уменьшаем скорость по Y, чтобы двигать игрока вверх.
            };

            /*Применяем гравитацию.*/
            this.currentSpeedY += this.gravity; // Каждый тик увеличиваем скорость по Y, чтобы при применении этой скорости к игроку двигать его вниз.

            if (this.currentSpeedY < this.gravity && this.currentAccelerationY !== 0) { // Если мы прыгаем,
                this.jumpedDistance += (this.accelerationY - this.gravity); // то начинаем отсчитывать расстояние, которое проводим в воздухе при движении вверх
                this.isCollidedWithBottomSide = false; // и указываем, что игрок не касается какой-то стены нижней стороной.

                /*Если находясь в воздухе, расстояние, которые мы в нем прошли, больше установленного ограничения, то мы запрещаем игроку
                дальше прыгать и сбрасываем расстояние, которые мы прошли в воздухе во время прыжка, чтобы в следующем прыжке начать
                отсчет сначала.*/
                if (this.jumpedDistance >= this.maximumJumpedDistance) {
                    this.color = 'red';
                    this.currentAccelerationY = 0;
                    this.jumpedDistance = 0;
                    this.currentSpeedY = this.gravity;
                };
            };

            /*Если игрок коснулся какой-то стенки своей нижней стороной, то даем возможность снова прыгать игроку и если мы хоть немного прыгнули 
            и опустились на поверхность какой-то стены, то сбрасываем расстояние, которое прошли в воздухе во время прыжка, чтобы в следующем 
            прыжке начать отсчет сначала.*/
            if (this.isCollidedWithBottomSide) {
                this.color = 'orange';
                this.currentAccelerationY = this.accelerationY;
                this.jumpedDistance = 0;
            };

            /*Ограничиваем скорость по Y при достижения максимума.*/
            if (this.currentSpeedY >= this.maxSpeedY) { // Если достигаем максимума скорости по Y вверх,
                this.currentSpeedY = this.maxSpeedY; // то ограничиваем нашу скорость по Y максимально указанной.
            } else if (this.currentSpeedY < -this.maxSpeedY) { // Если достигаем максимума скорости по Y вниз,
                this.currentSpeedY = -this.maxSpeedY; // то ограничиваем нашу скорость по Y максимально указанной.
            };

            /*Округляем скорость по Y до целых значений. Поскольку метод "Math.floor()" для отрицательных значений, например,
            "-5,3" превращает в "-6", то есть модуль числа по факту округляется сверху, то для отрицательных значение используем 
            "Math.ceil()".*/
            if (this.currentSpeedY > 0) { // Если скорость по Y больше 0,
                this.currentSpeedY = Math.floor(this.currentSpeedY); // то округляем скорость по Y снизу. 
            } else {
                this.currentSpeedY = Math.ceil(this.currentSpeedY); // Если скорость по Y меньше или равна 0, то округляем скорость по Y сверху.
            };

            this.predictCloseCollision();
            this.predictFarCollision();

            /*Двигаем нашего игрока по Y.*/
            this.y += this.currentSpeedY;
        };
    };

    this.drawPredictedWays = function () {
        if (this.predictedHorizontalWayToTheRight) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.predictedHorizontalWayToTheRight.x, this.predictedHorizontalWayToTheRight.y, this.predictedHorizontalWayToTheRight.width, this.predictedHorizontalWayToTheRight.height);
        };

        if (this.predictedVerticalWayDown) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.predictedVerticalWayDown.x, this.predictedVerticalWayDown.y, this.predictedVerticalWayDown.width, this.predictedVerticalWayDown.height);
        };

        if (this.predictedVerticalWayUp) {
            ctx.fillStyle = 'violet';
            ctx.fillRect(this.predictedVerticalWayUp.x, this.predictedVerticalWayUp.y, this.predictedVerticalWayUp.width, this.predictedVerticalWayUp.height);
        };
    };

    this.drawPlayerCoordinates = function () {
        ctx.font = '10px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(this.x + ':' + this.y, this.x, this.y + 15);
        ctx.fillText((this.x + this.width) + ':' + this.y, this.x + this.width, this.y + 30);
        ctx.fillText(this.x + ':' + (this.y + this.height), this.x, this.y + this.height);
        ctx.fillText((this.x + this.width) + ':' + (this.y + this.height), this.x + this.width, this.y + this.height - 15);
    };

    /*Метод, отрисовывающий анимацию бегущего игрока.*/
    this.drawGIF = function () {
        /*Если игрок активный, то отрисовываем анимацию бегущего игрока.*/
        if (this.isActive) {
            /*Если мы отрисовали последний кадр из раскадровки анимации, то возвращаемся на позицию X так, чтобы следующий кадр оказался самым первым 
            из раскадровки. Иначе, двигаем по раскадровке дальше с указанием во сколько раз должна быть медленнее отрисовка анимации, чем скорость
            работы игры.*/
            if (this.xGIFcoordinate >= 160) {
                this.xGIFcoordinate = 0;
            } else if (this.gifFrames % this.drawSlowingRate === 0 && this.gifFrames !== 0) {
                this.xGIFcoordinate += 32;
            };

            ctx.drawImage( // Отрисовываем кадр анимации.
                imagePlayerRunning,
                this.xGIFcoordinate, 0, 32, 64,
                this.x, this.y, 32, 64
            );

            this.gifFrames++; // Указываем, что отрисовали на 1 кадр анимации больше.
        } else { /*Если игрок неактивный, то не отрисовываем анимацию бегущего игрока и сбрасываем данные, использующиеся для анимации игрока.*/
            ctx.drawImage(imagePlayer, this.x, this.y, 32, 64);

            this.xGIFcoordinate = 0;
            this.gifFrames = 0;
        };
    };

    /*Метод для отрисовки полоски прыжка.*/
    this.drawJumpBar = function () {
        /*Если мы в воздухе и у нас больше нет возможности прыгать еще выше, то отрисовывам всю полоску красной.*/
        if (this.currentAccelerationY === 0 && this.jumpedDistance === 0) {
            ctx.fillStyle = 'red';
            ctx.fillRect(10, 14, this.maximumJumpedDistance, 30);
        } else { /*Если мы в воздухе и все еще можем прыгать, то отрисовываем оранжвым цвет определенную часть полосы.*/
            ctx.fillStyle = 'orange';
            ctx.fillRect(10, 14, this.jumpedDistance, 30);
        };

        /*Делаем обводку для полосы прыжка.*/
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'violet';
        ctx.strokeRect(8, 12, this.maximumJumpedDistance + 4, 34)
    };

    this.draw = function () {
        // this.drawPredictedWays();
        this.drawGIF(); // Отрисовываем анимированное изображения игрока.
        this.drawJumpBar(); // Отрисовываем полоску прыжка.
        // this.drawPlayerCoordinates();
    };
};