function Animation(filename, frameCount) {
    this.frames = [];
    this.currentFrameId = 1;

    for (let frameId = 1; frameId <= frameCount; frameId++) {
        let frame = new Image();
        frame.src = filename + '.' + frameId + '.png';
        this.frames[frameId] = frame;
    };

    this.drawFrame = function (frameNumber, x, y, width, height) {
        ctx.drawImage(this.frames[frameNumber], x, y, width, height);
    };

    this.drawAnimation = function (ticks, x, y, width, height) {
        if (ticks % 5 === 0) { this.currentFrameId++ };
        this.currentFrameId = this.currentFrameId >= this.frames.length ? 1 : this.currentFrameId;
        this.drawFrame(this.currentFrameId, x, y, width, height);
    };
};