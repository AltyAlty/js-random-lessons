/*Конструктор, который позволяет создавать DAL уровень галлерей.*/
function GalleryDAL() {
    /*Метод, который позволяет сохранять массив URL изображений в "local 
    storage", получив этот массив с уровня BLL. В качестве параметров принимает 
    имя ключа, под которым нужно сохранить массив URL изображений, и сам такой 
    массив.*/
    this.setPhotosURLInLocalStorage = function (keyName, photosURL) {
        localStorage.setItem(keyName, photosURL);
    };

    /*Метод, который позволяет получить массив URL изображений из "local storage", 
    и передать его на уровень BLL. В качестве параметра принимает имя ключа, 
    под которым хранится массив URL изображений в "local storage".*/
    this.restorePhotosURLFromLocalStorage = function (keyName) {
        let photosURLStr = localStorage.getItem(keyName);

        return photosURLStr;
    };
};