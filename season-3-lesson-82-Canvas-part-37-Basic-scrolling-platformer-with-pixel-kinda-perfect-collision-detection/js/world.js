const world = {
    screenWidth: canvas.width,
    screenHeight: canvas.height,
    gravity: 10,
    distanceTravelledFromSpawnPoint: 0,
    levelImage: null,
    collisionMapImage: null,
    collisionMapCanvas2DContext: null,
    collisionMapWidth: 8000,
    collisionMapHeight: 480,
    worldGrid: [],
    worldGridCellSize: 20,

    loadLevelImage: function () {
        this.levelImage = new Image();
        this.levelImage.src = './src/level/map-three.png';
    },

    loadCollisionMapCanvas2DContext: function () {
        this.collisionMapImage = new Image();
        this.collisionMapImage.src = collisionMapImageBase64;
        this.collisionMapImage.onload = function () {
            let hiddenCanvas = document.createElement('canvas');
            hiddenCanvas.setAttribute('width', this.width); // 8000
            hiddenCanvas.setAttribute('height', this.height); // 480
            world.collisionMapCanvas2DContext = hiddenCanvas.getContext('2d', { willReadFrequently: true });
            world.collisionMapCanvas2DContext.drawImage(this, 0, 0);
        };
    },

    fillWorldGrid: function () {
        let rows = this.collisionMapHeight / this.worldGridCellSize;
        let columns = this.collisionMapWidth / this.worldGridCellSize;

        for (let i = 0; i < rows; i++) { // y
            this.worldGrid.push([]);

            for (let j = 0; j < columns; j++) { // x

                if (helper.checkPixelCollisionUpDownLeftRight(j * this.worldGridCellSize, i * this.worldGridCellSize, this.worldGridCellSize, this.worldGridCellSize)) {

                    this.worldGrid[i].push(
                        [
                            j * this.worldGridCellSize, // 0
                            i * this.worldGridCellSize, // 1
                            this.worldGridCellSize, // 2
                            this.worldGridCellSize, // 3
                            true, // 4
                            new Set() // 5
                        ]
                    );

                    for (let k = this.worldGrid[i][j][0]; k <= this.worldGrid[i][j][0] + this.worldGrid[i][j][2]; k++) { // x
                        for (let l = this.worldGrid[i][j][1]; l < this.worldGrid[i][j][1] + this.worldGrid[i][j][3]; l++) { // y
                            if (this.findIfPixelIsSolidSurface(k, l)) {
                                this.worldGrid[i][j][5].add({ x: k, y: l }); 
                            };                            
                        };
                    };

                } else {

                    this.worldGrid[i].push(
                        [
                            j * this.worldGridCellSize, // 0
                            i * this.worldGridCellSize, // 1
                            this.worldGridCellSize, // 2
                            this.worldGridCellSize, // 3
                            false // 4
                        ]
                    );

                };
            };
        };
    },

    findIfPixelIsSolidSurface: function (x, y) {
        return this.getPixelType(x, y) === '#';
    },

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
        this.distanceTravelledFromSpawnPoint += player.character.currentSpeedX;
    },

    findXOfBeginningOfLevelEnd: function () {
        return this.levelImage.width - this.screenWidth;
    },

    findIfPlayerIsAtLevelEnd: function () {
        return this.distanceTravelledFromSpawnPoint >= this.findXOfBeginningOfLevelEnd();
    },

    drawWordlGrid: function (drawAtX) {
        let rows = this.collisionMapHeight / this.worldGridCellSize;
        let columns = this.collisionMapWidth / this.worldGridCellSize;

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'orange';

        for (let i = 0; i < rows; i++) { // y
            for (let j = 0; j < columns; j++) { // x
                ctx.strokeRect(j * this.worldGridCellSize + drawAtX, i * this.worldGridCellSize, this.worldGridCellSize, this.worldGridCellSize);
            };
        };
    },

    draw: function () {
        /*Умножаем на -1, так как при движении игрока в какую-то сторону, мы должны двигать изображение уровня в противоположную сторону.*/
        let drawAtX = this.distanceTravelledFromSpawnPoint * -1;
        /*Проверяем не прошел ли игрок дальше точки спавна в левую сторону, и если так, то перестаем двигать изображения уровня.*/
        drawAtX = drawAtX > 0 ? 0 : drawAtX;
        /*Проверяем не находится ли игрок в конце уровня в правой стороне, и если так, то перестаем двигать изображение уровня.*/
        drawAtX = this.findIfPlayerIsAtLevelEnd() ? this.findXOfBeginningOfLevelEnd() * -1 : drawAtX;

        if (!game.finished) { ctx.drawImage(this.levelImage, drawAtX, 0) };

        // this.drawWordlGrid(drawAtX);
    }
};

