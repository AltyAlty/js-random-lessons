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
        // this.applyMovementXOld9();
        // this.applyMovementYOld9();

        // this.applyGravity();
        // this.applyMovementXOld8();
        // this.applyMovementYOld8();

        // this.applyGravity();
        // this.applyMovementXOld7();
        // this.applyMovementYOld7();

        // this.applyGravity();
        // this.applyMovementXOld6();
        // this.applyMovementYOld6();

        // this.applyGravity();
        // this.applyMovementXOld5();
        // this.applyMovementYOld5();

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

    this.calculateIntersection = function (predictedPosition, worldGridCell) { // function to calculate data about an intersection
        const currentIntersection = {};

        currentIntersection.x = predictedPosition.x >= worldGridCell[0] ? predictedPosition.x : worldGridCell[0]; // X-coordinate

        currentIntersection.farX = predictedPosition.x + predictedPosition.width <= worldGridCell[0] + worldGridCell[2] ?
            predictedPosition.x + predictedPosition.width : worldGridCell[0] + worldGridCell[2]; // far X-coordinate

        currentIntersection.y = predictedPosition.y >= worldGridCell[1] ? predictedPosition.y : worldGridCell[1]; // Y-coordinate

        currentIntersection.farY = predictedPosition.y + predictedPosition.height <= worldGridCell[1] + worldGridCell[3] ?
            predictedPosition.y + predictedPosition.height : worldGridCell[1] + worldGridCell[3]; // far Y-coordinate

        currentIntersection.width = currentIntersection.farX - currentIntersection.x; // width
        currentIntersection.height = currentIntersection.farY - currentIntersection.y; // height

        return currentIntersection;
    };

    this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell = function (currentIntersection, worldGridCell) { // function to check if any pixel inside an intersection is a solid one
        const pixelCount = (currentIntersection.width + 1) * (currentIntersection.height + 1);

        for (let i = 0; i < pixelCount; i++) { // iterate through every pixel
            const x = currentIntersection.x + i % (currentIntersection.width + 1);
            const y = currentIntersection.y + Math.floor(i / (currentIntersection.width + 1));

            for (let cellSolidPixel of worldGridCell[5]) { // iterate through every solid pixel in the cell
                if (cellSolidPixel.x === x && cellSolidPixel.y === y) { return true }; // check if a pixel in the intersection is a solid one
            };
        };

        return false;
    };

    this.checkPixelCollisionBetweenCurrentIntersectionAndGridCellOld1 = function (currentIntersection, worldGridCell) { // function to check if any pixel inside an intersection is a solid one
        for (let k = currentIntersection.x; k <= currentIntersection.x + currentIntersection.width; k++) { // iterate through X-Axis from left to right
            for (let l = currentIntersection.y; l <= currentIntersection.y + currentIntersection.height; l++) { // iterate through Y-Axis from top to bottom
                for (let value of worldGridCell[5]) { // iterate through every solid pixel in the cell
                    if (value.x === k && value.y === l) { return true }; // check if a pixel in the intersection is a solid one
                };
            };
        };

        return false;
    };

    this.prepareDataForTheCellsWeCollideWith = function (position) {
        let firstRowID = Math.trunc(position.y / world.worldGridCellSize);
        let firstColumnID = Math.trunc(position.x / world.worldGridCellSize);
        let lastRowID;
        let lastColumnID;
        const rowsIDs = [];
        const columnsIDs = [];

        if ((position.y + position.height) % world.worldGridCellSize === 0) {
            lastRowID = ((position.y + position.height) / world.worldGridCellSize) - 1;
        } else {
            lastRowID = Math.trunc((position.y + position.height) / world.worldGridCellSize);
        };

        if ((position.x + position.width) % world.worldGridCellSize === 0) {
            lastColumnID = ((position.x + position.width) / world.worldGridCellSize) - 1;
        } else {
            lastColumnID = Math.trunc((position.x + position.width) / world.worldGridCellSize);
        };

        for (let i = firstRowID; i <= lastRowID; i++) { rowsIDs.push(i) };
        for (let i = firstColumnID; i <= lastColumnID; i++) { columnsIDs.push(i) };

        return {
            rowsIDs: rowsIDs,
            columnsIDs: columnsIDs
        };
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

    this.applyMovementX = function () { // the eights non-bugged version, now it checks only the cells we collide with, stable 55-58 fps?
        let nextX = this.x + this.currentSpeedX; // raw prediction of our next X-coordinate
        let isPredictedPositionChanged = false; // if our raw prediction has changed or not

        if (this.currentSpeedX !== 0) { // if we have any X-movement
            if (Math.abs(this.currentSpeedX) > this.width) { // in order to prevent from teleportation through objects we check if our speed is greater than our width
                let predictedHorizontalWayToTheRight = null; // variable for our predicted way to the right
                let predictedHorizontalWayToTheLeft = null; // variable for our predicted way to the left

                if (this.currentSpeedX > 0) { // if we move to the right we prepare data about the way we are going to make
                    predictedHorizontalWayToTheRight = {
                        x: this.x + this.width,
                        y: this.y,
                        width: this.currentSpeedX - this.width,
                        height: this.height
                    };
                };

                if (this.currentSpeedX < 0) { // if we move to the left we prepare data about the way we are going to make
                    predictedHorizontalWayToTheLeft = {
                        x: this.x - Math.abs(this.currentSpeedX) + this.width,
                        y: this.y,
                        width: Math.abs(this.currentSpeedX) - this.width,
                        height: this.height
                    };
                };

                const possibleSafeXArray = []; // an array for all X-coordinates when we ever change our predicted way

                if (predictedHorizontalWayToTheRight) { // if we move to the right
                    // prepare data for the cells we collide with in order to ignore checking every cell
                    const { rowsIDs, columnsIDs } = this.prepareDataForTheCellsWeCollideWith(predictedHorizontalWayToTheRight);

                    // iterate through every cell we collide with
                    for (let i = rowsIDs[0]; i < rowsIDs[0] + rowsIDs.length; i++) {
                        for (let j = columnsIDs[0]; j < columnsIDs[0] + columnsIDs.length; j++) {
                            if (world.worldGrid[i][j][4] === true) {// check if the cell contains any solid pixels
                                let temporaryPredictedHorizontalWayToTheRight = { ...predictedHorizontalWayToTheRight }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX > 0) { // ⇒
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayToTheRight.x -= Math.sign(this.currentSpeedX);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[i][j]);
                                    };

                                    possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheRight.x + temporaryPredictedHorizontalWayToTheRight.width - this.width); // add X-coordinate of the changed predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeXArray.length !== 0) { // if we have changed our predicted way, then we find the safest X position
                        nextX = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionChanged = true;
                    };

                } else if (predictedHorizontalWayToTheLeft) { // if we move to the left
                    // prepare data for the cells we collide with in order to ignore checking every cell
                    const { rowsIDs, columnsIDs } = this.prepareDataForTheCellsWeCollideWith(predictedHorizontalWayToTheLeft);

                    // iterate through every cell we collide with
                    for (let i = rowsIDs[0]; i < rowsIDs[0] + rowsIDs.length; i++) {
                        for (let j = columnsIDs[0]; j < columnsIDs[0] + columnsIDs.length; j++) {
                            if (world.worldGrid[i][j][4] === true) {// check if the cell contains any solid pixels
                                let temporaryPredictedHorizontalWayToTheLeft = { ...predictedHorizontalWayToTheLeft }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX < 0) { // ⇐
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayToTheLeft.x -= Math.sign(this.currentSpeedX);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[i][j]);
                                    };

                                    possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheLeft.x); // add X-coordinate of the changed predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeXArray.length !== 0) { // if we have changed our predicted way, then we find the safest X position
                        nextX = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionChanged = true;
                    };
                };
            };

            if (!isPredictedPositionChanged) { // if we have not changed our raw predicted position yet
                const predictedHorizontalPosition = { // predict our position
                    x: nextX,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };

                // prepare data for the cells we collide with in order to ignore checking every cell
                const { rowsIDs, columnsIDs } = this.prepareDataForTheCellsWeCollideWith(predictedHorizontalPosition);

                // iterate through every cell we collide with
                for (let i = rowsIDs[0]; i < rowsIDs[0] + rowsIDs.length; i++) {
                    for (let j = columnsIDs[0]; j < columnsIDs[0] + columnsIDs.length; j++) {
                        if (world.worldGrid[i][j][4] === true) { // check if if the cell contains any solid pixels
                            let currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]);
                                };

                                nextX = predictedHorizontalPosition.x;
                                isPredictedPositionChanged = true;
                            };
                        };
                    };
                };
            };
        };

        if (isPredictedPositionChanged) { this.currentSpeedX = 0 }; // if we have changed our raw predicted position, it means that we hit a solid object, so we need to stop
        this.x = nextX;
    };

    this.applyMovementY = function () { // the eights non-bugged version, now it checks only the cells we collide with, stable 55-58 fps?
        let nextY = this.y + this.downwardForce; // raw prediction of our next Y-coordinate
        let isPredictedPositionChanged = false; // if our raw prediction has changed or not

        if (this.downwardForce !== 0) { // if we have any Y-movement         
            if (Math.abs(this.downwardForce) > this.height) { // in order to prevent from teleportation through objects we check if our speed is greater than our height
                let predictedVerticalWayDown = null; // variable for our predicted way down
                let predictedVerticalWayUp = null; // variable for our predicted way up

                if (this.downwardForce > 0) { // if we move down we prepare data about the way we are going to make
                    predictedVerticalWayDown = {
                        x: this.x,
                        y: this.y + this.height,
                        width: this.width,
                        height: this.downwardForce - this.height
                    };
                };

                if (this.downwardForce < 0) { // if we move up we prepare data about the way we are going to make
                    predictedVerticalWayUp = {
                        x: this.x,
                        y: this.y - Math.abs(this.downwardForce) + this.height,
                        width: this.width,
                        height: Math.abs(this.downwardForce) - this.height
                    };
                };

                let possibleSafeYArray = []; // an array for all Y-coordinates when we ever change our predicted way

                if (predictedVerticalWayDown) { // if we move down
                    // prepare data for the cells we collide with in order to ignore checking every cell
                    const { rowsIDs, columnsIDs } = this.prepareDataForTheCellsWeCollideWith(predictedVerticalWayDown);

                    // iterate through every cell we collide with
                    for (let i = rowsIDs[0]; i < rowsIDs[0] + rowsIDs.length; i++) {
                        for (let j = columnsIDs[0]; j < columnsIDs[0] + columnsIDs.length; j++) {
                            if (world.worldGrid.length !== 0 && world.worldGrid[i][j][4] === true) {// check if the cell contains any solid pixels
                                let temporaryPredictedHorizontalWayDown = { ...predictedVerticalWayDown }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce > 0) { // ⇓
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayDown.y -= Math.sign(this.downwardForce);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[i][j]);
                                    };

                                    possibleSafeYArray.push(temporaryPredictedHorizontalWayDown.y + temporaryPredictedHorizontalWayDown.height - this.height); // add Y-coordinate of the changed predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have changed our predicted way, then we find the safest Y-position
                        nextY = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionChanged = true;
                    };

                } else if (predictedVerticalWayUp) { // if we move up
                    // prepare data for the cells we collide with in order to ignore checking every cell
                    const { rowsIDs, columnsIDs } = this.prepareDataForTheCellsWeCollideWith(predictedVerticalWayUp);

                    // iterate through every cell we collide with
                    for (let i = rowsIDs[0]; i < rowsIDs[0] + rowsIDs.length; i++) {
                        for (let j = columnsIDs[0]; j < columnsIDs[0] + columnsIDs.length; j++) {
                            if (world.worldGrid.length !== 0 && world.worldGrid[i][j][4] === true) {// check if the cell contains any solid pixels
                                let temporaryPredictedHorizontalWayUp = { ...predictedVerticalWayUp }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce < 0) { // ⇑
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayUp.y -= Math.sign(this.downwardForce);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[i][j]);
                                    };

                                    possibleSafeYArray.push(temporaryPredictedHorizontalWayUp.y); // add Y-coordinate of the changed predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have changed our predicted way, then we find the safest Y-position
                        nextY = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionChanged = true;
                    };
                };
            };

            if (!isPredictedPositionChanged) { // if we have not changed our raw predicted position yet
                const predictedVerticalPosition = { // predict our position
                    x: this.x,
                    y: nextY,
                    width: this.width,
                    height: this.height
                };

                // prepare data for the cells we collide with in order to ignore checking every cell
                const { rowsIDs, columnsIDs } = this.prepareDataForTheCellsWeCollideWith(predictedVerticalPosition);

                // iterate through every cell we collide with
                for (let i = rowsIDs[0]; i < rowsIDs[0] + rowsIDs.length; i++) {
                    for (let j = columnsIDs[0]; j < columnsIDs[0] + columnsIDs.length; j++) {
                        if (world.worldGrid.length !== 0 && world.worldGrid[i][j][4] === true) { // check if if the cell contains any solid pixels
                            let currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]);
                                };

                                nextY = predictedVerticalPosition.y;
                                isPredictedPositionChanged = true;
                            };
                        };
                    };
                };
            };
        };

        if (isPredictedPositionChanged) { // if we have changed our raw predicted position, it means that we hit a solid object, so we need to stop
            this.downwardForce = 0;
            this.currentJumpHeight = 0;
        };

        this.y = nextY;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    this.applyMovementXOld9 = function () { // the seventh non-bugged version, it has a little bit more fps because of refactoring if-statements in processing low speed movement
        let nextX = this.x + this.currentSpeedX; // raw prediction of our next X-coordinate
        let isPredictedPositionChanged = false; // if our raw prediction has changed or not

        if (this.currentSpeedX !== 0) { // if we have any X-movement
            if (Math.abs(this.currentSpeedX) > this.width) { // in order to prevent from teleportation through objects we check if our speed is greater than our width
                let predictedHorizontalWayToTheRight = null; // variable for our predicted way to the right
                let predictedHorizontalWayToTheLeft = null; // variable for our predicted way to the left

                if (this.currentSpeedX > 0) { // if we move to the right we prepare data about the way we are going to make
                    predictedHorizontalWayToTheRight = {
                        x: this.x + this.width,
                        y: this.y,
                        width: this.currentSpeedX - this.width,
                        height: this.height
                    };
                };

                if (this.currentSpeedX < 0) { // if we move to the left we prepare data about the way we are going to make
                    predictedHorizontalWayToTheLeft = {
                        x: this.x - Math.abs(this.currentSpeedX) + this.width,
                        y: this.y,
                        width: Math.abs(this.currentSpeedX) - this.width,
                        height: this.height
                    };
                };

                const possibleSafeXArray = []; // an array for all X-coordinates when we ever change our predicted way

                if (predictedHorizontalWayToTheRight) { // if we move to the right
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedHorizontalWayToTheRight.x + predictedHorizontalWayToTheRight.width, world.worldGrid[row][col][0],
                                predictedHorizontalWayToTheRight.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedHorizontalWayToTheRight.y + predictedHorizontalWayToTheRight.height, world.worldGrid[row][col][1],
                                predictedHorizontalWayToTheRight.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayToTheRight = { ...predictedHorizontalWayToTheRight }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.currentSpeedX > 0) { // ⇒
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayToTheRight.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[row][col]);
                                };

                                possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheRight.x + temporaryPredictedHorizontalWayToTheRight.width - this.width); // add X-coordinate of the changed predicted way
                            };
                        };
                    };

                    if (possibleSafeXArray.length !== 0) { // if we have changed our predicted way, then we find the safest X position
                        nextX = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionChanged = true;
                    };

                } else if (predictedHorizontalWayToTheLeft) { // if we move to the left
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedHorizontalWayToTheLeft.x + predictedHorizontalWayToTheLeft.width, world.worldGrid[row][col][0],
                                predictedHorizontalWayToTheLeft.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedHorizontalWayToTheLeft.y + predictedHorizontalWayToTheLeft.height, world.worldGrid[row][col][1],
                                predictedHorizontalWayToTheLeft.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayToTheLeft = { ...predictedHorizontalWayToTheLeft }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.currentSpeedX < 0) { // ⇐
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayToTheLeft.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[row][col]);
                                };

                                possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheLeft.x); // add X-coordinate of the changed predicted way
                            };
                        };

                    };

                    if (possibleSafeXArray.length !== 0) { // if we have changed our predicted way, then we find the safest X position
                        nextX = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionChanged = true;
                    };
                };
            };

            if (!isPredictedPositionChanged) { // if we have not changed our raw predicted position yet
                const predictedHorizontalPosition = { // predict our position
                    x: nextX,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };

                for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                    // calculate current row and column to define current cell
                    const row = i % world.worldGridRows;
                    const col = Math.floor(i / world.worldGridRows);

                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedHorizontalPosition.x + predictedHorizontalPosition.width, world.worldGrid[row][col][0],
                            predictedHorizontalPosition.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                            predictedHorizontalPosition.y + predictedHorizontalPosition.height, world.worldGrid[row][col][1],
                            predictedHorizontalPosition.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                        ) && world.worldGrid[row][col][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                    ) {
                        let currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                        if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                            while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[row][col]);
                            };

                            nextX = predictedHorizontalPosition.x;
                            isPredictedPositionChanged = true;
                        };
                    };
                };
            };
        };

        if (isPredictedPositionChanged) { this.currentSpeedX = 0 }; // if we have changed our raw predicted position, it means that we hit a solid object, so we need to stop
        this.x = nextX;
    };

    this.applyMovementYOld9 = function () { // the seventh non-bugged version, it has a little bit more fps because of refactoring if-statements in processing low speed movement
        let nextY = this.y + this.downwardForce; // raw prediction of our next Y-coordinate
        let isPredictedPositionChanged = false; // if our raw prediction has changed or not

        if (this.downwardForce !== 0) { // if we have any Y-movement         
            if (Math.abs(this.downwardForce) > this.height) { // in order to prevent from teleportation through objects we check if our speed is greater than our height
                let predictedVerticalWayDown = null; // variable for our predicted way down
                let predictedVerticalWayUp = null; // variable for our predicted way up

                if (this.downwardForce > 0) { // if we move down we prepare data about the way we are going to make
                    predictedVerticalWayDown = {
                        x: this.x,
                        y: this.y + this.height,
                        width: this.width,
                        height: this.downwardForce - this.height
                    };
                };

                if (this.downwardForce < 0) { // if we move up we prepare data about the way we are going to make
                    predictedVerticalWayUp = {
                        x: this.x,
                        y: this.y - Math.abs(this.downwardForce) + this.height,
                        width: this.width,
                        height: Math.abs(this.downwardForce) - this.height
                    };
                };

                let possibleSafeYArray = []; // an array for all Y-coordinates when we ever change our predicted way

                if (predictedVerticalWayDown) { // if we move down
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedVerticalWayDown.x + predictedVerticalWayDown.width, world.worldGrid[row][col][0],
                                predictedVerticalWayDown.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedVerticalWayDown.y + predictedVerticalWayDown.height, world.worldGrid[row][col][1],
                                predictedVerticalWayDown.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayDown = { ...predictedVerticalWayDown }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.downwardForce > 0) { // ⇓
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayDown.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[row][col]);
                                };

                                possibleSafeYArray.push(temporaryPredictedHorizontalWayDown.y + temporaryPredictedHorizontalWayDown.height - this.height); // add Y-coordinate of the changed predicted way
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have changed our predicted way, then we find the safest Y-position
                        nextY = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionChanged = true;
                    };

                } else if (predictedVerticalWayUp) { // if we move up
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedVerticalWayUp.x + predictedVerticalWayUp.width, world.worldGrid[row][col][0],
                                predictedVerticalWayUp.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedVerticalWayUp.y + predictedVerticalWayUp.height, world.worldGrid[row][col][1],
                                predictedVerticalWayUp.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayUp = { ...predictedVerticalWayUp }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.downwardForce < 0) { // ⇑
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayUp.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[row][col]);
                                };

                                possibleSafeYArray.push(temporaryPredictedHorizontalWayUp.y); // add Y-coordinate of the changed predicted way
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have changed our predicted way, then we find the safest Y-position
                        nextY = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionChanged = true;
                    };
                };
            };

            if (!isPredictedPositionChanged) { // if we have not changed our raw predicted position yet
                const predictedVerticalPosition = { // predict our position
                    x: this.x,
                    y: nextY,
                    width: this.width,
                    height: this.height
                };

                for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                    // calculate current row and column to define current cell
                    const row = i % world.worldGridRows;
                    const col = Math.floor(i / world.worldGridRows);

                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedVerticalPosition.x + predictedVerticalPosition.width, world.worldGrid[row][col][0],
                            predictedVerticalPosition.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                            predictedVerticalPosition.y + predictedVerticalPosition.height, world.worldGrid[row][col][1],
                            predictedVerticalPosition.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                        ) && world.worldGrid[row][col][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                    ) {
                        let currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                        if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                            while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[row][col]);
                            };

                            nextY = predictedVerticalPosition.y;
                            isPredictedPositionChanged = true;
                        };
                    };
                };
            };
        };

        if (isPredictedPositionChanged) { // if we have changed our raw predicted position, it means that we hit a solid object, so we need to stop
            this.downwardForce = 0;
            this.currentJumpHeight = 0;
        };

        this.y = nextY;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    this.applyMovementXOld8 = function () { // the sixth non-bugged version, it is basically the fifth one, but it uses less "for" cycles
        let nextX = this.x + this.currentSpeedX; // raw prediction of our next X-coordinate
        let isPredictedPositionChanged = false; // if our raw prediction has changed or not

        if (this.currentSpeedX !== 0) { // if we have any X-movement
            if (Math.abs(this.currentSpeedX) > this.width) { // in order to prevent from teleportation through objects we check if our speed is greater than our width
                let predictedHorizontalWayToTheRight = null; // variable for our predicted way to the right
                let predictedHorizontalWayToTheLeft = null; // variable for our predicted way to the left

                if (this.currentSpeedX > 0) { // if we move to the right we prepare data about the way we are going to make
                    predictedHorizontalWayToTheRight = {
                        x: this.x + this.width,
                        y: this.y,
                        width: this.currentSpeedX - this.width,
                        height: this.height
                    };
                };

                if (this.currentSpeedX < 0) { // if we move to the left we prepare data about the way we are going to make
                    predictedHorizontalWayToTheLeft = {
                        x: this.x - Math.abs(this.currentSpeedX) + this.width,
                        y: this.y,
                        width: Math.abs(this.currentSpeedX) - this.width,
                        height: this.height
                    };
                };

                const possibleSafeXArray = []; // an array for all X-coordinates when we ever change our predicted way

                if (predictedHorizontalWayToTheRight) { // if we move to the right
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedHorizontalWayToTheRight.x + predictedHorizontalWayToTheRight.width, world.worldGrid[row][col][0],
                                predictedHorizontalWayToTheRight.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedHorizontalWayToTheRight.y + predictedHorizontalWayToTheRight.height, world.worldGrid[row][col][1],
                                predictedHorizontalWayToTheRight.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayToTheRight = { ...predictedHorizontalWayToTheRight }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.currentSpeedX > 0) { // ⇒
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayToTheRight.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[row][col]);
                                };

                                possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheRight.x + temporaryPredictedHorizontalWayToTheRight.width - this.width); // add X-coordinate of the changed predicted way
                            };
                        };
                    };

                    if (possibleSafeXArray.length !== 0) { // if we have changed our predicted way, then we find the safest X position
                        nextX = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionChanged = true;
                    };

                } else if (predictedHorizontalWayToTheLeft) { // if we move to the left
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedHorizontalWayToTheLeft.x + predictedHorizontalWayToTheLeft.width, world.worldGrid[row][col][0],
                                predictedHorizontalWayToTheLeft.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedHorizontalWayToTheLeft.y + predictedHorizontalWayToTheLeft.height, world.worldGrid[row][col][1],
                                predictedHorizontalWayToTheLeft.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayToTheLeft = { ...predictedHorizontalWayToTheLeft }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.currentSpeedX < 0) { // ⇐
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayToTheLeft.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[row][col]);
                                };

                                possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheLeft.x); // add X-coordinate of the changed predicted way
                            };
                        };

                    };

                    if (possibleSafeXArray.length !== 0) { // if we have changed our predicted way, then we find the safest X position
                        nextX = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionChanged = true;
                    };
                };
            };

            if (!isPredictedPositionChanged) { // if we have not changed our raw predicted position yet
                const predictedHorizontalPosition = { // predict our position
                    x: nextX,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };

                for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                    // calculate current row and column to define current cell
                    const row = i % world.worldGridRows;
                    const col = Math.floor(i / world.worldGridRows);

                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedHorizontalPosition.x + predictedHorizontalPosition.width, world.worldGrid[row][col][0],
                            predictedHorizontalPosition.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                            predictedHorizontalPosition.y + predictedHorizontalPosition.height, world.worldGrid[row][col][1],
                            predictedHorizontalPosition.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                        ) && world.worldGrid[row][col][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                    ) {
                        let currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                        if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.currentSpeedX > 0) { // ⇒
                            while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[row][col]);
                            };

                            nextX = predictedHorizontalPosition.x;
                            isPredictedPositionChanged = true;
                        };

                        if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.currentSpeedX < 0) { // ⇐
                            while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[row][col]);
                            };

                            nextX = predictedHorizontalPosition.x;
                            isPredictedPositionChanged = true;
                        };
                    };
                };
            };
        };

        if (isPredictedPositionChanged) { this.currentSpeedX = 0 }; // if we have changed our raw predicted position, it means that we hit a solid object, so we need to stop
        this.x = nextX;
    };

    this.applyMovementYOld8 = function () { // the sixth non-bugged version, it is basically the fifth one, but it uses less "for" cycles
        let nextY = this.y + this.downwardForce; // raw prediction of our next Y-coordinate
        let isPredictedPositionChanged = false; // if our raw prediction has changed or not

        if (this.downwardForce !== 0) { // if we have any Y-movement         
            if (Math.abs(this.downwardForce) > this.height) { // in order to prevent from teleportation through objects we check if our speed is greater than our height
                let predictedVerticalWayDown = null; // variable for our predicted way down
                let predictedVerticalWayUp = null; // variable for our predicted way up

                if (this.downwardForce > 0) { // if we move down we prepare data about the way we are going to make
                    predictedVerticalWayDown = {
                        x: this.x,
                        y: this.y + this.height,
                        width: this.width,
                        height: this.downwardForce - this.height
                    };
                };

                if (this.downwardForce < 0) { // if we move up we prepare data about the way we are going to make
                    predictedVerticalWayUp = {
                        x: this.x,
                        y: this.y - Math.abs(this.downwardForce) + this.height,
                        width: this.width,
                        height: Math.abs(this.downwardForce) - this.height
                    };
                };

                let possibleSafeYArray = []; // an array for all Y-coordinates when we ever change our predicted way

                if (predictedVerticalWayDown) { // if we move down
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedVerticalWayDown.x + predictedVerticalWayDown.width, world.worldGrid[row][col][0],
                                predictedVerticalWayDown.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedVerticalWayDown.y + predictedVerticalWayDown.height, world.worldGrid[row][col][1],
                                predictedVerticalWayDown.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayDown = { ...predictedVerticalWayDown }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.downwardForce > 0) { // ⇓
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayDown.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[row][col]);
                                };

                                possibleSafeYArray.push(temporaryPredictedHorizontalWayDown.y + temporaryPredictedHorizontalWayDown.height - this.height); // add Y-coordinate of the changed predicted way
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have changed our predicted way, then we find the safest Y-position
                        nextY = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionChanged = true;
                    };

                } else if (predictedVerticalWayUp) { // if we move up
                    for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                        // calculate current row and column to define current cell
                        const row = i % world.worldGridRows;
                        const col = Math.floor(i / world.worldGridRows);

                        if (
                            helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                predictedVerticalWayUp.x + predictedVerticalWayUp.width, world.worldGrid[row][col][0],
                                predictedVerticalWayUp.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                                predictedVerticalWayUp.y + predictedVerticalWayUp.height, world.worldGrid[row][col][1],
                                predictedVerticalWayUp.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                            ) && world.worldGrid[row][col][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                        ) {
                            let temporaryPredictedHorizontalWayUp = { ...predictedVerticalWayUp }; // a copy of our predicted way
                            let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.downwardForce < 0) { // ⇑
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                    temporaryPredictedHorizontalWayUp.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[row][col]);
                                };

                                possibleSafeYArray.push(temporaryPredictedHorizontalWayUp.y); // add Y-coordinate of the changed predicted way
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have changed our predicted way, then we find the safest Y-position
                        nextY = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionChanged = true;
                    };
                };
            };

            if (!isPredictedPositionChanged) { // if we have not changed our raw predicted position yet
                const predictedVerticalPosition = { // predict our position
                    x: this.x,
                    y: nextY,
                    width: this.width,
                    height: this.height
                };

                for (let i = 0; i < world.worldGridCellCount; i++) { // iterate through every cell
                    // calculate current row and column to define current cell
                    const row = i % world.worldGridRows;
                    const col = Math.floor(i / world.worldGridRows);

                    if (
                        helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                            predictedVerticalPosition.x + predictedVerticalPosition.width, world.worldGrid[row][col][0],
                            predictedVerticalPosition.x, world.worldGrid[row][col][0] + world.worldGrid[row][col][2],
                            predictedVerticalPosition.y + predictedVerticalPosition.height, world.worldGrid[row][col][1],
                            predictedVerticalPosition.y, world.worldGrid[row][col][1] + world.worldGrid[row][col][3]
                        ) && world.worldGrid[row][col][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                    ) {
                        let currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[row][col]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                        if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.downwardForce < 0) { // ⇑
                            while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[row][col]);
                            };

                            if (predictedVerticalPosition.y > nextY) { nextY = predictedVerticalPosition.y };
                            isPredictedPositionChanged = true;
                        };

                        if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col]) && this.downwardForce > 0) { // ⇓
                            while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[row][col])) {
                                predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[row][col]);
                            };

                            if (predictedVerticalPosition.y < nextY) { nextY = predictedVerticalPosition.y };
                            isPredictedPositionChanged = true;
                        };
                    };
                };
            };
        };

        if (isPredictedPositionChanged) { // if we have changed our raw predicted position, it means that we hit a solid object, so we need to stop
            this.downwardForce = 0;
            this.currentJumpHeight = 0;
        };

        this.y = nextY;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    this.applyMovementXOld7 = function () { // the fifth even more non-bugged version with separating X-movement and Y-movement, intersection and sets, this version allows movement on speeds greater than the character's width, the optimization depends on the size of the world grid cell and the character's X-speed
        let nextX = this.x + this.currentSpeedX;
        let isPredictedPositionMoved = false;

        if (this.currentSpeedX !== 0) { // if we have any X-movement
            let predictedHorizontalWayToTheRight = null;
            let predictedHorizontalWayToTheLeft = null;

            if (Math.abs(this.currentSpeedX) > this.width) { // in order to prevent from teleportation through objects we check if our speed is greater than our width
                if (this.currentSpeedX > 0) { // if we move to the right we prepare data about the way we are going to make
                    predictedHorizontalWayToTheRight = {
                        x: this.x + this.width,
                        y: this.y,
                        width: this.currentSpeedX - this.width,
                        height: this.height
                    };
                };

                if (this.currentSpeedX < 0) { // if we move to the left we prepare data about the way we are going to make
                    predictedHorizontalWayToTheLeft = {
                        x: this.x - Math.abs(this.currentSpeedX) + this.width,
                        y: this.y,
                        width: Math.abs(this.currentSpeedX) - this.width,
                        height: this.height
                    };
                };

                let possibleSafeXArray = []; // an array for all X when we shift our predicted way

                if (predictedHorizontalWayToTheRight) { // if we move to the right
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedHorizontalWayToTheRight.x + predictedHorizontalWayToTheRight.width, world.worldGrid[i][j][0],
                                    predictedHorizontalWayToTheRight.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedHorizontalWayToTheRight.y + predictedHorizontalWayToTheRight.height, world.worldGrid[i][j][1],
                                    predictedHorizontalWayToTheRight.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                            ) {
                                let temporaryPredictedHorizontalWayToTheRight = { ...predictedHorizontalWayToTheRight }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX > 0) { // ⇒
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayToTheRight.x -= Math.sign(this.currentSpeedX);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheRight, world.worldGrid[i][j]);
                                    };

                                    possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheRight.x + temporaryPredictedHorizontalWayToTheRight.width - this.width); // adding X when we shift our predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeXArray.length !== 0) { // if we have shifted our predicted way, then we find the safest X position
                        nextX = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionMoved = true;
                    };

                } else if (predictedHorizontalWayToTheLeft) { // if we move to the left
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedHorizontalWayToTheLeft.x + predictedHorizontalWayToTheLeft.width, world.worldGrid[i][j][0],
                                    predictedHorizontalWayToTheLeft.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedHorizontalWayToTheLeft.y + predictedHorizontalWayToTheLeft.height, world.worldGrid[i][j][1],
                                    predictedHorizontalWayToTheLeft.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                            ) {
                                let temporaryPredictedHorizontalWayToTheLeft = { ...predictedHorizontalWayToTheLeft }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX < 0) { // ⇐
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayToTheLeft.x -= Math.sign(this.currentSpeedX);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayToTheLeft, world.worldGrid[i][j]);
                                    };

                                    possibleSafeXArray.push(temporaryPredictedHorizontalWayToTheLeft.x); // adding X when we shift our predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeXArray.length !== 0) { // if we have shifted our predicted way, then we find the safest X position
                        nextX = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeXArray);
                        isPredictedPositionMoved = true;
                    };
                };
            };

            if (!isPredictedPositionMoved) { // if we have not corrected our position yet
                let predictedHorizontalPosition = { // predict our position
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

                            let currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX > 0) { // ⇒
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]);
                                };

                                nextX = predictedHorizontalPosition.x;
                                isPredictedPositionMoved = true;
                            };

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX < 0) { // ⇐
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]);
                                };

                                nextX = predictedHorizontalPosition.x;
                                isPredictedPositionMoved = true;
                            };
                        };
                    };
                };
            };
        };

        if (isPredictedPositionMoved) { this.currentSpeedX = 0 }; // if we have corrected our position, it means that we hit a solid object, so we need to stop
        this.x = nextX;
    };

    this.applyMovementYOld7 = function () { // the fifth even more non-bugged version with separating X-movement and Y-movement, intersection and sets, this version allows movement on speeds greater than the character's height, the optimization depends on the size of the world grid cell and the character's Y-speed
        let nextY = this.y + this.downwardForce;
        let isPredictedPositionMoved = false;

        if (this.downwardForce !== 0) { // if we have any Y-movement
            let predictedVerticalWayDown = null;
            let predictedVerticalWayUp = null;

            if (Math.abs(this.downwardForce) > this.height) { // in order to prevent from teleportation through objects we check if our speed is greater than our height
                if (this.downwardForce > 0) { // if we move down we prepare data about the way we are going to make
                    predictedVerticalWayDown = {
                        x: this.x,
                        y: this.y + this.height,
                        width: this.width,
                        height: this.downwardForce - this.height
                    };
                };

                if (this.downwardForce < 0) { // if we move up we prepare data about the way we are going to make
                    predictedVerticalWayUp = {
                        x: this.x,
                        y: this.y - Math.abs(this.downwardForce) + this.height,
                        width: this.width,
                        height: Math.abs(this.downwardForce) - this.height
                    };
                };

                let possibleSafeYArray = []; // an array for all Y when we shift our predicted way

                if (predictedVerticalWayDown) { // if we move down
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedVerticalWayDown.x + predictedVerticalWayDown.width, world.worldGrid[i][j][0],
                                    predictedVerticalWayDown.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedVerticalWayDown.y + predictedVerticalWayDown.height, world.worldGrid[i][j][1],
                                    predictedVerticalWayDown.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                            ) {
                                let temporaryPredictedHorizontalWayDown = { ...predictedVerticalWayDown }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce > 0) { // ⇓
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayDown.y -= Math.sign(this.downwardForce);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayDown, world.worldGrid[i][j]);
                                    };

                                    possibleSafeYArray.push(temporaryPredictedHorizontalWayDown.y + temporaryPredictedHorizontalWayDown.height - this.height); // adding Y when we shift our predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have shift our predicted way, then we find the safest Y position
                        nextY = helper.findTheSmallestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionMoved = true;
                    };

                } else if (predictedVerticalWayUp) { // if we move up
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedVerticalWayUp.x + predictedVerticalWayUp.width, world.worldGrid[i][j][0],
                                    predictedVerticalWayUp.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedVerticalWayUp.y + predictedVerticalWayUp.height, world.worldGrid[i][j][1],
                                    predictedVerticalWayUp.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted way collides with a cell and if the cell contains any solid pixels
                            ) {
                                let temporaryPredictedHorizontalWayUp = { ...predictedVerticalWayUp }; // a copy of our predicted way
                                let currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted way and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce < 0) { // ⇑
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        temporaryPredictedHorizontalWayUp.y -= Math.sign(this.downwardForce);
                                        currentIntersection = this.calculateIntersection(temporaryPredictedHorizontalWayUp, world.worldGrid[i][j]);
                                    };

                                    possibleSafeYArray.push(temporaryPredictedHorizontalWayUp.y); // adding Y when we shift our predicted way
                                };
                            };
                        };
                    };

                    if (possibleSafeYArray.length !== 0) { // if we have shift our predicted way, then we find the safest Y position
                        nextY = helper.findTheBiggestElementInArrayOfNumbers(possibleSafeYArray);
                        isPredictedPositionMoved = true;
                    };
                };
            };

            if (!isPredictedPositionMoved) { // if we have not corrected our position yet
                let predictedVerticalPosition = { // predict our position
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

                            let currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce < 0) { // ⇑
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]);
                                };

                                if (predictedVerticalPosition.y > nextY) { nextY = predictedVerticalPosition.y };
                                isPredictedPositionMoved = true;
                            };

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce > 0) { // ⇓
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]);
                                };

                                if (predictedVerticalPosition.y < nextY) { nextY = predictedVerticalPosition.y };
                                isPredictedPositionMoved = true;
                            };
                        };
                    };
                };
            };
        };

        if (isPredictedPositionMoved) { // if we have corrected our position, it means that we hit a solid object, so we need to stop
            this.downwardForce = 0;
            this.currentJumpHeight = 0;
        };

        this.y = nextY;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    this.applyMovementXOld6 = function () { // the fourth more non-bugged version with separating X-movement and Y-movement, intersection and sets, this version allows movement on speeds greater than the character's width (still bugged), the same optimization
        let nextX = this.x + this.currentSpeedX;
        let isPredictedPositionMoved = false;

        if (this.currentSpeedX !== 0) { // if we have any X-movement
            let predictedHorizontalWayToTheRight = null;
            let predictedHorizontalWayToTheLeft = null;

            if (Math.abs(this.currentSpeedX) > this.width) { // in order to prevent from teleportation through objects we check if our speed is greater than our width
                if (this.currentSpeedX > 0) { // if we move to the right we prepare data about the way we are going to make
                    predictedHorizontalWayToTheRight = {
                        x: this.x + this.width,
                        y: this.y,
                        width: this.currentSpeedX - this.width,
                        height: this.height
                    };
                };

                if (this.currentSpeedX < 0) { // if we move to the left we prepare data about the way we are going to make
                    predictedHorizontalWayToTheLeft = {
                        x: this.x - Math.abs(this.currentSpeedX) + this.width,
                        y: this.y,
                        width: Math.abs(this.currentSpeedX) - this.width,
                        height: this.height
                    };
                };

                if (predictedHorizontalWayToTheRight) { // if we move to the right
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedHorizontalWayToTheRight.x + predictedHorizontalWayToTheRight.width, world.worldGrid[i][j][0],
                                    predictedHorizontalWayToTheRight.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedHorizontalWayToTheRight.y + predictedHorizontalWayToTheRight.height, world.worldGrid[i][j][1],
                                    predictedHorizontalWayToTheRight.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                            ) {

                                let currentIntersection = this.calculateIntersection(predictedHorizontalWayToTheRight, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX > 0) { // ⇒
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        predictedHorizontalWayToTheRight.x -= Math.sign(this.currentSpeedX);
                                        currentIntersection = this.calculateIntersection(predictedHorizontalWayToTheRight, world.worldGrid[i][j]);
                                    };

                                    nextX = predictedHorizontalWayToTheRight.x + predictedHorizontalWayToTheRight.width - this.width;
                                    isPredictedPositionMoved = true;
                                };
                            };
                        };
                    };
                } else if (predictedHorizontalWayToTheLeft) { // if we move to the left
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedHorizontalWayToTheLeft.x + predictedHorizontalWayToTheLeft.width, world.worldGrid[i][j][0],
                                    predictedHorizontalWayToTheLeft.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedHorizontalWayToTheLeft.y + predictedHorizontalWayToTheLeft.height, world.worldGrid[i][j][1],
                                    predictedHorizontalWayToTheLeft.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                            ) {

                                let currentIntersection = this.calculateIntersection(predictedHorizontalWayToTheLeft, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX < 0) { // ⇐
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        predictedHorizontalWayToTheLeft.x -= Math.sign(this.currentSpeedX);
                                        currentIntersection = this.calculateIntersection(predictedHorizontalWayToTheLeft, world.worldGrid[i][j]);
                                    };

                                    nextX = predictedHorizontalWayToTheLeft.x;
                                    isPredictedPositionMoved = true;
                                };
                            };
                        };
                    };
                };
            };

            if (!isPredictedPositionMoved) { // if we have not corrected our position yet
                let predictedHorizontalPosition = { // predict our position
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

                            let currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX > 0) { // ⇒
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]);
                                };

                                nextX = predictedHorizontalPosition.x
                                isPredictedPositionMoved = true;
                            };

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.currentSpeedX < 0) { // ⇐
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedHorizontalPosition.x -= Math.sign(this.currentSpeedX);
                                    currentIntersection = this.calculateIntersection(predictedHorizontalPosition, world.worldGrid[i][j]);
                                };

                                nextX = predictedHorizontalPosition.x
                                isPredictedPositionMoved = true;
                            };
                        };
                    };
                };
            };
        };

        if (isPredictedPositionMoved) { this.currentSpeedX = 0 }; // if we have corrected our position, it means that we hit a solid object, so we need to stop
        this.x = nextX;
    };

    this.applyMovementYOld6 = function () { // the fourth more non-bugged version with separating X-movement and Y-movement, intersection and sets, this version allows movement on speeds greater than the character's height (still bugged), the same optimization
        let nextY = this.y + this.downwardForce;
        let isPredictedPositionMoved = false;

        if (this.downwardForce !== 0) { // if we have any Y-movement
            let predictedVerticalWayDown = null;
            let predictedVerticalWayUp = null;

            if (Math.abs(this.downwardForce) > this.height) { // in order to prevent from teleportation through objects we check if our speed is greater than our height
                if (this.downwardForce > 0) { // if we move down we prepare data about the way we are going to make
                    predictedVerticalWayDown = {
                        x: this.x,
                        y: this.y + this.height,
                        width: this.width,
                        height: this.downwardForce - this.height
                    };
                };

                if (this.downwardForce < 0) { // if we move up we prepare data about the way we are going to make
                    predictedVerticalWayUp = {
                        x: this.x,
                        y: this.y - Math.abs(this.downwardForce) + this.height,
                        width: this.width,
                        height: Math.abs(this.downwardForce) - this.height
                    };
                };

                if (predictedVerticalWayDown) { // if we move down
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedVerticalWayDown.x + predictedVerticalWayDown.width, world.worldGrid[i][j][0],
                                    predictedVerticalWayDown.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedVerticalWayDown.y + predictedVerticalWayDown.height, world.worldGrid[i][j][1],
                                    predictedVerticalWayDown.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                            ) {

                                let currentIntersection = this.calculateIntersection(predictedVerticalWayDown, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce > 0) { // ⇓
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        predictedVerticalWayDown.y -= Math.sign(this.downwardForce);
                                        currentIntersection = this.calculateIntersection(predictedVerticalWayDown, world.worldGrid[i][j]);
                                    };

                                    nextY = predictedVerticalWayDown.y + predictedVerticalWayDown.height - this.height;
                                    isPredictedPositionMoved = true;
                                };
                            };
                        };
                    };
                } else if (predictedVerticalWayUp) { // if we move up
                    // iterate through every cell
                    for (let i = 0; i < world.worldGrid.length; i++) { // y - iterate through every row
                        for (let j = 0; j < world.worldGrid[i].length; j++) { // x - iterate through every column
                            if (
                                helper.checkIntersectionBetweenTwoNotRotatedRectangles(
                                    predictedVerticalWayUp.x + predictedVerticalWayUp.width, world.worldGrid[i][j][0],
                                    predictedVerticalWayUp.x, world.worldGrid[i][j][0] + world.worldGrid[i][j][2],
                                    predictedVerticalWayUp.y + predictedVerticalWayUp.height, world.worldGrid[i][j][1],
                                    predictedVerticalWayUp.y, world.worldGrid[i][j][1] + world.worldGrid[i][j][3]
                                ) && world.worldGrid[i][j][4] === true // check if the predicted position collides with a cell and if the cell contains any solid pixels
                            ) {

                                let currentIntersection = this.calculateIntersection(predictedVerticalWayUp, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                                if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce < 0) { // ⇑
                                    while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                        predictedVerticalWayUp.y -= Math.sign(this.downwardForce);
                                        currentIntersection = this.calculateIntersection(predictedVerticalWayUp, world.worldGrid[i][j]);
                                    };

                                    nextY = predictedVerticalWayUp.y;
                                    isPredictedPositionMoved = true;
                                };
                            };
                        };
                    };
                };
            };

            if (!isPredictedPositionMoved) { // if we have not corrected our position yet
                let predictedVerticalPosition = { // predict our position
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

                            let currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]); // for better optimization we are going to use data about solid pixels in intersection between the predicted position and the cell in order to ignore checking every solid pixel in the cell

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce < 0) { // ⇑
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]);
                                };

                                if (predictedVerticalPosition.y > nextY) { nextY = predictedVerticalPosition.y };
                                isPredictedPositionMoved = true;
                            };

                            if (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j]) && this.downwardForce > 0) { // ⇓
                                while (this.checkPixelCollisionBetweenCurrentIntersectionAndGridCell(currentIntersection, world.worldGrid[i][j])) {
                                    predictedVerticalPosition.y -= Math.sign(this.downwardForce);
                                    currentIntersection = this.calculateIntersection(predictedVerticalPosition, world.worldGrid[i][j]);
                                };

                                if (predictedVerticalPosition.y < nextY) { nextY = predictedVerticalPosition.y };
                                isPredictedPositionMoved = true;
                            };
                        };
                    };
                };
            };
        };

        if (isPredictedPositionMoved) { // if we have corrected our position, it means that we hit a solid object, so we need to stop
            this.downwardForce = 0;
            this.currentJumpHeight = 0;
        };

        this.y = nextY;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    this.applyMovementXOld5 = function () { // the third non-bugged version with separating X-movement and Y-movement, intersection and sets, much better optimization
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

    this.applyMovementYOld5 = function () { // the third non-bugged version with separating X-movement and Y-movement, intersection and sets, much better optimization
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

    /*----------------------------------------------------------------------------------------------------------------*/

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

    /*----------------------------------------------------------------------------------------------------------------*/

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

    /*----------------------------------------------------------------------------------------------------------------*/

    this.applyMovementOld2 = function () { // the second unfinished bugged version without sets, intersection and separating X-movement and Y-movement
        let nextX = this.x + this.currentSpeedX;
        let nextY = this.y + this.downwardForce;

        /*------------------------------------------------------------------------------------------------------------*/

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

        /*------------------------------------------------------------------------------------------------------------*/

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

    /*----------------------------------------------------------------------------------------------------------------*/

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

    /*----------------------------------------------------------------------------------------------------------------*/

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
    };

    this.drawSpawnPosition = function () {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(playerDefaultSettings.x, 0);
        ctx.lineTo(playerDefaultSettings.x, 480);
        ctx.stroke();
    };

    this.drawPredictedWays = function (drawAtX) {
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 1;
        ctx.strokeRect(drawAtX + this.width, this.y, playerDefaultSettings.currentSpeedXToTheRight - this.width, this.height); // ⇒
        ctx.strokeRect(drawAtX - Math.abs(playerDefaultSettings.currentSpeedXToTheLeft) + this.width, this.y, Math.abs(playerDefaultSettings.currentSpeedXToTheLeft) - this.width, this.height); // ⇐
        ctx.strokeRect(drawAtX, this.y + this.height, this.width, worldDefaultSettings.gravity - this.height); // ⇓
        ctx.strokeRect(drawAtX, this.y - Math.abs(playerDefaultSettings.downwardForce) + this.height, this.width, Math.abs(playerDefaultSettings.downwardForce) - this.height); // ⇑
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
            // this.drawSpawnPosition();
            // this.drawPredictedWays(drawAtX);

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