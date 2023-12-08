/*Конструктор, который позволяет создавать UI галлерей.*/
function GalleryUI() {
    var that = this;

    /*Создаем BLL уровень галлереи.*/
    this._galleryBLL = new GalleryBLL();

    /*Массив для хранения URL изображений на уровне UI.*/
    this._photosURL = [];

    /*Метод, который отрисовывает галлерею на странице. В качестве параметра принимает класс HTML-элемента, в котором
    необходимо отрисовать галлерею.*/
    this.render = function (HTMLElementClass) {
        /*Находим HTML-элемент, в котором необходимо отрисовать галлерею.*/
        this._element = document.querySelector(HTMLElementClass);

        /*Добавляем HTML-разметку галлереи.*/
        this._element.innerHTML += `
            <div>Photos from your URLs: </div>

            <div>
                <input class='js-new-photo-url'>
            </div>

            <div>
                <ul class='js-photos'></ul>
            </div>            
        `;

        /*Находим HTML-элемент, в который вводятся URL изображений, и HTML-элемент, отображающий изображения.*/
        this._photoURLInputElement = document.querySelector('.js-new-photo-url');
        this._photoContainerElement = document.querySelector('.js-photos');

        /*Востанавливаем из уровня BLL массив с URL изображений. Если восстановили такой массив, то на основе каждого
        URL в этом массив отрисовываем изображения на странице.*/
        this._photosURL = this._galleryBLL.restorePhotosURL('gallery');

        if (!!this._photosURL) {
            this._photosURL.forEach((photoURL) => {
                this._createPhoto(photoURL, this._photoContainerElement);
            });
        } else {
            this._photosURL = [];
        };

        /*Подписываем на событие отжатой клавиши "Enter" HTML-элемент, в который вводятся URL изображений.*/
        this._photoURLInputElement.addEventListener('keyup', (event) => {
            if (event.code == 'Enter') {
                /*Получаем введенный URL изображения.*/
                let photoURL = that._photoURLInputElement.value;

                /*На основе полученного URL изображения, добавляем на страницу это изображений.*/
                that._createPhoto(photoURL, that._photoContainerElement);

                /*Добавляем полученный URL изображения в массив для таких URL.*/
                that._photosURL.push(photoURL);

                /*Сохраняем на уровень BLL массив со всеми URL изображений.*/
                that._galleryBLL.setPhotosURL('gallery', that._photosURL);
            };
        });
    };

    /*Вспомогательный метод, который добавляет изображения на страницу. В качестве параметров получает URL изображения и
    HTML-элемент, в котором нужно отобразить это изображений.*/
    this._createPhoto = function (photoURL, photoContainerElement) {
        /*Создаем HTML-элемент "li".*/
        let liElement = document.createElement('li');

        /*Добавляем в созданный HTML-элемент "li" разметку, отображающую изображение.*/
        liElement.innerHTML = `<img src='${photoURL}' class='gallery-image' />`;

        /*Добавляем на страницу итоговый HTML-элемент "li", содержащий изображение.*/
        photoContainerElement.append(liElement);
    };
};