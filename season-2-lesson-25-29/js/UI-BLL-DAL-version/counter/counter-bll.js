/*Конструктор, который позволяет создавать BLL уровень счетчиков.*/
function CounterBLL() {
    /*Создаем DAL уровень счетчика.*/
    this._counterDAL = new CounterDAL();

    /*Значение счетчика на уровне BLL.*/
    this._counterValue = 0;

    /*Метод, который позволяет установить значение счетчика на уровне BLL,
    получив его с уровня UI, и отправить его на уровень DAL. В качестве 
    параметров принимает имя ключа, под которым нужно сохранить значение 
    счетчика в "local storage", и само значение счетчика.*/
    this.setCounterValue = function (keyName, counterValue) {
        this._counterValue = counterValue;

        this._counterDAL.setCounterValueInLocalStorage(keyName, this._counterValue);
    };

    /*Метод, который позволяет установить значение счетчика на уровне BLL, 
    запросив его с уровня DAL, и передать его на уровень UI. В качестве 
    параметра принимает имя ключа, под которым хранится значение счетчика
    в "local storage".*/
    this.restoreCounterValue = function (keyName) {
        this._counterValue = this._counterDAL.restoreCounterValueFromLocalStorage(keyName);

        return this._counterValue;
    };
};