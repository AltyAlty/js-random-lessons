/*Конструктор, который позволяет создавать виджеты рейтинга.*/
function Rating(HTMLElementClass) {
    /*Создаем UI виджета рейтинга.*/
    this._ratingUI = new RatingUI();

    /*Отрисовываем виджет рейтинга на странице.*/
    this._ratingUI.render(HTMLElementClass);
};