/*Конструктор, который позволяет создавать BLL уровень виджетов рейтинга.*/
function RatingBLL() {
    /*Создаем DAL уровень виджета рейтинга.*/
    this._ratingDAL = new RatingDAL();

    /*Значение рейтинга на уровне BLL.*/
    this._ratingValue = 0;

    /*Метод, который позволяет установить значение рейтинга на уровне BLL,
    получив его с уровня UI, и отправить его на уровень DAL. В качестве 
    параметров принимает имя ключа, под которым нужно сохранить значение 
    рейтинга в "local storage", и само значение рейтинга.*/
    this.setRatingValue = function (keyName, ratingValue) {
        this._ratingValue = ratingValue;

        this._ratingDAL.setRatingValueInLocalStorage(keyName, this._ratingValue);
    };

    /*Метод, который позволяет установить значение рейтинга на уровне BLL, 
    запросив его с уровня DAL, и передать его на уровень UI. В качестве 
    параметра принимает имя ключа, под которым хранится значение рейтинга
    в "local storage".*/
    this.restoreRatingValue = function (keyName) {
        this._ratingValue = this._ratingDAL.restoreRatingValueFromLocalStorage(keyName);

        return this._ratingValue;
    };
};