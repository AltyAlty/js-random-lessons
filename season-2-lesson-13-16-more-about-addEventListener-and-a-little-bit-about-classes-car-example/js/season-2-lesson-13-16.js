/*К любому HTML-элементу можно использовать метод "addEventListener()".
Этот метод позволяет реализовать паттерн "издатель-подписчик".*/

function clickOnMe(event) {
    console.log(event.ctrlKey); /*"ctrlKey" позволяет проверить была ли
    нажата кнопка мыши с зажатой клавишей "ctrl" или нет.*/
};

var element = document.getElementById('click');

element.addEventListener('click', clickOnMe);

/*Таким синтаксисом можно подписать только одну функцию на событие. Но так
лучше не делать.*/
// element.onclick = clickOnMe;

/*---------------------------------------------------------------------------*/

class ListenerHandler { /*Создали специальный класс, который содержит в себе
    функционал, необходимый для осуществления работы по принципу 
    "издатель-подписчик".*/
    _triggerEvent(eventName, eventData) { /*Специальный метод, который в 
        зависимости от события "eventName" будет вызывать слушателей 
        соотвествующего события. Также в этот метод можно передавать объект с 
        данными "eventData", который может использоваться при срабатывании 
        какого-либо события.*/
        var arrayOflisteners = this.listeners[eventName]; /*Сохраняем
        отдельно объект со слушателями. В дочернем классе, созданном на
        основе этого класса, должен быть специальный объект "listeners" для 
        хранения слушателей событий.*/

        if (!!arrayOflisteners) {
            arrayOflisteners.forEach(function (listener) {
                listener(eventData);
            });
        }; /*Если объект со слушателями есть, то пробегаемся по каждому
        свойству этого объекта. Вызываем функцию, которая будет принимать
        в качестве параметра каждое свойство этого объекта со слушателями и 
        вызывать каждое это свойство, то есть каждого слушателя, передав этому
        слушателю объект с данными "eventData".*/
    };

    addYourEventListener(eventName, listener) { /*Специальный метод, при
        помощи которого можно добавлять функции "listener" в объект со 
        слушателями каких-то событий "eventName".*/
        if (!this.listeners) {
            this.listeners = {};
        }; /*Если объекта со слушателями нет в контексте, в котором был
        вызван этот метод, то создаем в этом контексте такой объект. То
        есть если в дочерних классах этого класса мы не укажем упомянутый
        объект, то это не нарушит работу программы.*/

        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }; /*Если в объекте со слушателями нет свойства, которое определяет
        слушателей какого-то конкретного события "eventName", то создаем 
        такое свойство в объекте со слушателями. То есть если в дочерних 
        классах этого класса мы не укажем упомянутого свойства объекта, то 
        это не нарушит работу программы.*/

        this.listeners[eventName].push(listener); /*Добавляем указанную
        функцию в какое-то свойство объекта со слушателями.*/
    };
};

class Car extends ListenerHandler { /*На основе класса "ListenerHandler" 
создаем класс "Car", на основе которого можно будет создавать машины.*/
    constructor() { /*Создаем конструктор в классе "Car".*/
        super(); /*Ключевое слово "super" используется для вызова функций, 
        принадлежащих родителю объекта.*/

        this.speed = 0; /*Свойство, хранящее скорость машины.*/

        this.onStartFunction = null; /*Свойство, в котором можно сохранить 
        только одну callback-функцию, которая будет вызываться при старте 
        машины.*/
        this.onStopFunction = null; /*Свойство, в котором можно сохранить 
        только одну callback-функцию, которая будет вызываться при остановке 
        машины.*/

        this.listeners = { /*Создаем объект для хранения слушателей разных событий.
            Каждое свойство обозначает список слушателей на какое-то отдельное
            событие. Здесь уже можно сохранять больше одной callback-функции для 
            каждого события, так как какждое свойство этого объекта является 
            массивом.*/
            start: [], /*Свойство, в котором можно сохранить callback-функции, 
            которые будут вызываться при старте машины.*/
            stop: [], /*Свойство, в котором можно сохранить callback-функции, 
            которые будут вызываться при остановке машины.*/
            maxSpeed: [] /*Свойство, в котором можно сохранить callback-функции, 
            которые будут вызываться при достижении машиной максимальной 
            скорости.*/
        };
    };

    start() { /*Метод, который имитирует старт машины.*/
        console.log('---------------------------------------------');

        this.speed = 100; /*Задаем стартовую скорость машине.*/

        if (this.onStartFunction !== null) {
            this.onStartFunction();
        }; /*Если мы указали callback-функцию, которая должна вызываться при
        старте машины, то вызываем ее.*/

        console.log(`Car has speed after start: ${this.speed}`);

        this._triggerEvent('start', { t: 30, currentTarget: this });
        /*Вызываем из родительского класса "ListenerHandler" метод 
        "_triggerEvent()", чтобы затриггерить событие "start", то есть запуск 
        машины, чтобы уведомить об этом событии слушателей. Также вторым
        параметром передаем объект, который содержит информацию о текущей
        температуре машины и сам объект машины (свойство 
        "currentTarget: this").*/

        setTimeout(() => {
            this.speed = 150;

            console.log('---------------------------------------------');
            console.log(`Car has speed in 1 second after start: ${this.speed}`);

            this._triggerEvent('maxSpeed', { t: 60, currentTarget: this });
        }, 1000); /*Через одну секунду указываем, что машина набрала
        максимальную скорость и снова вызываем из родительского класса
        "ListenerHandler" метод "_triggerEvent()", чтобы затриггерить
        событие "maxSpeed", то есть достижение максимальной скорости
        машиной, чтобы уведомить об этом событии слушателей. Также вторым
        параметром передаем объект, который содержит информацию о текущей
        температуре машины и сам объект машины (свойство 
        "currentTarget: this").*/

        //setTimeout(this._stop.bind(this), 2000); 
        /*Через 2 секунды останавливаем машину. Поскольку в методе "_stop()" 
        вызывается функция из свойства "onStopFunction" какого-то конкретного 
        объекта, поэтому чтобы не потерять контекст "this" этого объекта 
        используем здесь метод "bind()".*/

        setTimeout(() => {
            this._stop();
        }, 2000); /*Но если использовать синтаксис стрелочной функции, то
        не нужно будет использовать метод "bind()" в коде выше.*/

        setTimeout(() => {
            console.log('---------------------------------------------');
            console.log('Car is on fire');

            this._triggerEvent('fire', { t: 200, currentTarget: this });
        }, 4000); /*Через 4 секунды указываем, что машина загорелась и 
        снова вызываем из родительского класса "ListenerHandler" метод 
        "_triggerEvent()", чтобы затриггерить событие "fire", то есть 
        возгорание машины, чтобы уведомить об этом событии слушателей.
        Также вторым параметром передаем объект, который содержит 
        информацию о текущей температуре машины и сам объект машины 
        (свойство "currentTarget: this").*/
    };

    _stop() { /*Метод, который имитирует остановку машины.*/
        console.log('---------------------------------------------');

        this.speed = 0; /*Задаем скорость машине при полной остановке.*/

        if (this.onStopFunction !== null) {
            this.onStopFunction();
        }; /*Если мы указали callback-функцию, которая должна вызываться при
        остановке машины, то вызываем ее.*/

        console.log(`Car has speed in 2 seconds after start: ${this.speed}`);

        this._triggerEvent('stop', { t: 0, currentTarget: this });
        /*Вызываем из родительского класса "ListenerHandler" метод 
        "_triggerEvent()", чтобы затриггерить событие "stop", то есть 
        остановка машины, чтобы уведомить об этом событии слушателей.
        Также вторым параметром передаем объект, который содержит 
        информацию о текущей температуре машины и сам объект машины 
        (свойство "currentTarget: this").*/
    };
};

/*Далее определяем сами callback-функции, которые будут слушателями разных 
событий, то есть вызываться при срабатывании какого-либо события.*/
function stopCar() {
    console.log('Car has stopped');
};

function startCar() {
    console.log('Car has started');
};

function letKEKKnowCarHasStopped(event) {
    console.log('KEK knows that car has stopped');
    console.log('KEK knows that current temperature of car is ' + event.t)
};

function letLOLKnowCarHasStopped(event) {
    console.log('LUL knows that car has stopped');
    console.log('LOL knows that current temperature of car is ' + event.t)
};

function letKEKKnowCarHasStarted(event) {
    console.log('KEK knows that car has started');
    console.log('KEK knows that current temperature of car is ' + event.t)
};

function letLOLKnowCarHasStarted(event) {
    console.log('LUL knows that car has started');
    console.log('LOL knows that current temperature of car is ' + event.t)
};

function letKEKKnowCarHasReachedMaxSpeed(event) {
    console.log('KEK knows that car has reached max speed');
    console.log('KEK knows that current temperature of car is ' + event.t)
};

function letLOLKnowCarHasReachedMaxSpeed(event) {
    console.log('LUL knows that car has reached max speed');
    console.log('LOL knows that current temperature of car is ' + event.t)
};

function letKEKKnowCarIsOnFire(event) {
    console.log('KEK knows that car is on fire');
    console.log('KEK knows that current temperature of car is ' + event.t)
};

function letLOLKnowCarIsOnFire(event) {
    console.log('LOL knows that car is on fire');
    console.log('LOL knows that current temperature of car is ' + event.t)
};


var car1 = new Car(); /*Создали объект "car1" на основе класса "Car".*/

car1.onStartFunction = startCar; /*Указали слушателя события по запуску 
машины. Этим способом можно указать только одного слушателя.*/
car1.onStopFunction = stopCar; /*Указали слушателя события по остановке 
машины. Этим способом можно указать только одного слушателя.*/

/*Далее подписываем несколько слушателей на разные события. Указанным
здесь способом уже можно подписывать больше одного слушателя на какое-либо
событие.*/
car1.addYourEventListener('stop', letKEKKnowCarHasStopped);
car1.addYourEventListener('stop', letLOLKnowCarHasStopped);
car1.addYourEventListener('start', letKEKKnowCarHasStarted);
car1.addYourEventListener('start', letLOLKnowCarHasStarted);
car1.addYourEventListener('maxSpeed', letKEKKnowCarHasReachedMaxSpeed);
car1.addYourEventListener('maxSpeed', letLOLKnowCarHasReachedMaxSpeed);
car1.addYourEventListener('fire', letKEKKnowCarIsOnFire);
car1.addYourEventListener('fire', letLOLKnowCarIsOnFire);


console.log(`Car has speed before start: ${car1.speed}`);

car1.start(); /*Запускаем машину.*/

/*---------------------------------------------------------------------------*/

class Cat extends ListenerHandler { /*На основе класса "ListenerHandler" 
создаем еще один класс "Cat", на основе которого можно будет создавать котов.*/
    constructor() { /*Создаем конструктор в классе "Cat".*/
        super(); /*Ключевое слово super используется для вызова функций, 
        принадлежащих родителю объекта.*/

        setTimeout(() => {
            this._triggerEvent('eat', { t: 38, currentTarget: this });
        }, 3000); /*Через три секунды указываем, что кот хочет есть
        и вызываем из родительского класса "ListenerHandler" метод 
        "_triggerEvent()", чтобы затриггерить событие "eat", то есть 
        желание кота поесть, чтобы уведомить об этом событии слушателей.
        Также вторым параметром передаем объект, который содержит 
        информацию о текущей температуре коты и сам объект кота (свойство 
        "currentTarget: this").*/
    };
};

var cat1 = new Cat(); /*Создали объект "cat1" на основе класса "Cat".*/

cat1.addYourEventListener('eat', (event) => {
    console.log('---------------------------------------------');
    console.log('Cat wants to eat btw');
    console.log(`Cat's temperature is ` + event.t);

    console.log(`"console.log(event);" shows:`);
    console.log(event);

    console.log(`"console.log(event.currentTarget);" shows:`);
    console.log(event.currentTarget);

    console.log('Object of our cat is: ' + event.currentTarget);
}); /*Подписываем слушателя на событие "eat", то на событие, когда кот
захочет есть. В качестве слушателя здесь выступает стрелочная функция.*/

/*---------------------------------------------------------------------------*/

class TurboCar extends Car { /*Здесь на основе класса "Car" создали класс
"TurboCar" и переопределили в нем метод "_stop()".*/
    _stop() {
        console.log('---------------------------------------------');
        console.log('I never stop');
    };
};