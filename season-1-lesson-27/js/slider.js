function Slider() { /*Теперь создали конструктор для создания объектов, 
    необходимых для работы слайдеров.*/
    this.buttonPrevClass = '.button-prev';
    this.imageClass = '.image';
    this.buttonNextClass = '.button-next';

    this.wholeSlider = null;
    this.buttonPrev = null;
    this.image = null;
    this.buttonNext = null;

    this.getWholeSlider = function (sliderElementClass) {
        this.wholeSlider = document.querySelector(sliderElementClass);
    };

    this.getButtonPrev = function () {
        var that = this;
        this.buttonPrev = this.wholeSlider.querySelector(that.buttonPrevClass);
    };

    this.getImage = function () {
        var that = this;
        this.image = this.wholeSlider.querySelector(that.imageClass);
    };

    this.getButtonNext = function () {
        var that = this;
        this.buttonNext = this.wholeSlider.querySelector(that.buttonNextClass);
    };

    this.imageArray = ['src/1small.png', 'src/2small.png', 'src/3small.png'];

    this.currentImageID = 0;

    this.setImageSRC = function () {
        this.image.setAttribute('src', this.imageArray[this.currentImageID]);
    };

    this.showPrevImage = function (event) {
        if (this.currentImageID >= 1) {
            this.currentImageID--;
            this.setImageSRC();
        } else {
            this.currentImageID = this.imageArray.length - 1;
            this.setImageSRC();
        };
    };

    this.showNextImage = function (event) {
        if (this.currentImageID <= this.imageArray.length - 2) {
            this.currentImageID++;
            this.setImageSRC();
        } else {
            this.currentImageID = 0;
            this.setImageSRC();
        };
    };

    this.initialize = function (sliderElementClass) {
        var that = this;

        this.getWholeSlider(sliderElementClass);
        this.getButtonPrev();
        this.getImage();
        this.getButtonNext();

        this.setImageSRC();

        this.buttonPrev.addEventListener('click', function (event) {
            that.showPrevImage(event);
        });
        this.buttonNext.addEventListener('click', function (event) {
            that.showNextImage(event);
        });
    };
};