const audio = {
    volume: 0.1,
    defaultBackgroundMusic: new Audio('./src/audio/music.mp3'),
    loseSound: new Audio('./src/audio/lose-sound-default.wav'),

    playSound: function (sound) {
        sound.volume = audio.volume;
        sound.play();
    },

    pauseSound: function (sound) {
        audio.defaultBackgroundMusic.currentTime = 0;
        sound.volume = audio.volume;
        sound.pause();
    },

    initiateBackgroudMusicLooping: function () {
        audio.defaultBackgroundMusic.loop = true;
    }
};