let walls = [new Wall(0, 550, 1400, canvas.height - 400, helper.getRandomColor(), helper.getRandomColor(), 1, 2)]; // Первую стенку создаем вручную.

function Wall(
    x, y,
    width, height,
    color, strokecolor,
    id, type
) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.strokecolor = strokecolor;
    this.id = id;
    this.type = type;

    /*Метод для сдвига стенки влево.*/
    this.move = function (speedX) {
        this.x -= speedX;
    };

    this.drawWallsCoordinates = function () {
        ctx.font = '10px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(this.x + ':' + this.y, this.x, this.y + 15);
        ctx.fillText((this.x + this.width) + ':' + this.y, this.x + this.width, this.y + 30);
        ctx.fillText(this.x + ':' + (this.y + this.height), this.x, this.y + this.height);
        ctx.fillText((this.x + this.width) + ':' + (this.y + this.height), this.x + this.width, this.y + this.height - 15);
    };

    this.drawWallsID = function () {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(this.id, this.x + this.width / 2, this.y + this.height / 2);
    };

    this.draw = function () {
        if (this.type === 1) {
            ctx.fillStyle = 'white';
        } else if (this.type === 2) {
            ctx.fillStyle = this.color;
        };

        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = this.strokecolor;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // this.drawWallsCoordinates();
        // this.drawWallsID();
    };
};