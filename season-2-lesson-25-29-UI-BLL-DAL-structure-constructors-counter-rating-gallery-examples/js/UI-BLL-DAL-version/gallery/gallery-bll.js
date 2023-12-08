/*Конструктор, который позволяет создавать BLL уровень галлерей.*/
function GalleryBLL() {
    /*Создаем DAL уровень галлереи.*/
    this._galleryDAL = new GalleryDAL();

    /*Массив для хранения URL изображений на уровне BLL.*/
    this._photosURL = [];

    /*Метод, который позволяет установить массив URL изображений на уровне BLL, получив его с уровня UI, и отправить его
    на уровень DAL. В качестве параметров принимает имя ключа, под которым нужно сохранить массив URL изображений в
    "local storage", и сам такой массив.*/
    this.setPhotosURL = function (keyName, photosURL) {
        this._photosURL = photosURL;

        this._galleryDAL.setPhotosURLInLocalStorage(keyName, JSON.stringify(this._photosURL));
    };

    /*Метод, который позволяет установить массив URL изображений на уровне BLL, запросив его с уровня DAL, и передать
    его на уровень UI. В качестве параметра принимает имя ключа, под которым хранится массив URL изображений в "local
    storage".*/
    this.restorePhotosURL = function (keyName) {
        this._photosURL = JSON.parse(this._galleryDAL.restorePhotosURLFromLocalStorage(keyName));

        return this._photosURL;
    };
};