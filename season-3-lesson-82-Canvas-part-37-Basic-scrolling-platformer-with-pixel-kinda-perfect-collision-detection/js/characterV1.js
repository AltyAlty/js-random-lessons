function Character(x, y, width, height, maxJumpHeight, runningSpriteRight, runningSpriteLeft) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentSpeedX = 0;
    this.currentDirectionX = 'right';
    this.currentDirectionY = 'down';
    this.downwardForce = 0;
    this.currentJumpHeight = 0;
    this.maxJumpHeight = maxJumpHeight;
    this.runningSpriteRight = runningSpriteRight;
    this.runningSpriteLeft = runningSpriteLeft;
    this.leadingEdgeX = 0;
    this.trailingEdgeX = 0;

    this.prepareCharacterData = function () {
        this.defineDirectionX();
        this.defineDirectionY();
        this.applyGravity();
        this.applyMovement();
    };

    this.applyGravity = function () {
        if (this.findIfCharacterIsJumping()) {
            this.currentJumpHeight += this.downwardForce * -1;

            if (this.currentJumpHeight >= this.maxJumpHeight) {
                this.downwardForce = world.gravity;
                this.currentJumpHeight = 0;
            };

        } else {

            if (this.currentDirectionY === 'down') {
                if (this.checkPixelCollisionLeftRightUpDown(this.x + this.currentSpeedX, this.y + this.downwardForce, this.width, this.height)) {
                    let solidPixel = this.checkPixelCollisionLeftRightUpDown(this.x + this.currentSpeedX, this.y + this.downwardForce, this.width, this.height);
                    this.y = solidPixel.y - this.height - 1;
                    this.downwardForce = 0;
                };
            };

            if (!this.findIfPlayerIsStandingOnAPlatform()) { this.downwardForce = world.gravity };
        };
    };

    this.applyMovement = function () {
        let nextX = this.x + this.currentSpeedX;
        let nextY = this.y + this.downwardForce;

        /*Не работает если платформа перед котом короче по высоте его самого.*/
        // let predictedLeadingEdgeX = this.findLeadingEdgeXOfCharacter() + this.currentSpeedX;
        // let isCharacterWalkingIntoSurface = world.findIfPixelIsSolidSurface(predictedLeadingEdgeX, nextY);

        // if (this.findIfCharacterIsMovingX() && isCharacterWalkingIntoSurface) {
        //     nextX = this.x;
        //     this.currentSpeedX = 0;
        // };

        if (this.findIfCharacterIsMovingX() && this.currentDirectionY === 'noYdirection') {
            let solidDot = null;

            if (this.currentDirectionX === 'right') {

                console.log('HERE');

                if (solidDot = this.checkPixelCollisionUpDownLeftRight(nextX, this.y, this.width, this.height)) {
                    nextX = solidDot.x - this.width;
                    this.currentSpeedX = 0;
                };

            } else if (this.currentDirectionX === 'left') {

                if (solidDot = this.checkPixelCollisionUpDownRightLeft(nextX, this.y, this.width, this.height)) {
                    nextX = solidDot.x + 1;
                    this.currentSpeedX = 0;
                };

            };
        };

        if (this.findIfCharacterIsMovingX() && this.currentDirectionY !== 'noYdirection') {
            let dot = null;

            if (this.currentDirectionX === 'right') {

                if (dot = this.checkPixelCollisionUpDownLeftRight(nextX, nextY, this.width, this.height)) {
                    nextX = this.x;
                    nextY = this.y;
                    this.currentSpeedX = 0;
                };

            } else if (this.currentDirectionX === 'left') {

                if (dot = this.checkPixelCollisionUpDownRightLeft(nextX, nextY, this.width, this.height)) {
                    nextX = this.x;
                    nextY = this.y;
                    this.currentSpeedX = 0;
                };

            };
        };

        if (this.findIfCharacterIsJumping()) {
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionLeftRightDownUp(nextX, nextY, this.width, this.height)) {
                this.downwardForce = world.gravity;
                this.currentJumpHeight = 0;
                nextY = this.y;
            };
        };

        this.x = nextX;
        this.y = nextY;
    };

    this.findIfCharacterIsJumping = function () { return this.downwardForce < 0 };
    this.isFalling = function () { return this.downwardForce > 0 };
    this.findIfCharacterIsMovingX = function () { return this.currentSpeedX !== 0 };

    this.findLeadingEdgeXOfCharacter = function () {
        if (this.currentSpeedX < 0) { return this.leadingEdgeX = this.x }
        else { return this.leadingEdgeX = this.x + this.width };
    };

    this.findTrailingEdgeXOfCharacter = function () {
        if (this.currentSpeedX < 0) { return this.trailingEdgeX = this.x + this.width }
        else { return this.trailingEdgeX = this.x };
    };

    this.findIfPlayerIsStandingOnAPlatform = function () {
        for (let i = this.x; i < this.x + width; i++) {
            if (world.findIfPixelIsSolidSurface(i, this.y + this.height + 1)) {
                return true;
            };
        };

        return false;
    };

    this.defineDirectionX = function () {
        if (this.currentSpeedX > 0) { this.currentDirectionX = 'right' }
        else if (this.currentSpeedX < 0) { this.currentDirectionX = 'left' };
    };

    this.defineDirectionY = function () {
        if (this.downwardForce > 0) { this.currentDirectionY = 'down' }
        else if (this.downwardForce < 0) { this.currentDirectionY = 'up' }
        else { this.currentDirectionY = 'noYdirection' };
    };

    this.drawHitbox = function (drawAtX) {
        ctx.fillStyle = 'rgb(234, 0, 255)';
        ctx.fillRect(drawAtX, this.y, this.width, this.height);
    };

    this.draw = function () {
        let drawAtX = this.x - world.distanceTravelledFromSpawnPoint;

        /*Проверяем не прошел ли игрок дальше точки спавна в левую сторону, и если так, то двигаем изображения персонажа.*/
        drawAtX = drawAtX > this.x ? this.x : drawAtX;

        /*Проверяем не находится ли игрок в конце уровня в правой стороне, и если так, то двигаем изображения персонажа.*/
        if (world.findIfPlayerIsAtLevelEnd()) {
            drawAtX = world.screenWidth - (world.levelImage.width - world.distanceTravelledFromSpawnPoint - (this.x - world.distanceTravelledFromSpawnPoint));
        };

        let sprite = null;

        if (this.currentDirectionX === 'right') {
            sprite = this.runningSpriteRight;
        } else if (this.currentDirectionX === 'left') {
            sprite = this.runningSpriteLeft;
        };

        if (!game.finished) {
            this.drawHitbox(drawAtX);

            if (this.findIfCharacterIsJumping() || this.isFalling()) {
                sprite.drawFrame(4, drawAtX, this.y, this.width, this.height);
            } else if (this.findIfCharacterIsMovingX()) {
                sprite.drawAnimation(game.ticks, drawAtX, this.y, this.width, this.height);
            } else {
                sprite.drawFrame(1, drawAtX, this.y, this.width, this.height);
            };
        };
    };

    this.collidesWith = function (other) {
        if (this.x >= other.x &&
            this.x <= other.x + other.width &&
            this.y >= other.y &&
            this.y <= other.y + other.height) {
            return true;
        };

        return false;
    };

    this.checkPixelCollisionUpDownLeftRight = function (x, y, width, height) {
        for (let i = x; i <= x + width; i++) {
            for (let j = y; j <= y + height; j++) {
                if (world.findIfPixelIsSolidSurface(i, j)) {
                    return { x: i, y: j };
                };
            };
        };

        return null;
    };

    this.checkPixelCollisionUpDownRightLeft = function (x, y, width, height) {
        for (let i = x + width; i >= x; i--) {
            for (let j = y; j <= y + height; j++) {
                if (world.findIfPixelIsSolidSurface(i, j)) {
                    return { x: i, y: j };
                };
            };
        };

        return null;
    };

    this.checkPixelCollisionLeftRightUpDown = function (x, y, width, height) {
        for (let i = y; i <= y + height; i++) {
            for (let j = x; j <= x + width; j++) {
                if (world.findIfPixelIsSolidSurface(j, i)) {
                    return { x: j, y: i };
                };
            };
        };

        return null;
    };

    this.checkPixelCollisionLeftRightDownUp = function (x, y, width, height) {
        for (let i = y + height; i >= y; i--) {
            for (let j = x; j <= x + width; j++) {
                if (world.findIfPixelIsSolidSurface(j, i)) {
                    return { x: j, y: i };
                };
            };
        };

        return null;
    }
};