/*Здесь мы разделили ранее нами созданный слайдер на несколько конструкторов, где каждый конструктор отвечает за один из
уровней среди UI, BLL и DAL.*/

function SliderView() { /*Создаем конструктор, который будет отвечать за уровень UI нашего слайдера.*/
    var that = this; /*Сохраняем отдельно текущий контекст "this".*/

    this._sliderLogic = new SliderLogic(); /*На основе конструктора "SliderLogic" создаем объект "_sliderLogic".*/

    this.buttonPrevClass = '.button-prev'; /*Имя класса кнопки прокрутки изображений назад.*/
    this.imageClass = '.image'; /*Имя класса HTML-элемента "img", который будет отображать изображения в слайдере.*/
    this.buttonNextClass = '.button-next'; /*Имя класса кнопки прокрутки изображений вперед.*/

    this.wholeSlider = null; /*Это свойство будет хранить весь слайдер.*/
    this.buttonPrev = null; /*Это свойство будет хранить кнопку прокрутки изображений назад.*/
    this.image = null; /*Это свойство будет хранить HTML-элемента "img", который будет отображать изображения в
    слайдере.*/
    this.buttonNext = null; /*Это свойство будет хранить кнопку прокрутки изображений назад.*/


    this.getWholeSlider = function (sliderElementClass) {
        this.wholeSlider = document.querySelector(sliderElementClass);
    }; /*Метод, который позволяет получить весь слайдер. Здесь мы вызываем "querySelector()" относительно объекта
    "document".*/

    this.getButtonPrev = function () {
        this.buttonPrev = this.wholeSlider.querySelector(that.buttonPrevClass);
    }; /*Метод, который позволяет получить кнопку прокрутки изображений назад. А здесь мы уже вызываем "querySelector()"
    относительно "wholeSlider", чтобы найти только те элементы с классом "button-prev", которые находятся внутри этого
    элемента "wholeSlider". И также чтобы не потерять контекст вызова "this" из объекта, созданного на основе
    конструктора "SliderView", мы используем сохраненный в переменную "that" контекст этого объекта при указании класса
    кнопки.*/

    this.getImage = function () {
        this.image = this.wholeSlider.querySelector(that.imageClass);
    }; /*Метод, который позволяет получить HTML-элемент "img", который будет отображать изображения в слайдере. Здесь мы
    снова уже вызываем "querySelector()" относительно "wholeSlider", чтобы найти только те элементы с классом "image",
    которые находятся внутри этого элемента "wholeSlider". И также чтобы не потерять контекст вызова "this" из объекта,
    созданного на основе конструктора "SliderView", мы используем сохраненный в переменную "that" контекст этого объекта
    при указании класса HTML-элемента "img".*/

    this.getButtonNext = function () {
        this.buttonNext = this.wholeSlider.querySelector(that.buttonNextClass);
    }; /*Метод, который позволяет получить кнопку прокрутки изображений вперед. Здесь мы уже снова вызываем
    "querySelector()" относительно "wholeSlider", чтобы найти только те элементы с классом "button-next", которые
    находятся внутри этого элемента "wholeSlider". И также чтобы не потерять контекст вызова "this" из объекта,
    созданного на основе конструктора "SliderView", мы используем сохраненный в переменную "that" контекст этого объекта
    при указании класса кнопки.*/

    this.setImageSRC = function () {
        this.image.setAttribute('src', this._sliderLogic.getCurrentImage());
    }; /*Метод, который позволяет указать атрибут "src" для HTML-элемента "img", который будет отображать изображения в
    слайдере. В качестве получения значения для этого атрибута мы вызываем метод "getCurrentImage()" у объекта
    "_sliderLogic". Этот метод занимается логикой по получению адреса текущего изображения для отображения в слайдере.*/

    this.showPrevImage = function (event) {
        if (this._sliderLogic.doWeHavePrevImageToShow()) { /*Вызываем метод "doWeHavePrevImageToShow()" у объекта
        "_sliderLogic", чтобы узнать есть ли у нас еще изображения для прокрутки назад, то есть является ли текущее
        изображение все еще не первым в списке изображений.*/
            this._sliderLogic.decreaseCurrentImageID(); /*И если у нас есть изображения для прокрутки назад, то вызываем
            метод "decreaseCurrentImageID()" у объекта "_sliderLogic", чтобы уменьшить номер текущего изображения для
            отображения, чтобы показать предыдущее изображение.*/
            this.setImageSRC(); /*И поменяв номер текущего изображения для отображения, отрисовываем это изображение.*/
        } else {
            this._sliderLogic.setMaxCurrentImageID(); /*Иначе если у нас больше нет изображений для прокрутки назад, то
            есть мы в данный момент отображаем самое первое изображение в списке, то вызываем метод
            "setMaxCurrentImageID()" у объекта "_sliderLogic", чтобы установить в качестве номера текущего изображения
            для отображения самое последнее изображение в списке, тем самым обеспечивая возможность бесконечно
            прокручивать изображения в слайдере назад.*/
            this.setImageSRC(); /*И поменяв номер текущего изображения для отображения, отрисовываем это изображение.*/
        };
    }; /*Метод, который позволяет прокручивать изображения назад. В качестве параметра здесь нужно указывать объект
    "event" - объект, который будет получен в ходе срабатывания события, на которое будет подписан этот метод, поскольку
    все функции-слушатели возвращают такой объект события. То есть такой параметр "event" надо всегда указывать в
    методах, если мы будем их подписывать на события, на случай если нам надо будет что-то сделать с самим объектом,
    который подписан на событие (например, изменить текст кнопки, на которую нажали, при помощи
    "event.currentTarget.innerText").*/

    this.showNextImage = function (event) {
        if (this._sliderLogic.doWeHaveNextImageToShow()) { /*Вызываем метод "doWeHaveNextImageToShow()" у объекта
        "_sliderLogic", чтобы узнать есть ли у нас еще изображения для прокрутки вперед, то есть является ли текущее
        изображение все еще не последним в списке изображений.*/
            this._sliderLogic.increaseCurrentImageID(); /*И если у нас есть изображения для прокрутки вперед, то
            вызываем метод "increaseCurrentImageID()" у объекта "_sliderLogic", чтобы увеличить номер текущего
            изображения для отображения, чтобы показать следующее изображение.*/
            this.setImageSRC(); /*И поменяв номер текущего изображения для отображения, отрисовываем это изображение.*/
        } else {
            this._sliderLogic.resetCurrentImageID(); /*Иначе если у нас больше нет изображений для прокрутки вперед, то
            есть мы в данный момент отображаем самое последнее изображение в списке, то вызываем метод
            "resetCurrentImageID()" у объекта "_sliderLogic", чтобы установить в качестве номера текущего изображения
            для отображения самое первое изображение в списке, тем самым обеспечивая возможность бесконечно прокручивать
            изображения в слайдере вперед.*/
            this.setImageSRC(); /*И поменяв номер текущего изображения для отображения, отрисовываем это изображение.*/
        };
    }; /*Метод, который позволяет прокручивать изображения вперед. В качестве параметра здесь нужно указывать объект
    "event" - объект, который будет получен в ходе срабатывания события, на которое будет подписан этот метод, поскольку
    все функции-слушатели возвращают такой объект события. То есть такой параметр "event" надо всегда указывать в
    методах, если мы будем их подписывать на события, на случай если нам надо будет что-то сделать с самим объектом,
    который подписан на событие (например, изменить текст кнопки, на которую нажали, при помощи
    "event.currentTarget.innerText").*/

    this.initialize = function (sliderElementClass) { /*Метод, который инициализирует слайдер. В качестве
    параметра получает класс элемента из разметки, в который будет помещена разметка всего слайдера.*/
        this.getWholeSlider(sliderElementClass); /*Получаем элемент, который будет хранить весь слайдер.*/

        this.wholeSlider.innerHTML = `
            <div class='button-prev-div'>
                <button class='button-prev'>PREV</button>
            </div>
    
            <div class='image-div'>
                <img src='' alt='' class='image'/>
            </div>
    
            <div class='button-next-div'>
                <button class='button-next'>NEXT</button>
            </div>`; /*Теперь заполняем HTML-разметку в найденном элементе, который будет хранить весь слайдер. То есть
            в самом HTML-файле нужно только подготовить элементы "div" куда разметка слайдеров будет вставлена.*/

        this.getButtonPrev(); /*Получаем кнопку прокрутки изображений назад.*/
        this.getImage(); /*Получаем HTML-элемента "img", который будет отображать изображения в слайдере.*/
        this.getButtonNext(); /*Получаем кнопку прокрутки изображений вперед.*/

        this.buttonPrev.addEventListener('click', function (event) {
            that.showPrevImage(event);
        });
        this.buttonNext.addEventListener('click', function (event) {
            that.showNextImage(event);
        }); /*Подписали наши кнопки на соотвествующие события. Когда будет срабатывание события у кнопок "buttonPrev" и
        "buttonNext", то объекты в виде этих кнопок будут контекстами вызова "this". Поэтому, чтобы не потерять контекст
        вызова объекта, созданного при помощи конструкторя "SliderView", мы выше сохранили его в переменную "that".
        Здесь мы при подписывании на событие наших кнопок используем анонимную функцию, в которую передаем объект
        "event" - объект случившегося события (то есть наши кнопки), а внутри этой анонимной функции используем контекст
        "that", ссылающийся на контекст вызова упомянутого объекта, который будет браться благодаря замыканию. Анонимная
        функция нам здесь нужна, так как мы указываем параметр в этой функции, иначе сделать не получиться. По итогу
        методы "showPrevImage" и "showNextImage" будут вызываться из контекста объекта, созданного при помощи
        конструкторя "SliderView", а внутрь этих методов уже будут передоваться объекты события, которые относятся к
        нашим кнопкам.*/

        this._sliderLogic.initializeLogic(function () {
            that.setImageSRC();
        }); /*Здесь мы вызываем метод "initializeLogic()" у объекта "_sliderLogic". Этот метод часть обратной связи от
        "SliderLogic" к "SliderView". Внутрь этого метода мы передаем в качестве параметра анонимную функцию, внутри
        которой будет вызываться местный метод "setImageSRC()", который устанавливает адрес изображения в HTML-элемент
        "img". Согласно методу "initializeLogic()" у объекта "_sliderLogic", переданная в качестве параметра
        callback-функция, то есть в данном случае описанная выше анонимная функция, сработает только после того, когда
        будет иметься у объекта "_sliderLogic" массив с адресами изображений. То есть в итоге само изображение
        подгрузиться только тогда, когда мы будем уверены, что имеем на руках массив с адресами изображений, при этом
        вся остальная верстка отрисуется до этого. В итоге мы реализовали корректную работу асинхронного кода при помощи
        callback-функций. Также стоит отметить, что мы здесь вызываем метод "setImageSRC()" в контексте, который был
        сохранен в переменную "that", чтобы не потерять контекст вызова объекта, созданного при помощи конструктора
        "SliderView".*/
    };
};

/*--------------------------------------------------------------------------------*/

function SliderLogic() { /*Создаем конструктор, который будет отвечать за уровень BLL нашего слайдера.*/
    var that = this; /*Сохраняем отдельно текущий контекст "this".*/

    // this._sliderDataService = new SliderDataService(); /*На основе конструктора 
    // "SliderDataService" создаем объект "_sliderDataService".*/

    this._sliderDataService = new SliderAjaxDataService(); /*На основе конструктора "SliderAjaxDataService" создаем
    объект "_sliderDataService".*/

    this._imageArray = []; /*Свойство, которое будет хранить массив адресов на изображения.*/

    this._currentImageID = 0; /*Текущий номер отображаемого изображения в слайдере.*/


    this.initializeLogic = function (callback) {
        this._sliderDataService.getCurrentImageArray(function (images) {
            that._imageArray = images;

            callback();
        });
    }; /*Этот метод часть обратной связи от "SliderDataService" к "SliderLogic". Внутри этого метода мы вызываем метод
    "getCurrentImageArray()" объекта "_sliderDataService". Этот метод когда заполнит свой массив с адресами изображений
    должен вызвать переданную в него callback-функцию и поместить в нее массив с адресами изображений. И этой
    callback-функцией мы здесь указали анонимную функцию, внутри которой в местный массив адресов изображений
    "_imageArray" мы сохраняем массив адресов изображений, который будет передан в указанную callback-функцию. Стоит
    отметить, что мы здесь используем свойство "_imageArray" в контексте, который был сохранен в переменную "that",
    чтобы не потерять контекст вызова объекта, созданного при помощи конструктора "SliderLogic".
    
    Но также этот метод "initializeLogic" налаживает обратную связь в направлении от "SliderLogic" к "SliderView". После
    того как местный массив адресов изображений "_imageArray" будет заполнен, вызовется callback-функция, которая была
    передана в этот массив параметром. Смотри далее метод "initialize()" в конструкторе "SliderView", в котором
    вызывается этот метод "initializeLogic()".*/

    this.getCurrentImage = function () {              
        return this._imageArray[this._currentImageID];
    }; /*Метод, который позволяет получить адрес текущего изображения из массива адресов изображений.*/

    this.doWeHavePrevImageToShow = function () {
        return this._currentImageID >= 1;
    }; /*Метод, который проверяет есть ли у нас еще изображения для прокрутки назад, то есть является ли текущее
    изображение все еще не первым в списке изображений.*/

    this.decreaseCurrentImageID = function () {
        this._currentImageID--;
    }; /*Метод, который уменьшает номер текущего изображения для отображения, чтобы показать предыдущее изображение.*/

    this.setMaxCurrentImageID = function () {
        this._currentImageID = this._imageArray.length - 1;
    }; /*Метод, который устанавливает в качестве номера текущего изображения для отображения самое последнее изображение
    в списке, тем самым обеспечивая возможность бесконечно прокручивать изображения в слайдере назад.*/

    this.doWeHaveNextImageToShow = function () {
        return this._currentImageID <= this._imageArray.length - 2;
    }; /*Метод, который проверяет есть ли у нас еще изображения для прокрутки вперед, то есть является ли текущее
    изображение все еще не последним в списке изображений.*/

    this.increaseCurrentImageID = function () {
        this._currentImageID++;
    }; /*Метод, который увеличивает номер текущего изображения для отображения, чтобы показать следующее изображение.*/

    this.resetCurrentImageID = function () {
        this._currentImageID = 0;
    }; /*Метод, который устанавливает в качестве номера текущего изображения для отображения самое первое изображение в
    списке, тем самым обеспечивая возможность бесконечно прокручивать изображения в слайдере вперед.*/
};

/*--------------------------------------------------------------------------------*/

function SliderDataService() { /*Создаем конструктор, который будет отвечать за уровень DAL нашего слайдера.*/
    this._imageArray = []; /*Свойство, которое будет хранить массив адресов на изображения.*/

    this.getCurrentImageArray = function (callback) {

        // setTimeout(() => {
        //     this.imageArray.push('src/1small.png');
        //     this.imageArray.push('src/2small.png');
        //     this.imageArray.push('src/3small.png');

        //     callback();
        // }, 2000);

        this._imageArray.push('src/1small.png');
        this._imageArray.push('src/2small.png');
        this._imageArray.push('src/3small.png');

        callback(this._imageArray);
    }; /*Метод, который позволяет заполнить массив адресов для изображений такими адресами. Если бы при вызове этого
    метода, например, в другом конструкторе, мы возвращали бы данные при помощи "return", то это корректно работало бы
    только когда код работал бы последовательно, то есть если бы этот код был не асинхронный. То есть если, например,
    здесь использовать метод "setTimeout", то в конструкторе "SliderLogic" в момент вызова этого метода было бы
    "undefined".

    Поэтому чтобы избежать проблем при работе с асинхронным кодом мы используем здесь callback-функции. То есть в этот
    метод параметром должна передаваться какая-то callback-функция, которая будет вызываться после того как заполнится
    массив "imageArray", и в эту callback-функцию будет отправляться наш массив с адресами изображений. Вызов такой
    callback-функции будет как бы сигналом того, что массив полностью заполнен и его наконец можно получить где-то в
    другом месте. Таким образом мы налаживаем обратную связь в направлении от "SliderDataService" к "SliderLogic".
    Смотри далее метод "initializeLogic()" в конструкторе "SliderLogic", в котором вызывается этот метод
    "getCurrentImageArray()".*/
};

/*--------------------------------------------------------------------------------*/

function SliderAjaxDataService() { /*Создаем еще один конструктор, который будет отвечать за уровень DAL нашего
слайдера, но брать данные из AJAX-запроса. Интерфейс работы у конструкторов "SliderDataService" и
"SliderAjaxDataService" одинаковый, поэтому они легко взаимозаменяемы в конструкторе "SliderLogic".*/
    var that = this; /*Сохраняем отдельно текущий контекст "this".*/

    this._imageArray = []; /*Свойство, которое будет хранить массив адресов на изображения.*/

    this.getCurrentImageArray = function (callback) {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/albums/1/photos',
            success: function (data) {
                data.forEach(element => {
                    let tempURL = element.url;

                    that._imageArray.push(tempURL);
                });

                callback(that._imageArray);
            }
        });
    };
};

/*--------------------------------------------------------------------------------*/

var wholeSliderClass = '.whole-slider'; /*Класс элемента, который будет вмещать в себя первый слайдер.*/
var wholeSliderTwoClass = '.whole-slider-two'; /*Класс элемента, который будет вмещать в себя второй слайдер.*/

var slider1 = new SliderView(); /*Создаем первый слайдер.*/
var slider2 = new SliderView(); /*Создаем второй слайдер.*/

slider1.initialize(wholeSliderClass); /*Инициализируем первый слайдер в элементе с классом "whole-slider".*/

slider2.initialize(wholeSliderTwoClass); /*Инициализируем второй слайдер в элементе с классом "whole-slider-two".*/