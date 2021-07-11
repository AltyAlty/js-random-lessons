var slider1 = {
    /*Классы наших элементов.*/
    buttonPrevClass: 'button-prev',
    imageClass: 'image',
    buttonNextClass: 'button-next',

    /*Сами наши элементы. Если далее здесь использовать: 
    "buttonPrev: document.getElementsByClassName(this.buttonPrevClass)[0]", 
    то контекст вызова "this" будет ссылаться на объект "document", а не 
    на объект "slider1". Соответсвенно "buttonPrevClass" не будет найден.
    Поэтому мы сначала просто создаем пустые свойства, а далее создаем три
    метода, в которых мы будем сохранять нужный нам контекст и при помощи
    это контекста получать нужные нам элементы.*/
    buttonPrev: '',
    image: '',
    buttonNext: '',

    getButtonPrev: function () {
        var that = this; /*Чтобы не потерять контекст вызова "this" из объекта
        "slider1" сохраняем этот контекст в отдельной переменной "that".*/
        this.buttonPrev = document.getElementsByClassName(that.buttonPrevClass)[0];
    },

    getImage: function () {
        var that = this;
        this.image = document.getElementsByClassName(that.imageClass)[0];
    },

    getButtonNext: function () {
        var that = this;
        this.buttonNext = document.getElementsByClassName(that.buttonNextClass)[0];
    },

    imageArray: ['src/1small.png', 'src/2small.png', 'src/3small.png'], /*Массив с адресами на изображения.*/

    currentImageID: 0, /*ID текущего отображаемого изображения.*/

    setImageSRC: function () { /*Специальный метод для установки атрибута "src" у элемента "img".*/
        this.image.setAttribute('src', this.imageArray[this.currentImageID]);
    },

    showPrevImage: function (event) { /*В качестве параметра нужно указывать объект "event" -
    объект, который будет получен в ходе события, поскольку все функции-слушатели возвращают 
    такой объект события. То есть такой параметр "event" надо всегда указывать в методах,
    если мы будем их подписывать на события, на случай если нам надо будет что-то сделать
    с самим объектом, который подписан на событие (например, изменить текст кнопки, на которую
    нажали, при помощи "event.currentTarget.innerText").*/
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

    initialize: function () {
        var that = this; /*Когда будет срабатывание события у кнопок "buttonPrev" и
        "buttonNext", то объекты в виде этих кнопок будут контекстами вызова "this".
        Поэтому, чтобы не потерять контекст вызова объекта "slider1", мы сохраняем его
        в переменную "that". Ниже мы при подписывании на событие наших кнопок используем
        анонимную функцию, в которую передаем объект "event" - объект случившегося события 
        (то есть наши кнопки), а внутри этой анонимной функции используем контекст "that", 
        ссылающийся на контекст вызова объекта "slider1", который будет браться благодаря 
        замыканию. Анонимная функция нам здесь нужна, так как мы указываем параметр в этой 
        функции, иначе сделать не получиться. По итогу методы "showPrevImage" и "showNextImage" 
        будут вызываться из контекста объекта "slider1", а внутрь этих методов уже будут 
        передоваться объекты события, которые относятся к нашим кнопкам.*/

        /*Получаем наши элементы кнопок и изображения при помощи созданных выше методов.*/
        this.getButtonPrev();
        this.getImage();
        this.getButtonNext();

        this.setImageSRC(); /*Устанавливаем начальное значение атрибута "src" у элемента "img".*/

        /*Подписываем наши кнопки на события.*/
        this.buttonPrev.addEventListener('click', function (event) {
            that.showPrevImage(event);
        });
        this.buttonNext.addEventListener('click', function (event) {
            that.showNextImage(event);
        });
    }
};