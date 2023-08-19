function Character(x, y, width, height, maxJumpHeight, runningSpriteRight, runningSpriteLeft) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentSpeedX = 0;
    this.currentDirectionXForDrawing = 'right';
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
        // this.defineDirectionX();
        // this.defineDirectionY();
        this.defineDirectionXForDrawing();
        this.applyGravity();
        this.applyMovementX();
        this.applyMovementY();
        // this.applyMovementXOld();
        // this.applyMovementYOld();
    };

    this.applyGravity = function () {
        if (this.findIfCharacterIsJumping()) {
            this.currentJumpHeight += this.downwardForce * -1;

            if (this.currentJumpHeight >= this.maxJumpHeight) {
                this.downwardForce = world.gravity;
                this.currentJumpHeight = 0;
            };
        } else {
            if (!this.findIfPlayerIsStandingOnAPlatform()) { this.downwardForce = world.gravity };
        };
    };

    this.applyMovementX = function () {
        let nextX = this.x + this.currentSpeedX;

        if (this.currentSpeedX !== 0) {

            let predictedHorizontalPosition = {
                x: nextX,
                y: this.y,
                width: this.width,
                height: this.height
            };

            for (let i = 0; i < world.worldGrid.length; i++) {
                for (let j = 0; j < world.worldGrid[i].length; j++) {
                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedHorizontalPosition.x + predictedHorizontalPosition.width, world.worldGrid[i][j][0],
                            predictedHorizontalPosition.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                            predictedHorizontalPosition.y + predictedHorizontalPosition.height, world.worldGrid[i][j][1],
                            predictedHorizontalPosition.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                        ) && world.worldGrid[i][j][4] === true
                    ) {

                        let currentIntersection = {};

                        function calculateIntersection(currentIntersection) {
                            currentIntersection.x = predictedHorizontalPosition.x >= world.worldGrid[i][j][0] ? predictedHorizontalPosition.x : world.worldGrid[i][j][0];

                            currentIntersection.farX = predictedHorizontalPosition.x + predictedHorizontalPosition.width <= world.worldGrid[i][j][0] + world.worldGrid[i][j][2] ?
                                predictedHorizontalPosition.x + predictedHorizontalPosition.width : world.worldGrid[i][j][0] + world.worldGrid[i][j][2];

                            currentIntersection.y = predictedHorizontalPosition.y >= world.worldGrid[i][j][1] ? predictedHorizontalPosition.y : world.worldGrid[i][j][1];

                            currentIntersection.farY = predictedHorizontalPosition.y + predictedHorizontalPosition.height <= world.worldGrid[i][j][1] + world.worldGrid[i][j][3] ?
                                predictedHorizontalPosition.y + predictedHorizontalPosition.height : world.worldGrid[i][j][1] + world.worldGrid[i][j][3];

                            currentIntersection.width = currentIntersection.farX - currentIntersection.x;
                            currentIntersection.height = currentIntersection.farY - currentIntersection.y;
                        };

                        calculateIntersection(currentIntersection);

                        function checkPixelCollisionBetweenCurrentIntersectionAndGridCell() {
                            for (let k = currentIntersection.x; k <= currentIntersection.x + currentIntersection.width; k++) { // x
                                for (let l = currentIntersection.y; l <= currentIntersection.y + currentIntersection.height; l++) { // y
                                    for (let value of world.worldGrid[i][j][5]) {
                                        if (value.x === k && value.y === l) { return true };
                                    };
                                };
                            };

                            return false;
                        };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.currentSpeedX > 0) { // ⇒

                            // console.log('Checking RIGHT');

                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x < nextX) {
                                nextX = predictedHorizontalPosition.x;
                            };

                            this.currentSpeedX = 0;
                        };

                        // if (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                        //     currentIntersection.width, currentIntersection.height) && this.currentSpeedX > 0) { // ⇒

                        //     // console.log('Checking RIGHT');

                        //     while (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                        //         currentIntersection.width, currentIntersection.height)
                        //     ) {
                        //         predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                        //         calculateIntersection(currentIntersection);
                        //     };

                        //     if (predictedHorizontalPosition.x < nextX) {
                        //         nextX = predictedHorizontalPosition.x;
                        //     };

                        //     this.currentSpeedX = 0;
                        // };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.currentSpeedX < 0) { // ⇐

                            // console.log('Checking LEFT');

                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x > nextX) {
                                nextX = predictedHorizontalPosition.x;
                            };

                            this.currentSpeedX = 0;
                        };

                        // if (this.checkPixelCollisionRightLeftDownUp(currentIntersection.x, currentIntersection.y,
                        //     currentIntersection.width, currentIntersection.height) && this.currentSpeedX < 0) { // ⇐

                        //     // console.log('Checking LEFT');

                        //     while (this.checkPixelCollisionRightLeftDownUp(currentIntersection.x, currentIntersection.y,
                        //         currentIntersection.width, currentIntersection.height)
                        //     ) {
                        //         predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                        //         calculateIntersection(currentIntersection);
                        //     };

                        //     if (predictedHorizontalPosition.x > nextX) {
                        //         nextX = predictedHorizontalPosition.x;
                        //     };

                        //     this.currentSpeedX = 0;
                        // };
                    };
                };
            };
        };

        this.x = nextX;
    };

    this.applyMovementY = function () {
        let nextY = this.y + this.downwardForce;

        if (this.downwardForce !== 0) {

            let predictedVerticalPosition = {
                x: this.x,
                y: nextY,
                width: this.width,
                height: this.height
            };

            for (let i = 0; i < world.worldGrid.length; i++) {
                for (let j = 0; j < world.worldGrid[i].length; j++) {
                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedVerticalPosition.x + predictedVerticalPosition.width, world.worldGrid[i][j][0],
                            predictedVerticalPosition.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                            predictedVerticalPosition.y + predictedVerticalPosition.height, world.worldGrid[i][j][1],
                            predictedVerticalPosition.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                        ) && world.worldGrid[i][j][4] === true
                    ) {

                        let currentIntersection = {};

                        function calculateIntersection(currentIntersection) {
                            currentIntersection.x = predictedVerticalPosition.x >= world.worldGrid[i][j][0] ? predictedVerticalPosition.x : world.worldGrid[i][j][0];

                            currentIntersection.farX = predictedVerticalPosition.x + predictedVerticalPosition.width <= world.worldGrid[i][j][0] + world.worldGrid[i][j][2] ?
                                predictedVerticalPosition.x + predictedVerticalPosition.width : world.worldGrid[i][j][0] + world.worldGrid[i][j][2];

                            currentIntersection.y = predictedVerticalPosition.y >= world.worldGrid[i][j][1] ? predictedVerticalPosition.y : world.worldGrid[i][j][1];

                            currentIntersection.farY = predictedVerticalPosition.y + predictedVerticalPosition.height <= world.worldGrid[i][j][1] + world.worldGrid[i][j][3] ?
                                predictedVerticalPosition.y + predictedVerticalPosition.height : world.worldGrid[i][j][1] + world.worldGrid[i][j][3];

                            currentIntersection.width = currentIntersection.farX - currentIntersection.x;
                            currentIntersection.height = currentIntersection.farY - currentIntersection.y;
                        };

                        calculateIntersection(currentIntersection);

                        function checkPixelCollisionBetweenCurrentIntersectionAndGridCell() {
                            for (let k = currentIntersection.x; k <= currentIntersection.x + currentIntersection.width; k++) { // x
                                for (let l = currentIntersection.y; l <= currentIntersection.y + currentIntersection.height; l++) { // y
                                    for (let value of world.worldGrid[i][j][5]) {
                                        if (value.x === k && value.y === l) { return true };
                                    };
                                };
                            };

                            return false;
                        };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.downwardForce < 0) { // ⇑

                            // console.log('Checking UP');

                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y > nextY) {
                                nextY = predictedVerticalPosition.y;
                            };

                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };

                        // if (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                        //     currentIntersection.width, currentIntersection.height) && this.downwardForce < 0) { // ⇑

                        //     // console.log('Checking UP');

                        //     while (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                        //         currentIntersection.width, currentIntersection.height)
                        //     ) {
                        //         predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                        //         calculateIntersection(currentIntersection);
                        //     };

                        //     if (predictedVerticalPosition.y > nextY) {
                        //         nextY = predictedVerticalPosition.y;
                        //     };

                        //     this.downwardForce = 0;
                        //     this.currentJumpHeight = 0;
                        // };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.downwardForce > 0) { // ⇓

                            // console.log('Checking DOWN');

                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y < nextY) {
                                nextY = predictedVerticalPosition.y;
                            };

                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };

                        // if (this.checkPixelCollisionLeftRightUpDown(currentIntersection.x, currentIntersection.y,
                        //     currentIntersection.width, currentIntersection.height) && this.downwardForce > 0) { // ⇓

                        //     // console.log('Checking DOWN');

                        //     while (this.checkPixelCollisionLeftRightUpDown(currentIntersection.x, currentIntersection.y,
                        //         currentIntersection.width, currentIntersection.height)
                        //     ) {
                        //         predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                        //         calculateIntersection(currentIntersection);
                        //     };

                        //     if (predictedVerticalPosition.y < nextY) {
                        //         nextY = predictedVerticalPosition.y;
                        //     };

                        //     this.downwardForce = 0;
                        //     this.currentJumpHeight = 0;
                        // };
                    };
                };
            };
        };

        this.y = nextY;
    };

    this.applyMovementXOld = function () {
        let nextX = this.x + this.currentSpeedX;

        if (this.currentSpeedX !== 0) {

            let predictedHorizontalPosition = {
                x: nextX,
                y: this.y,
                width: this.width,
                height: this.height
            };

            for (let i = 0; i < world.worldGrid.length; i++) {
                for (let j = 0; j < world.worldGrid[i].length; j++) {
                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedHorizontalPosition.x + predictedHorizontalPosition.width, world.worldGrid[i][j][0],
                            predictedHorizontalPosition.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                            predictedHorizontalPosition.y + predictedHorizontalPosition.height, world.worldGrid[i][j][1],
                            predictedHorizontalPosition.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                        ) && world.worldGrid[i][j][4] === true
                    ) {

                        let currentIntersection = {};

                        function calculateIntersection(currentIntersection) {
                            currentIntersection.x = predictedHorizontalPosition.x >= world.worldGrid[i][j][0] ? predictedHorizontalPosition.x : world.worldGrid[i][j][0];

                            currentIntersection.farX = predictedHorizontalPosition.x + predictedHorizontalPosition.width <= world.worldGrid[i][j][0] + world.worldGrid[i][j][2] ?
                                predictedHorizontalPosition.x + predictedHorizontalPosition.width : world.worldGrid[i][j][0] + world.worldGrid[i][j][2];

                            currentIntersection.y = predictedHorizontalPosition.y >= world.worldGrid[i][j][1] ? predictedHorizontalPosition.y : world.worldGrid[i][j][1];

                            currentIntersection.farY = predictedHorizontalPosition.y + predictedHorizontalPosition.height <= world.worldGrid[i][j][1] + world.worldGrid[i][j][3] ?
                                predictedHorizontalPosition.y + predictedHorizontalPosition.height : world.worldGrid[i][j][1] + world.worldGrid[i][j][3];

                            currentIntersection.width = currentIntersection.farX - currentIntersection.x;
                            currentIntersection.height = currentIntersection.farY - currentIntersection.y;
                        };

                        calculateIntersection(currentIntersection);

                        if (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                            currentIntersection.width, currentIntersection.height) && this.currentSpeedX > 0) { // ⇒

                            // console.log('Checking RIGHT');

                            while (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                                currentIntersection.width, currentIntersection.height)
                            ) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x < nextX) {
                                nextX = predictedHorizontalPosition.x;
                            };

                            this.currentSpeedX = 0;
                        };

                        if (this.checkPixelCollisionRightLeftDownUp(currentIntersection.x, currentIntersection.y,
                            currentIntersection.width, currentIntersection.height) && this.currentSpeedX < 0) { // ⇐

                            // console.log('Checking LEFT');

                            while (this.checkPixelCollisionRightLeftDownUp(currentIntersection.x, currentIntersection.y,
                                currentIntersection.width, currentIntersection.height)
                            ) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x > nextX) {
                                nextX = predictedHorizontalPosition.x;
                            };

                            this.currentSpeedX = 0;
                        };
                    };
                };
            };
        };

        this.x = nextX;
    };

    this.applyMovementYOld = function () {
        let nextY = this.y + this.downwardForce;

        if (this.downwardForce !== 0) {

            let predictedVerticalPosition = {
                x: this.x,
                y: nextY,
                width: this.width,
                height: this.height
            };

            for (let i = 0; i < world.worldGrid.length; i++) {
                for (let j = 0; j < world.worldGrid[i].length; j++) {
                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedVerticalPosition.x + predictedVerticalPosition.width, world.worldGrid[i][j][0],
                            predictedVerticalPosition.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                            predictedVerticalPosition.y + predictedVerticalPosition.height, world.worldGrid[i][j][1],
                            predictedVerticalPosition.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                        ) && world.worldGrid[i][j][4] === true
                    ) {

                        let currentIntersection = {};

                        function calculateIntersection(currentIntersection) {
                            currentIntersection.x = predictedVerticalPosition.x >= world.worldGrid[i][j][0] ? predictedVerticalPosition.x : world.worldGrid[i][j][0];

                            currentIntersection.farX = predictedVerticalPosition.x + predictedVerticalPosition.width <= world.worldGrid[i][j][0] + world.worldGrid[i][j][2] ?
                                predictedVerticalPosition.x + predictedVerticalPosition.width : world.worldGrid[i][j][0] + world.worldGrid[i][j][2];

                            currentIntersection.y = predictedVerticalPosition.y >= world.worldGrid[i][j][1] ? predictedVerticalPosition.y : world.worldGrid[i][j][1];

                            currentIntersection.farY = predictedVerticalPosition.y + predictedVerticalPosition.height <= world.worldGrid[i][j][1] + world.worldGrid[i][j][3] ?
                                predictedVerticalPosition.y + predictedVerticalPosition.height : world.worldGrid[i][j][1] + world.worldGrid[i][j][3];

                            currentIntersection.width = currentIntersection.farX - currentIntersection.x;
                            currentIntersection.height = currentIntersection.farY - currentIntersection.y;
                        };

                        calculateIntersection(currentIntersection);
                        
                        if (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                            currentIntersection.width, currentIntersection.height) && this.downwardForce < 0) { // ⇑

                            // console.log('Checking UP');

                            while (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y,
                                currentIntersection.width, currentIntersection.height)
                            ) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y > nextY) {
                                nextY = predictedVerticalPosition.y;
                            };

                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };

                        if (this.checkPixelCollisionLeftRightUpDown(currentIntersection.x, currentIntersection.y,
                            currentIntersection.width, currentIntersection.height) && this.downwardForce > 0) { // ⇓

                            // console.log('Checking DOWN');

                            while (this.checkPixelCollisionLeftRightUpDown(currentIntersection.x, currentIntersection.y,
                                currentIntersection.width, currentIntersection.height)
                            ) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y < nextY) {
                                nextY = predictedVerticalPosition.y;
                            };

                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };
                    };
                };
            };
        };

        this.y = nextY;
    };

    this.findIfCharacterIsJumping = function () { return this.downwardForce < 0 };
    this.isFalling = function () { return this.downwardForce > 0 };
    this.findIfCharacterIsMovingX = function () { return this.currentSpeedX !== 0 };

    this.findLeadingEdgeXOfCharacter = function () {
        if (this.currentSpeedX < 0) { return this.leadingEdgeX = this.x }
        else { return this.leadingEdgeX = this.x + this.width };
    };

    this.findIfPlayerIsStandingOnAPlatform = function () {
        for (let i = this.x; i <= this.x + width; i++) {
            if (world.findIfPixelIsSolidSurface(i, this.y + this.height + 1)) { return true };
        };

        return false;
    };

    this.defineDirectionX = function () {
        if (this.currentSpeedX > 0) { this.currentDirectionX = 'right' }
        else if (this.currentSpeedX < 0) { this.currentDirectionX = 'left' }
        else { this.currentDirectionX = 'noXdirection' };
    };

    this.defineDirectionY = function () {
        if (this.downwardForce > 0) { this.currentDirectionY = 'down' }
        else if (this.downwardForce < 0) { this.currentDirectionY = 'up' }
        else { this.currentDirectionY = 'noYdirection' };
    };

    this.drawHitbox = function (drawAtX) {
        ctx.strokeStyle = 'rgb(234, 0, 255)';
        ctx.lineWidth = 1;
        ctx.strokeRect(drawAtX, this.y, this.width, this.height);

        // ctx.strokeStyle = 'blue';
        // ctx.strokeRect(drawAtX + 4, this.y, this.width, this.height);
        // ctx.strokeRect(drawAtX - 4, this.y, this.width, this.height);
        // ctx.strokeRect(drawAtX, this.y + 5, this.width, this.height);
        // ctx.strokeRect(drawAtX, this.y - 5, this.width, this.height);
    };

    this.defineDirectionXForDrawing = function () {
        if (this.currentSpeedX > 0) { this.currentDirectionXForDrawing = 'right' }
        else if (this.currentSpeedX < 0) { this.currentDirectionXForDrawing = 'left' };
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

        if (this.currentDirectionXForDrawing === 'right') { sprite = this.runningSpriteRight }
        else if (this.currentDirectionXForDrawing === 'left') { sprite = this.runningSpriteLeft };

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

    this.checkPixelCollisionDownUpLeftRight = function (x, y, width, height) {
        for (let i = x; i <= x + width; i++) {
            for (let j = y + height; j >= y; j--) {
                if (world.findIfPixelIsSolidSurface(i, j)) {
                    return { x: i, y: j };
                };
            };
        };

        return null;
    };

    this.checkPixelCollisionDownUpRightLeft = function (x, y, width, height) {
        for (let i = x + width; i >= x; i--) {
            for (let j = y + height; j >= y; j--) {
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
    };

    this.checkPixelCollisionRightLeftDownUp = function (x, y, width, height) {
        for (let i = y + height; i >= y; i--) {
            for (let j = x + width; j >= x; j--) {
                if (world.findIfPixelIsSolidSurface(j, i)) {
                    return { x: j, y: i };
                };
            };
        };

        return null;
    }
};