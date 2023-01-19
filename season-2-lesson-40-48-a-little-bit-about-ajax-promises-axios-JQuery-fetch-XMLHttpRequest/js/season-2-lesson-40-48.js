const imageIdInputElement = document.querySelector('.image-id-input');
const getImageButtonElement = document.querySelector('.get-image-button');
const imagesDivElement = document.querySelector('.images-div');

function createImage(imageData) {
    const tempImgElement = document.createElement('img');

    tempImgElement.src = imageData.url;

    imagesDivElement.appendChild(tempImgElement);
};

getImageButtonElement.addEventListener('click', () => {
    const promise = getImageDataWithAxios(imageIdInputElement.value);

    promise.then(createImage);
});