/*Конструктор, который позволяет создавать DAL уровень счетчиков.*/
function CounterDAL() {
    /*Метод, который позволяет сохранять значение счетчика в "local storage",
    получив его с уровня BLL. В качестве параметров принимает имя ключа, под 
    которым нужно сохранить значение счетчика, и само значение счетчика.*/
    this.setCounterValueInLocalStorage = function (keyName, counterValue) {
        localStorage.setItem(keyName, counterValue);
    };

    /*Метод, который позволяет получить значение счетчика из "local storage", 
    и передать его на уровень BLL. В качестве параметра принимает имя ключа, 
    под которым хранится значение счетчика в "local storage".*/
    this.restoreCounterValueFromLocalStorage = function (keyName) {
        let counterValueFromLocalStorage = localStorage.getItem(keyName) || 0;

        return counterValueFromLocalStorage;
    };
};