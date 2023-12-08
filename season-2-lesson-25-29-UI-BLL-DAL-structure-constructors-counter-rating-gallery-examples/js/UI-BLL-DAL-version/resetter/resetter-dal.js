/*Конструктор, который позволяет создавать DAL уровень виджета, который может сбрасывать данные виджетов в "local
storage".*/
function ResetterDAL() {
    /*Метод, который позволяет сбросить значение счетчика в "local storage". В качестве параметра принимает имя ключа,
    под которым хранится значение счетчика.*/
    this.resetCounterValueInLocalStorage = function (keyName) {
        localStorage.setItem(keyName, 0);
    };

    /*Метод, который позволяет сбросить значение рейтинга в "local storage". В качестве параметра принимает имя ключа,
    под которым хранится значение рейтинга.*/
    this.resetRatingValueInLocalStorage = function (keyName) {
        localStorage.setItem(keyName, 0);
    };

    /*Метод, который позволяет сбросить данные галлереи в "local storage". В качестве параметра принимает имя ключа, под
    которым хранятся данные галлереи.*/
    this.resetPhotosURLInLocalStorage = function (keyName) {
        localStorage.setItem(keyName, JSON.stringify([]));
    };
};