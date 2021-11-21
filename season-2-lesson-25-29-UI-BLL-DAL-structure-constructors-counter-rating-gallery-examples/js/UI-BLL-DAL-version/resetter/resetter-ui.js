/*Конструктор, который позволяет создавать UI виджета, который
может сбрасывать данные виджетов в "local storage".*/
function ResetterUI() {
    var that = this;

    /*Создаем BLL уровень виджета.*/
    this._resetterBLL = new ResetterBLL();

    /*Метод, который отрисовывает виджет на странице. В качестве
    параметра принимает класс HTML-элемента, в котором необходимо
    отрисовать этот виджет.*/
    this.render = function (HTMLElementClass) {
        /*Находим HTML-элемент, в котором необходимо отрисовать виджет.*/
        this._element = document.querySelector(HTMLElementClass);

        /*Добавляем HTML-разметку виджета.*/
        this._element.innerHTML += `
            <button class='js-counter-reset'>Reset counter</button>
            <button class='js-rating-reset'>Reset rating</button>
            <button class='js-gallery-reset'>Reset gallery</button>           
        `;

        /*Находим кнопки, которые должны сбрасывать данные виджетов в "local storage".*/
        this._counterResetButtonElement = document.querySelector('.js-counter-reset');
        this._ratingResetButtonElement = document.querySelector('.js-rating-reset');
        this._galleryResetButtonElement = document.querySelector('.js-gallery-reset');

        /*Подписываем на событие "click" кнопку, которая сбрасывает данные счетчика в
        "local storage".*/
        this._counterResetButtonElement.addEventListener('click', () => {
            /*Сообщаем на уровень BLL, что сбрасываем значение счетчика.*/
            that._resetterBLL.resetCounterValue('counter-value');
        });

        /*Подписываем на событие "click" кнопку, которая сбрасывает данные рейтинга в
        "local storage".*/
        this._ratingResetButtonElement.addEventListener('click', () => {
            /*Сообщаем на уровень BLL, что сбрасываем значение рейтинга.*/
            that._resetterBLL.resetRatingValue('rating-value');
        });

        /*Подписываем на событие "click" кнопку, которая сбрасывает данные галлереи в
        "local storage".*/
        this._galleryResetButtonElement.addEventListener('click', () => {
            /*Сообщаем на уровень BLL, что сбрасываем данные галлереи.*/
            that._resetterBLL.resetPhotosURL('gallery');
        });
    };
};