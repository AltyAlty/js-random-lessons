let photoURLInputElement = findPhotoURLInputElement();

let photoContainerElement = findPhotoContainerElement();

let photosURL = [];

bindInputToEnterKeyUpEvent(photoURLInputElement, photoContainerElement, photosURL);

restorePhotosFromLocalStorage(photoContainerElement, photosURL);

/*--------------------------------------------------------------------------------*/

function findPhotoURLInputElement() {
    return document.querySelector('.js-new-photo-url');
};

function findPhotoContainerElement() {
    return document.querySelector('.js-photos');
};

function bindInputToEnterKeyUpEvent(photoURLInput, photoContainer, photos) {
    photoURLInput.addEventListener('keyup', (event) => {
        if (event.code == 'Enter') {
            let photoURL = photoURLInput.value;

            let liElement = document.createElement('li');

            liElement.innerHTML = `<img src='${photoURL}' class='gallery-image' />`;

            photoContainer.append(liElement);

            photos.push(photoURL);

            localStorage.setItem('gallery', JSON.stringify(photos));
        };
    });
};

function restorePhotosFromLocalStorage(photoContainer, photos) {
    let photosStr = localStorage.getItem('gallery');

    if (!!photosStr) {
        let photosParsed = JSON.parse(photosStr);

        photosParsed.forEach((photoURL) => {
            photos.push(photoURL);

            let liElement = document.createElement('li');

            liElement.innerHTML = `<img src='${photoURL}' class='gallery-image' />`;

            photoContainer.append(liElement);
        });
    };
};