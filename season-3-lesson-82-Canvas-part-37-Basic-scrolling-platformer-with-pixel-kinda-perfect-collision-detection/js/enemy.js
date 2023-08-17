function Enemy(x, y, maxJumpHeight) {
    this.character = new Character(
        x, y,
        20, 20,
        maxJumpHeight,
        new Animation('./src/tiger/tiger', 5), new Animation('./src/tiger/backwards/tiger.backwards', 5)
    );

    this.prepareEnemyData = function () {
        let distanceFromPlayer = Math.abs(player.character.x - this.character.x);

        if (distanceFromPlayer <= 600) {
            this.character.currentSpeedX = 3;
            if (player.character.x < this.character.x) { this.character.currentSpeedX *= -1 };

            if (
                player.character.x < this.character.x &&
                this.character.x < player.character.x + player.character.width &&
                player.character.x + player.character.width < this.character.x + this.character.width
            ) {
                this.character.currentSpeedX = 0;
            };

            if (game.ticks % 90 === 0 && this.character.findIfPlayerIsStandingOnAPlatform()) { this.character.downwardForce = -4; }
            if (this.character.collidesWith(player.character)) { game.stop() };
            if (!game.finished) { this.character.prepareCharacterData() };
        };
    };

    this.draw = function () { this.character.draw() };
};

const enemies = {
    enemiesList: [
        // new Enemy(500, 100, 120),
        // new Enemy(1000, 100, 120),
        // new Enemy(1020, 100, 120),
        // new Enemy(1040, 100, 120),
        // new Enemy(1060, 100, 120),
        // new Enemy(2000, 100, 120),
        // new Enemy(3700, 100, 120),
        // new Enemy(4000, 100, 120),
        // new Enemy(5600, 100, 120),
        // new Enemy(6500, 100, 120),
        // new Enemy(7600, 100, 120)
    ],

    prepareEnemiesData: function () {
        for (let i = 0; i < enemies.enemiesList.length; i++) { enemies.enemiesList[i].prepareEnemyData() };
    }
};