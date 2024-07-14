/*Конструктор, который позволяет создавать счетчики.*/
function Counter(HTMLElementClass) {
    /*Создаем UI счетчика.*/
    this._counterUI = new CounterUI();

    /*Отрисовываем счетчик на странице.*/
    this._counterUI.render(HTMLElementClass);
};