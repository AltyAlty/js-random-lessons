/*Функция по созданию машины.*/
function initializeCar(carID) {
    /*Создаем функцию, которая будет отрисовывать HTML-разметку для каждой машины.*/
    function renderCar() {
        var car = document.getElementById(carID); /*Находим элемент с указаным идентификатором 
        в HTML-разметке.*/

        /*Добавляем в "innerHTML" найденного элемента HTML-разметку для машины.*/
        car.innerHTML = `
        <div class = 'car'>
            <div class='info'>
                <label>Status: </label> <span data-role='car-status'>off</span>
            </div>

            <div class='controls'>
                <input data-role='start-car' value='Start' type='button'>

                <hr>

                <label>Gear box: </label> <span data-role='gear-box-value'>N</span>
            </div>
        </div>`
    };

    /*Вызываем функцию, которая будет отрисовывать HTML-разметку для каждой машины.*/
    renderCar();

    /*--------------------------------------------------------------------------------------*/

    var startCarID = "[data-role='start-car']";
    var carStatusID = "[data-role='car-status']";
    var gearBoxValueID = "[data-role='gear-box-value']";

    var startCarElements = document.getElementById(carID).querySelectorAll(startCarID); /*Кнопки запуска машин.*/
    var carStatusElements = document.getElementById(carID).querySelectorAll(carStatusID); /*Статусы машины.*/
    var gearBoxValueElements = document.getElementById(carID).querySelectorAll(gearBoxValueID); /*Коробки передач машин.*/

    var gearBoxInterval; /*Специальная переменная, которая будет хранить функцию "setInterval()".*/

    /*--------------------------------------------------------------------------------------*/

    /*Функция, которая будет вызываться при попытке завести каждую нашу машину.*/
    function carStartListener() {
        var randomNumber = Math.random(); /*Получаем псевдо-случайное число между 0 и 1.*/

        /*Если наше псевдо-случайно число "randomNumber" больше 0,5, то машина заводится,
        если меньше 0,5, то машина не заводится.*/
        if (randomNumber > 0.5) {
            startCar();
        } else {
            failToStartCar()
        };
    };

    /*--------------------------------------------------------------------------------------*/

    /*Функция, которая вызывается, чтобы показать, что машина завелась.*/
    function startCar() {
        showCarStatus('Car has started'); /*Это выведется первым.*/
        
        /*Функция, которая будет вызываться, чтобы скрыть кнопку старта машины. Здесь мы при 
        помощи нашей вспомогательной функции "processElementsInArray" для всех элементов массива 
        "startCarElements" добавляем класс "hide".*/
        processElementsInArray(startCarElements, function (arrayElement) {
            arrayElement.classList.add('hide');
        });
        
        startGearBox(); /*Включаем коробку передач.*/

        initializeEngineBreakdown(); /*Ломаем двигатель*/
    };

    /*Функция, которая вызывается, чтобы включить коробку передача после того, как машина
    завелась.*/
    function startGearBox() {
        var currentGearBoxValue = 1; /*Указываем начальное значение коробки передач.*/

        /*Функция, которая будет вызываться, чтобы указать начальное значение коробки 
        передач для каждой машины. Здесь мы при помощи нашей вспомогательной функции 
        "processElementsInArray" для всех элементов массива "gearBoxValueElements" 
        указываем "innerHTML".*/
        processElementsInArray(gearBoxValueElements, function (arrayElement) {
            arrayElement.innerHTML = currentGearBoxValue;
        });

        /*Создаем специальную функцию, которая будет увеличивать значение коробки
        передач.*/
        function increasGearBoxValue() {
            if (currentGearBoxValue < 5) { /*Увеличиваем на 1 значение коробки передач
                до тех пор, пока оно не станет 5.*/
                currentGearBoxValue++;

                /*Функция, которая будет вызываться, чтобы указать увеличенное на 1 
                значение коробки передач для каждой машины. Здесь мы при помощи нашей 
                вспомогательной функции "processElementsInArray" для всех элементов 
                массива "gearBoxValueElements" указываем "innerHTML".*/
                processElementsInArray(gearBoxValueElements, function (arrayElement) {
                    arrayElement.innerHTML = currentGearBoxValue;
                });
            };
        };

        /*Вызываем каждую секунду после запуска автомобиля нашу функцию "increasGearBoxValue".
        Сохранили в переменную "gearBoxInterval" эту функцию "setInterval()", чтобы можно было 
        ее выключить в любой момент.*/
        gearBoxInterval = window.setInterval(increasGearBoxValue, 1000);
    };

    /*Функция, которая вызывается, чтобы сломать двигатель машины.*/
    function initializeEngineBreakdown() {
        /*Создаем функция, которая непосредственно будет ломать двигатель.*/
        function breakEngine() {
            showCarStatus('Engine has broken'); /*Это выведется третьим.*/

            /*Функция, которая будет вызываться, чтобы показать кнопку старта машины. Здесь мы 
            при помощи нашей вспомогательной функции "processElementsInArray" для всех элементов 
            массива "startCarElements" убираем класс "hide".*/
            processElementsInArray(startCarElements, function (arrayElement) {
                arrayElement.classList.remove('hide');
            });

            /*Очищаем наш "gearBoxInterval", чтобы значение коробки передач перестало 
            увеличиваться.*/
            window.clearInterval(gearBoxInterval);

            /*Функция, которая будет вызываться, чтобы сбросить на "N" значение коробки передач 
            для каждой машины. Здесь мы при помощи нашей вспомогательной функции 
            "processElementsInArray" для всех элементов массива "gearBoxValueElements" указываем 
            "innerHTML".*/
            processElementsInArray(gearBoxValueElements, function (arrayElement) {
                arrayElement.innerHTML = 'N';
            });
        };

        /*Указываем, чтобы двигатель машины сломался через 2 секунды после того, как она завелась.*/
        window.setTimeout(breakEngine, 2000);

        showCarStatus('Engine breakdown in 2.. 1..'); /*Это выведется вторым.*/
    };

    /*--------------------------------------------------------------------------------------*/

    /*Функция, которая вызывается, чтобы показать, что машина не завелась.*/
    function failToStartCar() {
        showCarStatus('Car has not started');
    };

    /*--------------------------------------------------------------------------------------*/

    /*Функция, которая будет вызываться, чтобы показать статус каждой нашей машины. Здесь мы
    при помощи нашей вспомогательной функции "processElementsInArray" для всех элементов массива 
    "carStatusElements" указываем "innerHTML".*/
    function showCarStatus(status) {
        processElementsInArray(carStatusElements, function (arrayElement) {
            arrayElement.innerHTML = status;
        });
    };

    /*--------------------------------------------------------------------------------------*/

    /*Написали вспомогательную функцию, которая будет пробегаться по элементам любого массива 
    и применять к каждому элементу какую-то функцию, которую мы укажем вторым параметром.*/
    function processElementsInArray(array, process) { 
        for (var i = 0; i < array.length; i++) {
            var arrayElement = array[i];
            process(arrayElement);
        };
    };

    /*--------------------------------------------------------------------------------------*/

    /*При помощи нашей вспомогательной функции "processElementsInArray" подписываем на событие 
    "click" все элементы массива "startCarElements", то есть каждую машину теперь можно попытаться
    завести.*/
    processElementsInArray(startCarElements, function (arrayElement) {
        arrayElement.addEventListener('click', carStartListener);
    });
};