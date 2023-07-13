const gameDefaultSettings = {
    tickRate: 1000 / 60,
    ticks: 0 // Количество тиков.
};

const worldDefaultSettings = {
    worldSpeed: 16, // Скорость прокрутки мира.
    maxWorldSpeed: 50, // Максимально возможная скорость прокрутки мира.
    increaseWorldSpeedDivisor: 5, // Число, определяющее через какое количество пройденных стен должна увеличиться скорость прокрутки мира.
    autoScroll: true, // Показывает прокручивается ли мир в данный момент.
    height: canvas.height, // Высота игрового мира.
    width: canvas.width, // Ширина игрового мира.
    wallWidth: 1150, // Ширина стен.
    maximumWallHeight: canvas.height / 2, // Максимально возможная высота какой-либо стены.
    minimumWallHeight: 50, // Минимально возможная высота какой-либо стены.
    maximumWallsAtOneTIme: 5, // Количество стен, о которых мы можем иметь данных в данный момент.
    playerHeightMultiplayer: 2, // Множитель высоты игрока, для определения на какую максимальную высоту может запрыгнуть игрок c текущей последней стены.
    differnceBetweenCurrentLastWallAndNewWall: 100, // Число, указывающее на сколько следующая стена может быть минимально выше текущей последней стены.
    newWallLowHeightEnhancer: 50, // Число, указывающее, на сколько надо увеличить высоту следующе стены, если она ниже установленного ограничения между этой стены и предыдудщей текущей стеной.
    firstWallWithHoleID: 33, // ID стены, перед которой должна появиться первая пропасть.
    addingHoleDivisor: 6, //  Число, определяющее через какое максимальное количество пройденных стен должна появиться пропасть.
    isLastWallAHole: false, // Указывает является ли последняя созданная стена стеной с дырой.
    minimumHoleWidth: 400, // Минимальная ширина пропасти.
    tempWallID: 2,  // ID для стен при их создании.
    distanceTravelled: 0, // Пройденное расстояние.
    wallsPassed: 0, // Количество пройденных стен.
    tickRateDisco: 1000 / 3 // Переменная, указывающая скорость смены цвета стен.
};

const playerDefaultSettings = {
    x: 300,
    y: 480,
    width: 32,
    height: 64,
    maxSpeedX: 10,
    maxSpeedY: 25,
    currentAccelerationY: 15, // Текущее ускорение игрока по Y.
    accelerationY: 15, // Стандартное ускорение игрока по Y.
    gravity: 2,
    accelerationX: 1,
    friction: 0.6,
    color: 'orange',
    isActive: true,
    drawSlowingRate: 4, // Переменная, указывающая во сколько раз анимация должна быть меньше скорости работы всей игры.
    maximumJumpedDistance: 400, // Переменная, указывающая какое максимальное суммарное расстояние можно пройти вверх будучи в прыжке.
    jumpUpgrades: 0, // Количество улучшений прыжка.
    jumpUpgradeDistance: 300, // Указывает на сколько увеличивается прыжок за одно улучшение.
    upgradeJumpTickDivisor: 3000 // Число, определяющее через какое количество тиков должен улучшаться прыжок игрока.
};

const backgroundDefaultSettings = {
    parallaxSpeedX: 1, // Скорость движения фона.
    parallaxAccelerationX: 0.025, // Ускорение движения фона.
    increaseParallaxSpeedXDivisor: 5 // Показатель, указывающий через каждые сколько пройденных стен должна увеличиться скорость движения фона.
};

const audioDefaultSettings = {
    volume: 0.1
};