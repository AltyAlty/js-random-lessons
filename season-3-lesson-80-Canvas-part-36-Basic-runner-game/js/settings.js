const gameDefaultSettings = {
    tickRate: 1000 / 60
};

const worldDefaultSettings = {
    worldSpeed: 16, // Скорость прокрутки мира.
    maxWorldSpeed: 200, // Максимально возможная скорость прокрутки мира.
    increaseWorldSpeedDivisor: 5, // Число, определяющее через какое количество пройденных стен должна увеличиться скорость прокрутки мира.
    autoScroll: true, // Показывает прокручивается ли мир в данный момент.
    height: canvas.height, // Высота игрового мира.
    width: canvas.width, // Ширина игрового мира.
    wallWidth: 950, // Ширина стен.
    maximumWallHeight: canvas.height / 2, // Максимально возможная высота какой-либо стены.
    minimumWallHeight: 50, // Минимально возможная высота какой-либо стены.
    maximumWallsAtOneTIme: 5, // Количество стен, о которых мы можем иметь данных в данный момент.
    playerHeightMultiplayer: 2, // Множитель высоты игрока, для определения на какую максимальную высоту может запрыгнуть игрок c текущей последней стены.
    differnceBetweenCurrentLastWallAndNewWall: 100, // Число, указывающее на сколько следующая стена может быть минимально выше текущей последней стены.
    newWallLowHeightEnhancer: 50, // Число, указывающее, на сколько надо увеличить высоту следующе стены, если она ниже установленного ограничения между этой стены и предыдудщей текущей стеной.
    isLastWallAHole: false, // Указывает является ли последняя созданная стена стеной с дырой.
    tempWallID: 2,  // ID для стен при их создании.
    distanceTravelled: 0, // Пройденное расстояние.
    wallsPassed: 0, // Количество пройденных стен.
    drawDiscoSlowingRate: 19 // Переменная, указывающая во сколько раз смена цвета стен должна быть меньше скорости работы всей игры.
};

const playerDefaultSettings = {
    x: 300,
    y: 480,
    width: 32,
    height: 64,
    maxSpeedX: 10,
    maxSpeedY: 26,
    currentAccelerationY: 20, // Текущее ускорение игрока по Y.
    accelerationY: 20, // Стандартное ускорение игрока по Y.
    gravity: 3,
    accelerationX: 1,
    friction: 0.6,
    color: 'orange',
    isActive: true,
    drawSlowingRate: 4 // Переменная, указывающая во сколько раз анимация должна быть меньше скорости работы всей игры.
};

const backgroundDefaultSettings = {
    parallaxSpeedX: 1, // Скорость движения фона.
    parallaxAccelerationX: 0.025, // Ускорение движения фона.
    increaseParallaxSpeedXDivisor: 10
};