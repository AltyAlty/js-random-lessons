/*Конструктор, который позволяет создавать DAL уровень виджетов рейтинга.*/
function RatingDAL() {
    /*Метод, который позволяет сохранять значение рейтинга в "local storage",
    получив его с уровня BLL. В качестве параметров принимает имя ключа, под 
    которым нужно сохранить значение рейтинга, и само значение рейтинга.*/
    this.setRatingValueInLocalStorage = function (keyName, ratingValue) {
        localStorage.setItem(keyName, ratingValue);
    };

    /*Метод, который позволяет получить значение рейтинга из "local storage", 
    и передать его на уровень BLL. В качестве параметра принимает имя ключа, 
    под которым хранится значение рейтинга в "local storage".*/
    this.restoreRatingValueFromLocalStorage = function (keyName) {
        let ratingValueFromLocalStorage = localStorage.getItem(keyName) - 0 || 0;

        return ratingValueFromLocalStorage;
    };
};