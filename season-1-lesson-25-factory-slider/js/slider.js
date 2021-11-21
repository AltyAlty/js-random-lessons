var sliderFactory = {
    createSlider: function () {
        var newSlider = {
            buttonPrevClass: '.button-prev',
            imageClass: '.image',
            buttonNextClass: '.button-next',

            wholeSlider: null,
            buttonPrev: null,
            image: null,
            buttonNext: null,

            getWholeSlider: function (sliderElementClass) {
                this.wholeSlider = document.querySelector(sliderElementClass); /*Здесь мы вызываем "querySelector()"
                относительно объекта "document".*/
            },

            getButtonPrev: function () {
                var that = this;
                this.buttonPrev = this.wholeSlider.querySelector(that.buttonPrevClass); /*А здесь мы уже вызываем "querySelector()"
                относительно "wholeSlider", чтобы найти только те элементы с классом "button-prev", которые находятся
                внутри этого элемента "wholeSlider".*/
            },

            getImage: function () {
                var that = this;
                this.image = this.wholeSlider.querySelector(that.imageClass);
            },

            getButtonNext: function () {
                var that = this;
                this.buttonNext = this.wholeSlider.querySelector(that.buttonNextClass);
            },

            imageArray: ['src/1small.png', 'src/2small.png', 'src/3small.png'],

            currentImageID: 0,

            setImageSRC: function () {
                this.image.setAttribute('src', this.imageArray[this.currentImageID]);
            },

            showPrevImage: function (event) {
                if (this.currentImageID >= 1) {
                    this.currentImageID--;
                    this.setImageSRC();
                } else {
                    this.currentImageID = this.imageArray.length - 1;
                    this.setImageSRC();
                };
            },

            showNextImage: function (event) {
                if (this.currentImageID <= this.imageArray.length - 2) {
                    this.currentImageID++;
                    this.setImageSRC();
                } else {
                    this.currentImageID = 0;
                    this.setImageSRC();
                };
            },

            initialize: function (sliderElementClass) {
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
            }
        };

        return newSlider; /*В итоге метод возвращает созданный объект.*/
    }
};