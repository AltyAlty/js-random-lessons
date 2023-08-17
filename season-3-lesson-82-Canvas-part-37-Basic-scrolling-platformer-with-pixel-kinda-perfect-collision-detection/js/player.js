const player = {
    character: new Character(
        320, 100,
        20, 20,
        150,
        new Animation('./src/cat/cat', 5), new Animation('./src/cat/backwards/cat.backwards', 5)
    ),

    preparePlayerData: function () {
        let currentLocationType = world.getPixelType(this.character.findLeadingEdgeXOfCharacter(), this.character.y);

        if (currentLocationType === 'exit' || currentLocationType === 'pit') {
            let state = currentLocationType === 'exit' ? 'win' : 'lose';
            game.stop(state);
            return;
        };

        this.processControls();

        if (!game.finished) { this.character.prepareCharacterData() };
    },

    processControls: function () {
        if (controls.isRightKeyDown) { this.character.currentSpeedX = 4 };
        if (controls.isLeftKeyDown) { this.character.currentSpeedX = -4 };
        if ((controls.isRightKeyDown && controls.isLeftKeyDown) || (!controls.isLeftKeyDown && !controls.isRightKeyDown)) { this.character.currentSpeedX = 0 };

        if (controls.isUpKeyDown && this.character.findIfPlayerIsStandingOnAPlatform()) {
            this.character.downwardForce = -5;
            audio.playSound(audio.jumpSound);
        };
    },

    draw: function () { this.character.draw() }
};