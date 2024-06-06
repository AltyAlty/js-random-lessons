const world = {
    screenWidth: canvas.width,
    screenHeight: canvas.height,
    gravity: worldDefaultSettings.gravity,
    distanceTravelledFromSpawnPoint: 0,
    levelImage: null,
    collisionMapImage: null,
    collisionMapCanvas2DContext: null,
    collisionMapWidth: 8000,
    collisionMapHeight: 480,
    worldGrid: [],
    worldGridCellSize: worldDefaultSettings.worldGridCellSizeForNormalSpeeds, // if you have a high speed, then the smaller the size is, the better the optimization is (for example 5) [PROBABLY THIS IS NOT TRUE ANYMORE]
    worldGridRows: 0,
    worldGridColumns: 0,
    worldGridCellCount: 0,
    rowsData: [],
    columnsData: [],

    loadLevelImage: function () {
        this.levelImage = new Image();
        this.levelImage.src = './src/level/map-three.png';
    },

    loadCollisionMapCanvas2DContext: function () {
        this.collisionMapImage = new Image();
        // this.collisionMapImage.src = collisionMapImageBase64;
        this.collisionMapImage.src = './src/level/map-three.png';
        this.collisionMapImage.onload = function () {
            let hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.setAttribute('width', this.width); // 8000
            hiddenCanvas.setAttribute('height', this.height); // 480
            world.collisionMapCanvas2DContext = hiddenCanvas.getContext('2d', { willReadFrequently: true });
            world.collisionMapCanvas2DContext.drawImage(this, 0, 0);
        };
    },

    fillWorldGrid: function () { // method to get data about solid pixels by using sets in order to have better optimization
        /*If our x-speed is greater than our width or our y-speed is greater than our height, then we choose the cell size larger, otherwise we choose the cell size smaller.*/
        if (Math.abs(playerDefaultSettings.currentSpeedXToTheRight) > playerDefaultSettings.width ||
            Math.abs(playerDefaultSettings.currentSpeedXToTheLeft) > playerDefaultSettings.width ||
            Math.abs(playerDefaultSettings.downwardForce) > playerDefaultSettings.height ||
            Math.abs(worldDefaultSettings.gravity) > playerDefaultSettings.height) {
            this.worldGridCellSize = worldDefaultSettings.worldGridCellSizeForHighSpeeds;
        } else {
            this.worldGridCellSize = worldDefaultSettings.worldGridCellSizeForNormalSpeeds;
        };

        /*Find how many rows and columns we need for our world grid.*/
        this.worldGridRows = this.collisionMapHeight / this.worldGridCellSize;
        this.worldGridColumns = this.collisionMapWidth / this.worldGridCellSize;
        this.worldGridCellCount = this.worldGridRows * this.worldGridColumns;

        for (let i = 0; i < this.worldGridRows; i++) { // y - iterate through every row
            this.worldGrid.push([]); // add data about a row

            for (let j = 0; j < this.worldGridColumns; j++) { // x - iterate through every column

                // check if a cell contains any solid pixels
                if (helper.checkPixelCollisionUpDownLeftRight(j * this.worldGridCellSize, i * this.worldGridCellSize, this.worldGridCellSize, this.worldGridCellSize)) {

                    this.worldGrid[i].push( // add data about the cell in the row
                        [
                            j * this.worldGridCellSize, // 0 - X-coordinate
                            i * this.worldGridCellSize, // 1 - Y-coordinate
                            this.worldGridCellSize, // 2 - width
                            this.worldGridCellSize, // 3 - height
                            true, // 4 - if the cell contains solid pixels
                            new Set() // 5 - a new empty set for data about every solid pixel in the cell
                        ]
                    );

                    // fill the set with the data about every solid pixel in the cell
                    for (let k = this.worldGrid[i][j][0]; k <= this.worldGrid[i][j][0] + this.worldGrid[i][j][2]; k++) { // iterate through X-Axis from left to right
                        for (let l = this.worldGrid[i][j][1]; l < this.worldGrid[i][j][1] + this.worldGrid[i][j][3]; l++) { // iterate through Y-Axis from top to bottom
                            if (this.findIfPixelIsSolidSurface(k, l)) { // if a pixel is a solid one
                                this.worldGrid[i][j][5].add({ x: k, y: l }); // add the coordinates of the pixel into the set
                            };
                        };
                    };

                } else {

                    this.worldGrid[i].push( // add data about the cell in the row
                        [
                            j * this.worldGridCellSize, // 0 - X-coordinate
                            i * this.worldGridCellSize, // 1 - Y-coordinate
                            this.worldGridCellSize, // 2 - width
                            this.worldGridCellSize, // 3 - height
                            false // 4 - if the cell contains solid pixels
                        ]
                    );

                };
            };
        };

        for (let [i, j] = [0, 0]; i < this.collisionMapHeight; i += this.worldGridCellSize, j++) {
            this.rowsData.push([i, i + this.worldGridCellSize, j]); // [y1, y1 + height, rowID]
        };

        for (let [i, j] = [0, 0]; i < this.collisionMapWidth; i += this.worldGridCellSize, j++) {
            this.columnsData.push([i, i + this.worldGridCellSize, j]); // [x1, x1 + width, columnID]
        };
    },

    findIfPixelIsSolidSurface: function (x, y) { return this.getPixelType(x, y) === '#' },

    getPixelType: function (x, y) {
        if (!this.collisionMapCanvas2DContext) return '.';

        let rawPixelData = this.collisionMapCanvas2DContext.getImageData(x, y, 1, 1).data; // []
        let RGBAPixelData = `${rawPixelData[0]} ${rawPixelData[1]} ${rawPixelData[2]} ${rawPixelData[3]}`;

        if (RGBAPixelData === '255 0 0 255') return 'pit';
        if (RGBAPixelData === '76 255 0 255') return 'exit';
        if (RGBAPixelData === '255 255 255 255') return '.';
        if (RGBAPixelData === '0 0 0 255') return '#';
    },

    prepareWorldData: function () {
        if (!this.levelImage) { this.loadLevelImage() };
        if (!this.collisionMapCanvas2DContext) { this.loadCollisionMapCanvas2DContext() };
        this.distanceTravelledFromSpawnPoint = player.character.x - playerDefaultSettings.x;
    },

    findXOfBeginningOfLevelEnd: function () { return this.levelImage.width - this.screenWidth },

    findIfPlayerIsAtLevelEnd: function () { return this.distanceTravelledFromSpawnPoint >= this.findXOfBeginningOfLevelEnd() },

    drawWordlGrid: function (drawAtX) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'orange';

        for (let i = 0; i < this.worldGridRows; i++) { // y
            for (let j = 0; j < this.worldGridColumns; j++) { // x
                ctx.strokeRect(j * this.worldGridCellSize + drawAtX, i * this.worldGridCellSize, this.worldGridCellSize, this.worldGridCellSize);
            };
        };
    },

    draw: function () {
        /*Умножаем на -1, так как при движении игрока в какую-то сторону, мы должны двигать изображение уровня в
        противоположную сторону.*/
        let drawAtX = this.distanceTravelledFromSpawnPoint * -1;
        /*Проверяем не прошел ли игрок дальше точки спавна в левую сторону, и если так, то перестаем двигать изображения
        уровня.*/
        drawAtX = drawAtX > 0 ? 0 : drawAtX;
        /*Проверяем не находится ли игрок в конце уровня в правой стороне, и если так, то перестаем двигать изображение
        уровня.*/
        drawAtX = this.findIfPlayerIsAtLevelEnd() ? this.findXOfBeginningOfLevelEnd() * -1 : drawAtX;

        if (!game.finished) { ctx.drawImage(this.levelImage, drawAtX, 0) };

        // this.drawWordlGrid(drawAtX);
    },
};