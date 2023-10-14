function Character(x, y, width, height, maxJumpHeight, runningSpriteRight, runningSpriteLeft) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentSpeedX = 0;
    this.currentDirectionXForDrawing = 'right';
    this.currentDirectionX = 'right'; // is not used at this point
    this.currentDirectionY = 'down'; // is not used at this point
    this.downwardForce = 0;
    this.currentJumpHeight = 0;
    this.maxJumpHeight = maxJumpHeight;
    this.runningSpriteRight = runningSpriteRight;
    this.runningSpriteLeft = runningSpriteLeft;
    this.leadingEdgeX = 0;
    this.trailingEdgeX = 0;

    this.prepareCharacterData = function () {
        this.defineDirectionXForDrawing();

        this.applyGravity();
        this.applyMovementX();
        this.applyMovementY();

        // this.applyGravity();
        // this.applyMovementXOld4();
        // this.applyMovementYOld4();

        // this.applyGravity();
        // this.applyMovementXOld3();
        // this.applyMovementYOld3();

        // this.applyGravity();
        // this.defineDirectionX();
        // this.defineDirectionY();
        // this.applyMovementOld2();

        // this.defineDirectionX();
        // this.defineDirectionY();
        // this.applyGravityOld1();
        // this.applyMovementOld1();
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

    this.applyMovementX = function () { // the third non-bugged version with separating X-movement and Y-movement, intersection and sets, the best optimization at this point
        let nextX = this.x + this.currentSpeedX;

        if (this.currentSpeedX !== 0) { // if we have any X-movement

            let predictedHorizontalPosition = {
                x: nextX,
                y: this.y,
                width: this.width,
                height: this.height
            };

            // iterate through every cell
            for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedHorizontalPosition.x + predictedHorizontalPosition.width, world.worldGrid[i][j][0],
                            predictedHorizontalPosition.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                            predictedHorizontalPosition.y + predictedHorizontalPosition.height, world.worldGrid[i][j][1],
                            predictedHorizontalPosition.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                        ) && world.worldGrid[i][j][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                    ) {

                        let currentIntersection = {}; // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                        function calculateIntersection(currentIntersection) { // function to calculate data about the intersection
                            currentIntersection.x = predictedHorizontalPosition.x >= world.worldGrid[i][j][0] ? predictedHorizontalPosition.x : world.worldGrid[i][j][0]; // X-coordinate

                            currentIntersection.farX = predictedHorizontalPosition.x + predictedHorizontalPosition.width <= world.worldGrid[i][j][0] + world.worldGrid[i][j][2] ?
                                predictedHorizontalPosition.x + predictedHorizontalPosition.width : world.worldGrid[i][j][0] + world.worldGrid[i][j][2]; // far X-coordinate

                            currentIntersection.y = predictedHorizontalPosition.y >= world.worldGrid[i][j][1] ? predictedHorizontalPosition.y : world.worldGrid[i][j][1]; // Y-coordinate

                            currentIntersection.farY = predictedHorizontalPosition.y + predictedHorizontalPosition.height <= world.worldGrid[i][j][1] + world.worldGrid[i][j][3] ?
                                predictedHorizontalPosition.y + predictedHorizontalPosition.height : world.worldGrid[i][j][1] + world.worldGrid[i][j][3]; // far Y-coordinate

                            currentIntersection.width = currentIntersection.farX - currentIntersection.x; // width
                            currentIntersection.height = currentIntersection.farY - currentIntersection.y; // height
                        };

                        calculateIntersection(currentIntersection); // calculating the data about the intersection

                        function checkPixelCollisionBetweenCurrentIntersectionAndGridCell() { // function to check if any pixel inside the intersection is a solid one
                            for (let k = currentIntersection.x; k <= currentIntersection.x + currentIntersection.width; k++) { // iterate through X-Axis from left to right
                                for (let l = currentIntersection.y; l <= currentIntersection.y + currentIntersection.height; l++) { // iterate through Y-Axis from top to bottom
                                    for (let value of world.worldGrid[i][j][5]) { // iterate through every solid pixel in the cell
                                        if (value.x === k && value.y === l) { return true }; // check if a pixel in the intersection is a solid one
                                    };
                                };
                            };

                            return false;
                        };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.currentSpeedX > 0) { // ⇒
                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x < nextX) { nextX = predictedHorizontalPosition.x };
                            this.currentSpeedX = 0;
                        };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.currentSpeedX < 0) { // ⇐
                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x > nextX) { nextX = predictedHorizontalPosition.x };
                            this.currentSpeedX = 0;
                        };
                    };
                };
            };
        };

        this.x = nextX;
    };

    this.applyMovementY = function () { // the third non-bugged version with separating X-movement and Y-movement, intersection and sets, the best optimization at this point
        let nextY = this.y + this.downwardForce;

        if (this.downwardForce !== 0) { // if we have any Y-movement

            let predictedVerticalPosition = {
                x: this.x,
                y: nextY,
                width: this.width,
                height: this.height
            };

            // iterate through every cell
            for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                for (let j = 0; j < world.worldGrid[i].length; j++) {// x - iterate through every column
                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedVerticalPosition.x + predictedVerticalPosition.width, world.worldGrid[i][j][0],
                            predictedVerticalPosition.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                            predictedVerticalPosition.y + predictedVerticalPosition.height, world.worldGrid[i][j][1],
                            predictedVerticalPosition.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                        ) && world.worldGrid[i][j][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                    ) {

                        let currentIntersection = {}; // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                        function calculateIntersection(currentIntersection) { // function to calculate data about the intersection
                            currentIntersection.x = predictedVerticalPosition.x >= world.worldGrid[i][j][0] ? predictedVerticalPosition.x : world.worldGrid[i][j][0]; // X-coordinate

                            currentIntersection.farX = predictedVerticalPosition.x + predictedVerticalPosition.width <= world.worldGrid[i][j][0] + world.worldGrid[i][j][2] ?
                                predictedVerticalPosition.x + predictedVerticalPosition.width : world.worldGrid[i][j][0] + world.worldGrid[i][j][2]; // far X-coordinate

                            currentIntersection.y = predictedVerticalPosition.y >= world.worldGrid[i][j][1] ? predictedVerticalPosition.y : world.worldGrid[i][j][1]; // Y-coordinate

                            currentIntersection.farY = predictedVerticalPosition.y + predictedVerticalPosition.height <= world.worldGrid[i][j][1] + world.worldGrid[i][j][3] ?
                                predictedVerticalPosition.y + predictedVerticalPosition.height : world.worldGrid[i][j][1] + world.worldGrid[i][j][3]; // far Y-coordinate

                            currentIntersection.width = currentIntersection.farX - currentIntersection.x; // width
                            currentIntersection.height = currentIntersection.farY - currentIntersection.y; // height
                        };

                        calculateIntersection(currentIntersection); // calculating the data about the intersection

                        function checkPixelCollisionBetweenCurrentIntersectionAndGridCell() { // function to check if any pixel inside the intersection is a solid one
                            for (let k = currentIntersection.x; k <= currentIntersection.x + currentIntersection.width; k++) { // iterate through X-Axis from left to right
                                for (let l = currentIntersection.y; l <= currentIntersection.y + currentIntersection.height; l++) { // iterate through Y-Axis from top to bottom
                                    for (let value of world.worldGrid[i][j][5]) { // iterate through every solid pixel in the cell
                                        if (value.x === k && value.y === l) { return true }; // check if a pixel in the intersection is a solid one
                                    };
                                };
                            };

                            return false;
                        };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.downwardForce < 0) { // ⇑
                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y > nextY) { nextY = predictedVerticalPosition.y };
                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };

                        if (checkPixelCollisionBetweenCurrentIntersectionAndGridCell() && this.downwardForce > 0) { // ⇓
                            while (checkPixelCollisionBetweenCurrentIntersectionAndGridCell()) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y < nextY) { nextY = predictedVerticalPosition.y };
                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };
                    };
                };
            };
        };

        this.y = nextY;
    };

    /*--------------------------*/

    this.applyMovementXOld4 = function () { // the second non-bugged version with separating X-movement and Y-movement and intersection but without sets, slightly better optimization
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

                        if (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height) && this.currentSpeedX > 0) { // ⇒
                            while (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height)) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x < nextX) { nextX = predictedHorizontalPosition.x };
                            this.currentSpeedX = 0;
                        };

                        if (this.checkPixelCollisionRightLeftDownUp(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height) && this.currentSpeedX < 0) { // ⇐
                            while (this.checkPixelCollisionRightLeftDownUp(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height)) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedHorizontalPosition.x > nextX) { nextX = predictedHorizontalPosition.x };
                            this.currentSpeedX = 0;
                        };
                    };
                };
            };
        };

        this.x = nextX;
    };

    this.applyMovementYOld4 = function () { // the second non-bugged version with separating X-movement and Y-movement and intersection but without sets, slightly better optimization
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

                        if (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height) && this.downwardForce < 0) { // ⇑
                            while (this.checkPixelCollisionLeftRightDownUp(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height)) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y > nextY) { nextY = predictedVerticalPosition.y };
                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };

                        if (this.checkPixelCollisionLeftRightUpDown(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height) && this.downwardForce > 0) { // ⇓
                            while (this.checkPixelCollisionLeftRightUpDown(currentIntersection.x, currentIntersection.y, currentIntersection.width, currentIntersection.height)) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                calculateIntersection(currentIntersection);
                            };

                            if (predictedVerticalPosition.y < nextY) { nextY = predictedVerticalPosition.y };
                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };
                    };
                };
            };
        };

        this.y = nextY;
    };
    
    /*--------------------------*/

    this.applyMovementXOld3 = function () { // the first non-bugged version with separating X-movement and Y-movement but without sets and intersection, not the best optimization
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

                        if (this.checkPixelCollisionLeftRightDownUp(predictedHorizontalPosition.x, predictedHorizontalPosition.y, predictedHorizontalPosition.width, predictedHorizontalPosition.height) && this.currentSpeedX > 0) { // ⇒
                            while (this.checkPixelCollisionLeftRightDownUp(predictedHorizontalPosition.x, predictedHorizontalPosition.y, predictedHorizontalPosition.width, predictedHorizontalPosition.height)) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                            };

                            nextX = predictedHorizontalPosition.x;
                            this.currentSpeedX = 0;
                        };

                        if (this.checkPixelCollisionRightLeftDownUp(predictedHorizontalPosition.x, predictedHorizontalPosition.y, predictedHorizontalPosition.width, predictedHorizontalPosition.height) && this.currentSpeedX < 0) { // ⇐
                            while (this.checkPixelCollisionRightLeftDownUp(predictedHorizontalPosition.x, predictedHorizontalPosition.y, predictedHorizontalPosition.width, predictedHorizontalPosition.height)) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                            };

                            nextX = predictedHorizontalPosition.x;
                            this.currentSpeedX = 0;
                        };

                        this.x = nextX;
                        return;
                    };
                };
            };
        };

        this.x = nextX;
    };

    this.applyMovementYOld3 = function () { // the first non-bugged version with separating X-movement and Y-movement but without sets and intersection, not the best optimization
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

                        if (this.checkPixelCollisionLeftRightDownUp(predictedVerticalPosition.x, predictedVerticalPosition.y, predictedVerticalPosition.width, predictedVerticalPosition.height) && this.downwardForce < 0) { // ⇑
                            while (this.checkPixelCollisionLeftRightDownUp(predictedVerticalPosition.x, predictedVerticalPosition.y, predictedVerticalPosition.width, predictedVerticalPosition.height)) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                            };

                            nextY = predictedVerticalPosition.y;
                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };

                        if (this.checkPixelCollisionLeftRightUpDown(predictedVerticalPosition.x, predictedVerticalPosition.y, predictedVerticalPosition.width, predictedVerticalPosition.height) && this.downwardForce > 0) { // ⇓
                            while (this.checkPixelCollisionLeftRightUpDown(predictedVerticalPosition.x, predictedVerticalPosition.y, predictedVerticalPosition.width, predictedVerticalPosition.height)) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                            };

                            nextY = predictedVerticalPosition.y;
                            this.downwardForce = 0;
                            this.currentJumpHeight = 0;
                        };

                        this.y = nextY;
                        return;
                    };
                };
            };
        };

        this.y = nextY;
    };

    /*--------------------------*/

    this.applyMovementOld2 = function () { // the second unfinished bugged version without sets, intersection and separating X-movement and Y-movement
        let nextX = this.x + this.currentSpeedX;
        let nextY = this.y + this.downwardForce;

        /*------------------------------------------------------*/

        if (this.currentDirectionX === 'right' && this.currentDirectionY === 'noYdirection') { // ⇒
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionUpDownLeftRight(nextX, this.y, this.width, this.height - 1)) {
                nextX = solidDot.x - this.width;
                this.currentSpeedX = 0;
            };
        };

        if (this.currentDirectionX === 'left' && this.currentDirectionY === 'noYdirection') { // ⇐
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionUpDownRightLeft(nextX, this.y, this.width, this.height - 1)) {
                nextX = solidDot.x;
                this.currentSpeedX = 0;
            };
        };

        if (this.currentDirectionX === 'right' && this.currentDirectionY === 'up') { // ⇗
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionDownUpLeftRight(nextX, nextY, this.width, this.height)) {
                // nextX = solidDot.x - this.width;
                // nextY = solidDot.y;
                nextX = this.x;
                nextY = this.y;

                this.currentSpeedX = 0;
                this.downwardForce = world.gravity;
                this.currentJumpHeight = 0;
            };
        };

        if (this.currentDirectionX === 'left' && this.currentDirectionY === 'up') { // ⇖
            let solidDot = null;

            console.log('HERE');

            if (solidDot = this.checkPixelCollisionDownUpRightLeft(nextX, nextY, this.width, this.height)) {
                // nextX = solidDot.x;
                // nextY = solidDot.y;
                nextX = this.x;
                nextY = this.y;

                this.currentSpeedX = 0;
                this.downwardForce = world.gravity;
                this.currentJumpHeight = 0;
            };
        };

        if (this.currentDirectionX === 'noXdirection' && this.currentDirectionY === 'up') { // ⇑
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionLeftRightDownUp(this.x, nextY, this.width, this.height)) {
                nextY = solidDot.y;
                this.currentSpeedX = 0;
                this.downwardForce = world.gravity;
                this.currentJumpHeight = 0;
            };
        };

        if (this.currentDirectionX === 'right' && this.currentDirectionY === 'down') { // ⇘
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionUpDownLeftRight(nextX, nextY, this.width, this.height)) {
                // nextX = solidDot.x - this.width;
                // nextY = solidDot.y - this.height;
                nextX = this.x;
                nextY = solidDot.y - this.height;

                this.currentSpeedX = 0;
                this.downwardForce = 0;
            };
        };

        if (this.currentDirectionX === 'left' && this.currentDirectionY === 'down') { // ⇙
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionUpDownRightLeft(nextX, nextY, this.width, this.height)) {
                // nextX = solidDot.x;
                // nextY = solidDot.y - this.height;
                nextX = solidDot.x;
                nextY = solidDot.y - this.height;

                this.currentSpeedX = 0;
                this.downwardForce = 0;
            };
        };

        if (this.currentDirectionX === 'noXdirection' && this.currentDirectionY === 'down') { // ⇓
            let solidDot = null;

            if (solidDot = this.checkPixelCollisionLeftRightUpDown(this.x, nextY, this.width, this.height)) {
                nextY = solidDot.y - this.height;
                this.currentSpeedX = 0;
                this.downwardForce = 0;
            };
        };

        /*------------------------------------------------------*/

        // if (this.findIfCharacterIsJumping()) {
        //     let solidDot = null;

        //     if (solidDot = this.checkPixelCollisionLeftRightDownUp(nextX, nextY, this.width, this.height)) {
        //         this.downwardForce = world.gravity;
        //         this.currentJumpHeight = 0;
        //         nextY = this.y;
        //     };
        // };

        this.x = nextX;
        this.y = nextY;
    };

    /*--------------------------*/

    this.applyGravityOld1 = function () { // gravity for the first unfinished bugged version
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

    this.applyMovementOld1 = function () { // the first unfinished bugged version with old gravity and without sets, intersection and separating X-movement and Y-movement
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

    /*--------------------------*/

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

    this.defineDirectionX = function () { // is not used at this point
        if (this.currentSpeedX > 0) { this.currentDirectionX = 'right' }
        else if (this.currentSpeedX < 0) { this.currentDirectionX = 'left' }
        else { this.currentDirectionX = 'noXdirection' };
    };

    this.defineDirectionY = function () { // is not used at this point
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
            // this.drawHitbox(drawAtX);

            if (this.findIfCharacterIsJumping() || this.isFalling()) {
                sprite.drawFrame(4, drawAtX, this.y, this.width, this.height);
            } else if (this.findIfCharacterIsMovingX()) {
                sprite.drawAnimation(game.ticks, drawAtX, this.y, this.width, this.height);
            } else {
                sprite.drawFrame(1, drawAtX, this.y, this.width, this.height);
            };
        };
    };

    this.collidesWith = function (other) { // is not used at this point
        if (this.x >= other.x &&
            this.x <= other.x + other.width &&
            this.y >= other.y &&
            this.y <= other.y + other.height) {
            return true;
        };

        return false;
    };

    this.checkPixelCollisionUpDownLeftRight = function (x, y, width, height) { // is not used at this point
        for (let i = x; i <= x + width; i++) {
            for (let j = y; j <= y + height; j++) {
                if (world.findIfPixelIsSolidSurface(i, j)) {
                    return { x: i, y: j };
                };
            };
        };

        return null;
    };

    this.checkPixelCollisionUpDownRightLeft = function (x, y, width, height) { // is not used at this point
        for (let i = x + width; i >= x; i--) {
            for (let j = y; j <= y + height; j++) {
                if (world.findIfPixelIsSolidSurface(i, j)) {
                    return { x: i, y: j };
                };
            };
        };

        return null;
    };

    this.checkPixelCollisionDownUpLeftRight = function (x, y, width, height) { // is not used at this point
        for (let i = x; i <= x + width; i++) {
            for (let j = y + height; j >= y; j--) {
                if (world.findIfPixelIsSolidSurface(i, j)) {
                    return { x: i, y: j };
                };
            };
        };

        return null;
    };

    this.checkPixelCollisionDownUpRightLeft = function (x, y, width, height) { // is not used at this point
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