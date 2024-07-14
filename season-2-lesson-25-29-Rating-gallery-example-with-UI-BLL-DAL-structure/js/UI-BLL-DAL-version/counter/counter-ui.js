/*Конструктор, который позволяет создавать UI счетчиков.*/
function CounterUI() {
    var that = this;

    /*Создаем BLL уровень счетчика.*/
    this._counterBLL = new CounterBLL();

    /*Метод, который отрисовывает счетчик на странице. В качестве параметра принимает класс HTML-элемента, в котором
    необходимо отрисовать счетчик.*/
    this.render = function (HTMLElementClass) {
        /*Находим HTML-элемент, в котором необходимо отрисовать счетчик.*/
        this._element = document.querySelector(HTMLElementClass);

        /*Добавляем HTML-разметку счетчика.*/
        this._element.innerHTML += `
            <div>Click counter:
                <span class='js-counter-value'>0</span>
            </div>
        `;

        /*Находим HTML-элемент, отображающий значение счетчика.*/
        this._counterValueElement = document.querySelector('.js-counter-value');

        /*Восстанавливаем из уровня BLL значение счетчика.*/
        this._counterValueElement.innerHTML = this._counterBLL.restoreCounterValue('counter-value');

        /*Подписываем на событие "click" весь счетчик.*/
        this._element.addEventListener('click', () => {
            /*Получаем текущее значение счетчика.*/
            let currentValue = that._counterValueElement.innerHTML;

            /*Увеличиваем текущее значение счетчика.*/
            currentValue++;

            /*Сохраняем на уровень BLL увеличенное значение счетчика.*/
            that._counterBLL.setCounterValue('counter-value', currentValue);

            /*Обновляем текущее значение счетчика на странице.*/
            that._counterValueElement.innerHTML = currentValue;
        });
    };
};