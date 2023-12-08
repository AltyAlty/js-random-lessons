/*Конструктор, который позволяет создавать BLL уровень виджета, который может сбрасывать данные виджетов в
"local storage".*/
function ResetterBLL() {
    /*Создаем DAL уровень виджета.*/
    this._resetterDAL = new ResetterDAL();

    /*Метод, который сообщает уровню DAL, что необходимо сбросить значение счетчика в "local storage". В качестве
    параметра принимает имя ключа, под которым хранится значение счетчика.*/
    this.resetCounterValue = function (keyName) {
        this._resetterDAL.resetCounterValueInLocalStorage(keyName);
    };

    /*Метод, который сообщает уровню DAL, что необходимо сбросить значение рейтинга в "local storage". В качестве
    параметра принимает имя ключа, под которым хранится значение рейтинга.*/
    this.resetRatingValue = function (keyName) {
        this._resetterDAL.resetRatingValueInLocalStorage(keyName);
    };

    /*Метод, который сообщает уровню DAL, что необходимо сбросить данные галлереи в "local storage". В качестве
    параметра принимает имя ключа, под которым хранятся данные галлереи.*/
    this.resetPhotosURL = function (keyName) {
        this._resetterDAL.resetPhotosURLInLocalStorage(keyName);
    };
};