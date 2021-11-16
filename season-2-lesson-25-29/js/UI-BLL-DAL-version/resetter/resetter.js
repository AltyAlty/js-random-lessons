/*Конструктор, который позволяет создавать виджет, который
может сбрасывать данные виджетов в "local storage".*/
function Resetter(HTMLElementClass) {
    /*Создаем UI виджета.*/
    this._resetterUI = new ResetterUI();

    /*Отрисовываем виджет на странице.*/
    this._resetterUI.render(HTMLElementClass);
};