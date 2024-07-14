const audio = {
    enabled: true,
    volume: 0.0,
    backgroundMusic: new Audio('./src/sounds/background.mp3'),
    jumpSound: new Audio('./src/sounds/meow.wav'),

    initiateBackgroudMusicLooping: function () { audio.backgroundMusic.loop = true },

    playSound: function (sound) {
        sound.volume = audio.volume;
        sound.play();
    },

    pauseSound: function (sound) {
        audio.backgroundMusic.currentTime = 0;
        sound.volume = audio.volume;
        sound.pause();
    }
};

audio.initiateBackgroudMusicLooping();