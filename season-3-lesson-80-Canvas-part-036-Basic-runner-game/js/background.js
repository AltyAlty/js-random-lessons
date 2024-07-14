const background = {
    x1: 0,
    y1: 0,
    x2: canvas.width,
    y2: 0,
    parallaxSpeedX: backgroundDefaultSettings.parallaxSpeedX,
    parallaxAccelerationX: backgroundDefaultSettings.parallaxAccelerationX,
    increaseParallaxSpeedXDivisor: backgroundDefaultSettings.increaseParallaxSpeedXDivisor,

    /*Метод для отрисовки фона.*/
    draw: function (speed) {
        ctx.drawImage(imageBackground, this.x1, this.y1);
        ctx.drawImage(imageBackground, this.x2, this.y2);

        this.x1 -= speed;
        this.x2 -= speed;

        if (this.x1 <= -canvas.width) {
            this.x1 = 0;
            this.x2 = canvas.width;
        };
    }
};