/*Конструктор, который позволяет создавать галлереи.*/
function Gallery(HTMLElementClass) {
    /*Создаем UI галлереи.*/
    this._galleryUI = new GalleryUI();

    /*Отрисовываем галлерею на странице.*/
    this._galleryUI.render(HTMLElementClass);
};