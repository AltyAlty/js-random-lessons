/*Создаем конструктор, на основе, которого можно будет создавать объекты,
содержащие информацию о машине.*/
function Car(carID) {
    this.carID = carID; /*Свойство, хранящее идентификатор машины.*/

    this._engine = new Engine(); /*На основе конструктора "Engine" создаем объект "_engine".*/
    this._gearBox = new GearBox(this.carID); /*На основе конструктора "GearBox" создаем 
    объект "_gearBox". Передаем внутрь этого объекта идентификатор машины.*/
    this._infoBot = new InfoBot(); /*На основе конструктора "InfoBot" создаем объект "_infoBot".*/
    this._carView = new CarView(); /*На основе конструктора "CarView" создаем объект "_carView".*/

    var that = this; /*Сохраняем отдельно текущий контекст "this".*/

    this._carView.addCarEventListener('start', function () {
        that.tryToStart();
    }); /*Вызываем метод "addCarEventListener" у объекта "_carView" и отдаем в этот метод два параметра.
    Первый параметр означает событие попытки запуска машины, а второй параметр является анонимной 
    функцией, которая должна вызываться при попытке запуска машины. В этой анонимной функции внутри 
    вызывается метод "tryToStart()" из прототипа конструктора "Car", который имитирует попытку запуска 
    машины. Причем этот метод вызывается через сохраненный выше контекст "this", то есть контекст объекта, 
    созданного на основе конструктора "Car". Вызов метода "addCarEventListener()" добавит эту анонимную 
    функцию, содержащую метод "tryToStart()", в массив "_carCallbacks" у объекта "_carView". Далее
    ниже вызывается метод "render()" у объекта "_carView", который отрисовывает HTML-разметку машины и
    в том числе подписывает на событие "click" кнопку запуска машины. При этом событии будет вызываться
    метод "_carStartListener()" объекта "_carView", который в свою очередь будет вызывать каждую функцию 
    из массива "_carCallbacks" у объекта "_carView", то есть наш метод "tryToStart()", то есть в итоге
    при нажатии на кнопку запуска машина будет попытка завести эту машину.*/

    this._carView.render(carID); /*Вызываем метода "render()" у объекта "_carView" и передаем в него
    идентификатор машины, чтобы отрисовать HTML-разметку для этой машины.*/
};

/*Добавляем в прототип конструктора "Car" метод, который при вызове будет пытаться завести машину.*/
Car.prototype = {
    tryToStart: function () {
        var that = this; /*Сохраняем отдельно текущий контекст "this".*/

        var startResult = this._engine.tryToStartEngine(); /*Вызываем метод "tryToStartEngine()" у 
        объекта "_engine". Этот метод пытается завести двигатель машины. То, что вернет этот метод 
        сохраняем в переменную "startResult". Если вернется "true", значит двигатель завелся, если 
        вернется "false", значит двигатель не завелся.*/

        if (startResult === true) { /*Если двигатель завелся, то делаем следующее.*/
            this._infoBot.log(this.carID + ' has started'); /*Вызывем метод "log()" у объекта "_infoBot", 
            чтобы вывести в консоль информацию о том, что машина была заведена.*/

            this._carView.showStatus('Car has started'); /*Вызывем метод "showStatus()" у объекта 
            "_carView", чтобы вывести в HTML-разметке информацию о том, что машина была заведена.*/

            this._gearBox.startGearBox(); /*Вызывем метод "startGearBox()" у объекта "_gearBox", чтобы 
            запустить коробку передач и увеличивать постепенно ее значение.*/

            this._carView.showGearBox(this._gearBox.currentGearBoxValue); /*Вызывем метод "showGearBox()" 
            у объекта "_carView", чтобы вывести в консоль первое актуальное значение коробки передач 
            после запуска машины.*/

            var showingGearBoxInterval = window.setInterval(function () {
                that._carView.showGearBox(that._gearBox.currentGearBoxValue);
            }, 1000); /*Вызываем функцию "setInterval()", которая каждую секунду будет вызывать
            метод "showGearBox()" у объекта "_carView", чтобы отображать каждую секунду актуальное 
            значение коробки передач в HTML-разметке. Причем этот метод вызывается через сохраненный 
            выше контекст "this", то есть контекст объекта, созданного на основе конструктора "Car". Также 
            в этот метод мы отдаем свойство "currentGearBoxValue" объекта "_gearBox", которое содержит 
            актуальное значение коробки передач. Это свойство также передается внутрь через сохраненный 
            выше контекст "this". Также сохраняем в переменную "showingGearBoxInterval" эту функцию 
            "setInterval()", чтобы можно было ее выключить в нужный для нас момент.*/

            this._carView.hideStartCarButton(true); /*Вызывем метод "hideStartCarButton()" у объекта 
            "_carView", чтобы после того, как машина была заведена отключить кнопку запуска машины. Это 
            нужно, чтобы избежать многократного запуска одной и той же машины, когда она уже была заведена.*/

            this._carView.hideStartAllCarsButton(true); /*Вызывем метод "hideStartAllCarsButton()" у объекта 
            "_carView", чтобы после того, как машина была заведена отключить кнопку запуска всех машин сразу. 
            Это нужно, чтобы избежать многократного запуска одной и той же машины, когда она уже была 
            заведена.*/

            window.setTimeout(function () { /*Вызываем функцию "setTimeout()", которая сработает через 3 секунды 
            после запуска машины. Внутри происходит следующее.*/
                that._carView.hideStartCarButton(false); /*Сначала вызывается метод "hideStartCarButton()" 
                объекта "_carView", чтобы включить обратно кнопку запуска машины. Причем этот метод вызывается 
                через сохраненный выше контекст "this", то есть контекст объекта, созданного на основе 
                конструктора "Car".*/

                that._carView.hideStartAllCarsButton(false); /*Далее вызывается метод "hideStartAllCarsButton()" 
                объекта "_carView", чтобы включить обратно кнопку запуска всех машин сразу. Причем этот метод 
                вызывается через сохраненный выше контекст "this", то есть контекст объекта, созданного на 
                основе конструктора "Car".*/

                that._carView.showGearBox(
                    that._gearBox.resetGearBox(
                        that._engine.initializeEngineBreakdown()
                    )
                ); /*Затем вызвается метод "showGearBox()" объекта "_carView", чтобы отобразить актуальное
                значение коробки передач. Внутри этого метода мы передаем метод "resetGearBox()" объекта
                "_gearBox", чтобы сбросить значение коробки передач на "N" и вернуть это значение для его
                отображения. А внутрь этого второго метода "resetGearBox()" мы передаем метод 
                "initializeEngineBreakdown()" объекта "_engine", чтобы сломать двигатель машины. Этот метод 
                вернет "true", чтобы метод "resetGearBox()" понял, что двигатель был сломан и теперь можно 
                остановить коробку передач и сбросить ее значение на "N". Причем все эти методы вызываются 
                через сохраненный выше контекст "this", то есть контекст объекта, созданного на основе 
                конструктора "Car".*/

                that._carView.showStatus('Engine has broken'); /*Вызывем метод "showStatus()" у объекта 
                "_carView", чтобы вывести в HTML-разметке информацию о том, что двигатель машины был сломан. 
                Причем этот метод вызывается через сохраненный выше контекст "this", то есть контекст объекта, 
                созданного на основе конструктора "Car".*/

                window.clearInterval(showingGearBoxInterval); /*При помощи функции "clearInterval()" очищаем 
                переменную "showingGearBoxInterval", чтобы значение коробки передач перестало обновляться и 
                отображать каждую секунду свое значение в HTML-разметке.*/
            }, 3000);
        } else { /*Если же двигатель не завелся, то делаем следующее.*/
            this._infoBot.log(this.carID + ' has not started'); /*Вызывем метод "log()" у объекта "_infoBot", 
            чтобы вывести в консоль информацию о том, что машина не была заведена.*/

            this._carView.showStatus('Car has not started'); /*Вызывем метод "showStatus()" у объекта 
            "_carView", чтобы вывести в HTML-разметке информацию о том, что машина не была заведена.*/
        };
    }
};