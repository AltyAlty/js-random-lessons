/*Создаем конструктор, на основе, которого можно будет создавать объекты, которые будут выполнять роль отрисовки и
изменения HTML-разметки автомобиля.*/
function CarView() {
    this._carCallbacks = []; /*Специальное свойство, которое будет хранить callback-функции, которые будет передаваться
    сюда от объектов, созданных на основе конструктора "Car". Эти объекты будут передавать сюда свой метод
    "tryToStart()", который будет срабатывать при нажатии на кнопку запуска машины. От каждой машины будет приходить
    только один такой метод и будет создаваться только одна кнопка для каждой машины. Соответственно каждый объект,
    созданный на основе конструктора "CarView" будет содержать в массиве "_carCallbacks" только одну callback-функцию,
    которая запускает только какую-то одну машину. Хотя мы можем добавлять от каждой машины, если нам это понадобится в
    будущем, еще callback-функции, поскольку здесь мы используем массив, то есть можем хранить больше, чем один
    элемент.*/
};

/*Добавляем в прототип конструктора "CarView" методы.*/
CarView.prototype = {
    _processElementsInArray: function (array, process) { /*Создаем вспомогательный метод, который будет
    пробегаться по элементам любого массива и применять к каждому элементу какую-то функцию, которую мы укажем вторым
    параметром в этом методе.*/
        for (var i = 0; i < array.length; i++) {
            var arrayElement = array[i];
            process.apply(this, [arrayElement]); /*Здесь мы используем метод "apply()", который принимает два параметра.
            Первый параметр это контекст, в котором мы хотим, чтобы вызвалась какая-то функция. Вторым параметром должен
            быть всегда массив элементов, к которым мы хотим, чтобы какая-то функция была применена. Нам нужен здесь
            этот метод, чтобы не терялся контект "this".*/
        };
    },

    addCarEventListener: function (eventName, carListener) { /*Этот метод будет вызываться при каждом создании
    объекта на основе конструктора "Car". В этот метод будет передаваться тип события и callback-функция, которая должна
    будет срабатывать при таком событии. Объект на основе конструктора "Car" будет отдавать сюда свой метод
    "tryToStart()" и событие "start", обозначающее запуск машины. Этот метод "tryToStart()" будет добавляться в массив
    "_carCallbacks", специально предназначенный для таких callback-функций.*/
        if (eventName === 'start') {
            this._carCallbacks.push(carListener);
        };
    },

    _carStartListener: function () { /*Этот метод будет вызываться и пробегаться по всему массиву "_carCallbacks",
    и вызывать каждый элемент из этого массива. Каждый элемент этого массива является callback-функцией.*/
        for (var i = 0; i < this._carCallbacks.length; i++) {
            var callback = this._carCallbacks[i];
            callback();
        };
    },

    render: function (carID) { /*Создаем метод, который при вызове будет отрисовывать HTML-разметку для машины, а
    также подписывать кнопки запуска машины на событие "click", чтобы при клике по этим кнопка пытались заводиться
    машины. Этот метод в качестве параметра получает идентификатор машины.*/
        var car = document.getElementById(carID); /*Находим элемент с указаным идентификатором в 
        HTML-разметке.*/

        /*Добавляем в "innerHTML" найденного элемента HTML-разметку для машины.*/
        car.innerHTML = `
        <div class = 'car'>
            <span>${carID}</span>
        
            <div class='info'>
                <label>Status: </label> <span data-role='car-status'>Off</span>
            </div>

            <div class='controls'>
                <input data-role='start-car' value='Start' type='button'>

                <hr>

                <label>Gear box: </label> <span data-role='gear-box-value'>N</span>
            </div>
        </div>
        `;

        this._startCarID = "[data-role='start-car']";
        this._carStatusID = "[data-role='car-status']";
        this._gearBoxValueID = "[data-role='gear-box-value']";

        /*Кнопки запуска машин.*/
        this._startCarElements = document.getElementById(carID).querySelectorAll(this._startCarID);
        /*Статусы машины.*/
        this._carStatusElements = document.getElementById(carID).querySelectorAll(this._carStatusID);
        /*Коробки передач машин.*/
        this._gearBoxValueElements = document.getElementById(carID).querySelectorAll(this._gearBoxValueID);

        var that = this; /*Сохраняем отдельно текущий контекст "this".*/

        this._processElementsInArray(this._startCarElements, function (arrayElement) {
            arrayElement.addEventListener('click', function () {
                that._carStartListener();
            });
        }); /*При помощи нашего вспомогательного метода "processElementsInArray()" мы берем массив "_startCarElements" с
        кнопкой запуска машины и отпраляем каждый элемент этого массива в анонимную функцию, внутри которой мы
        подписываем на событие "click" этот каждый элемент этого массива, а он там будет всего один, то есть в итоге мы
        подписываем одну кнопку запуска машины на событие "click", при котором будет запускаться еще одна анонимная
        функция, внутри которой будет запускаться метод "_carStartListener()", который в свою очередь будет пробегаться
        по всему массиву "_carCallbacks", и вызывать каждый элемент из этого массива, а каждый элемент из этого массива
        был добавлен при помощи метода "addCarEventListener()", который в свою очередь был вызван в объекте, созданном
        на основе конструктора "Car", и в этот метод был добавлен метод "tryToStart()" этого объекта, созданного на
        основе конструктора "Car", а этот метод пытается запускать машину. Нужно отметить, что метод
        "_carStartListener()" вызывается через сохраненный выше контекст "this", то есть контекст объекта, созданного на
        основе конструктора "CarView". Теперь при нажатии на кнопку запуска машины, мы попытаемся завести эту машину.*/

        this._startAllCarsID = 'start-all-cars';
        this._startAllCarsElement = document.getElementById(this._startAllCarsID); /*Кнопка запуска сразу 
        всех машин.*/

        this._startAllCarsElement.addEventListener('click', function () { /*Подписываем нашу кнопку
        запуска сразу всех машин на событие "click". При срабатывании этого события будет следующее.*/
            that._carStartListener(); /*Вызываем метод "_carStartListener()", который в свою очередь вызывает метод
            "tryToStart()" у объекта, созданного на основе конструктора "Car". Но поскольку эта кнопка всего одна на
            странице, то получится, что каждый объект, созданный на основе конструктора "CarView", подпишет ее своим
            вариантом метода "tryToStart()". То есть в итоге будет попытка завести каждую машину. Причем этот метод
            "_carStartListener()" вызывается через сохраненный выше контекст "this", то есть контекст объекта,
            созданного на основе конструктора "CarView".*/

            that.hideStartAllCarsButton(true); /*Вызывем метод "hideStartAllCarsButton()", чтобы после того,
            как попробуем завести каждую машину, отключить кнопку запуска всех машин сразу. Это нужно, чтобы избежать
            многократного запуска одной и той же машины. Причем этот метод "hideStartAllCarsButton()" вызывается через
            сохраненный выше контекст "this", то есть контекст объекта, созданного на основе конструктора "CarView".*/

            that.hideStartCarButton(true); /*Вызывем метод "hideStartCarButton()", чтобы после того, как
            попробуем завести каждую машину, отключить кнопку запуска у каждой машины отдельно. Это нужно, чтобы
            избежать многократного запуска одной и той же машины. Причем этот метод "hideStartCarButton()" вызывается
            через сохраненный выше контекст "this", то есть контекст объекта, созданного на основе конструктора
            "CarView". Хоть и кнопка запуска всех машин всего одна в HTML-разметке, каждый объект, созданный на основе
            конструктора "CarView", подпишет эту кнопку на свой вариант метода "hideStartCarButton()", что в итоге
            позволит нам отключить сразу все кнопки запуска машин.*/

            window.setTimeout(function () {
                that.hideStartAllCarsButton(false);
                that.hideStartCarButton(false);
            }, 3000); /*Вызываем функцию "setTimeout()", которая сработает через 3 секунды после попытки запуска
            всех машин. Через 3 секунды вызывем метод "hideStartAllCarsButton()", чтобы обратно включить кнопку запуска
            всех машин сразу. Также через 3 секунды вызывем метод "hideStartCarButton()", чтобы обратно включить кнопку
            запуска у каждой машины. Хоть и кнопка запуска всех машин всего одна в HTML-разметке, каждый объект,
            созданный на основе конструктора "CarView", подпишет эту кнопку на свой вариант метода
            "hideStartCarButton()", что в итоге позволит нам включить сразу все кнопки запуска машин. Причем эти методы
            "hideStartAllCarsButton()" и "hideStartCarButton()" вызываются через сохраненный выше контекст "this", то
            есть контекст объекта, созданного на основе конструктора "CarView".*/
        });
    },

    showStatus: function (status) { /*Метод, который при вызове будет показывать статус машины. Здесь мы при
    помощи нашего вспомогательного метода "processElementsInArray()" для всех элементов массива "_carStatusElements"
    указываем "innerHTML".*/
        this._processElementsInArray(this._carStatusElements, function (arrayElement) {
            arrayElement.innerHTML = status;
        });
    },

    showGearBox: function (value) { /*Метод, который при вызове будет показывать текущее значение коробки передач
    машины. Здесь мы при помощи нашего вспомогательного метода "processElementsInArray()" для всех элементов массива
    "_gearBoxValueElements" указываем "innerHTML".*/
        this._processElementsInArray(this._gearBoxValueElements, function (arrayElement) {
            arrayElement.innerHTML = value;
        });
    },

    hideStartCarButton: function (isDisabled) { /*Метод, который при вызове будет отключать или включать кнопку
    запуска у какой-либо машины. Здесь мы при помощи нашего вспомогательного метода "processElementsInArray()" для всех
    элементов массива "_startCarElements" указываем свойство "disabled" как "true" или "false" в зависимости от
    переданного параметра.*/
        this._processElementsInArray(this._startCarElements, function (arrayElement) {
            arrayElement.disabled = isDisabled;
        });
    },

    hideStartAllCarsButton: function (isDisabled) { /*Метод, который при вызове будет отключать или включать
    кнопку запуска всех машин сразу. Здесь мы для элемента "_startAllCarsElement" указываем свойство "disabled" как
    "true" или "false" в зависимости от переданного параметра.*/
        this._startAllCarsElement.disabled = isDisabled;
    }
};