var passClass = 'pass';
var showPassClass = 'show-pass';

var passElement = document.getElementsByClassName(passClass);
var showPassElement = document.getElementsByClassName(showPassClass);

showPassElement[0].addEventListener('mousedown', showMyPass); /*Событие "mousedown" означает 
зажатие какого-то HTML-элемента мышкой.*/
showPassElement[0].addEventListener('mouseup', hideMyPass); /*Событие "mouseup" означает отсутствие 
зажатия какого-то HTML-элемента мышкой.*/

function showMyPass() { /*Функция для показа пароля.*/
    if (passElement[0].type === 'password') {
        passElement[0].type = 'text'
    };
};

function hideMyPass() { /*Функция для скрытия пароля.*/
    if (passElement[0].type === 'text') {
        passElement[0].type = 'password'
    };
};

/*--------------------------------------------------------------------------------*/

var someWindowClass = 'some-window';
var showSomeWindowClass = 'show-some-window';
var hideSomeWindowClass = 'hide-some-window';

var showSomeWindowElement = document.getElementsByClassName(showSomeWindowClass);
var hideSomeWindowElement = document.getElementsByClassName(hideSomeWindowClass);
var someWindowElement = document.getElementsByClassName(someWindowClass);

var hidingSomeWindowClass = 'hiding-some-window';
var showingSomeWindowClass = 'showing-some-window';

hideSomeWindowElement[0].addEventListener('click', shrinkSomeWindow); /*Подписываем "hideElement" на 
событие "onClick". При срабатывании такого события сработает функция "shrinkSomething".*/
showSomeWindowElement[0].addEventListener('click', unshrinkSomeWindow); /*Подписываем "showElement" на 
событие "onClick". При срабатывании такого события сработает функция "unshrinkSomething".*/

function shrinkSomeWindow() { /*Функция для плавного скрытия HTML-элемента.*/
    if (someWindowElement[0] != null) {
        someWindowElement[0].classList.remove(showingSomeWindowClass);
        someWindowElement[0].classList.add(hidingSomeWindowClass);
    };
};

function unshrinkSomeWindow() { /*Функция для плавного раскрытия HTML-элемента.*/
    if (someWindowElement[0] != null) {
        someWindowElement[0].classList.remove(hidingSomeWindowClass);
        someWindowElement[0].classList.add(showingSomeWindowClass);
    };
};

/*--------------------------------------------------------------------------------*/

var statusSpanClass = 'status-span';
var statusInputClass = 'status-input';
var statusButtonClass = 'status-button';

var visibleStatusClass = 'visible-status';
var invisibleStatusClass = 'invisible-status';

var statusSpanElement = document.getElementsByClassName(statusSpanClass);
var statusInputElement = document.getElementsByClassName(statusInputClass);
var statusButtonElement = document.getElementsByClassName(statusButtonClass);

statusSpanElement[0].addEventListener('click', showStatusInput);

function showStatusInput() {
    statusSpanElement[0].classList.remove(visibleStatusClass);
    statusSpanElement[0].classList.add(invisibleStatusClass);

    statusInputElement[0].classList.remove(invisibleStatusClass);
    statusInputElement[0].classList.add(visibleStatusClass);

    statusButtonElement[0].classList.remove(invisibleStatusClass);
    statusButtonElement[0].classList.add(visibleStatusClass);

    statusInputElement[0].value = statusSpanElement[0].innerText; /*У HTML-элемента "span" надо 
    обращаться к свойству "innerText", а не "value".*/
};

statusButtonElement[0].addEventListener('click', showStatusSpan);

function showStatusSpan() {
    statusSpanElement[0].classList.remove(invisibleStatusClass);
    statusSpanElement[0].classList.add(visibleStatusClass);

    statusInputElement[0].classList.remove(visibleStatusClass);
    statusInputElement[0].classList.add(invisibleStatusClass);

    statusButtonElement[0].classList.remove(visibleStatusClass);
    statusButtonElement[0].classList.add(invisibleStatusClass);

    statusSpanElement[0].innerText = statusInputElement[0].value;
};

/*--------------------------------------------------------------------------------*/

var checkNumbersInputClass = 'check-numbers-input';

var inputHasErrorClass = 'input-has-error';

var checkNumbersInputElement = document.getElementsByClassName(checkNumbersInputClass);

checkNumbersInputElement[0].addEventListener('input', function () { /*Событие "input" означает 
ввод чего-либо в HTML-элемент "input".*/
    checkNumbers(checkNumbersInputElement[0]);
});

function checkNumbers(element) {
    if (element.value > 50 || element.value < 10) {
        element.classList.add(inputHasErrorClass);
    } else {
        element.classList.remove(inputHasErrorClass);
    };
};

/*--------------------------------------------------------------------------------*/

var mainImageClass = 'main-image';
var imageOneClass = 'image-one';
var imageTwoClass = 'image-two';
var imageThreeClass = 'image-three';

var mainImageElement = document.getElementsByClassName(mainImageClass);
var imageOneElement = document.getElementsByClassName(imageOneClass);
var imageTwoElement = document.getElementsByClassName(imageTwoClass);
var imageThreeElement = document.getElementsByClassName(imageThreeClass);

imageOneElement[0].addEventListener('click', function () {
    showImage(imageOneElement[0]);
});
imageTwoElement[0].addEventListener('click', function () {
    showImage(imageTwoElement[0]);
});
imageThreeElement[0].addEventListener('click', function () {
    showImage(imageThreeElement[0]);
});

function showImage(element) {
    switch (element.className) {
        case imageOneClass:
            mainImageElement[0].setAttribute('src', 'src/1big.png');
            break;

        case imageTwoClass:
            mainImageElement[0].setAttribute('src', 'src/2big.png');
            break;

        case imageThreeClass:
            mainImageElement[0].setAttribute('src', 'src/3big.png');
            break;

        default:
            break;
    };
};

/*--------------------------------------------------------------------------------*/

var sidebarMenuClass = 'sidebar-menu';
var showSidebarMenuDivClass = 'show-sidebar-menu-div';

var showingSidebarMenuClass = 'showing-sidebar-menu';

var sidebarMenuElement = document.getElementsByClassName(sidebarMenuClass);
var showSidebarMenuDivElement = document.getElementsByClassName(showSidebarMenuDivClass);


showSidebarMenuDivElement[0].addEventListener('click', showSidebarMenu);

function showSidebarMenu() {
    if (!sidebarMenuElement[0].classList.contains(showingSidebarMenuClass)) {
        sidebarMenuElement[0].classList.add(showingSidebarMenuClass);
    } else (sidebarMenuElement[0].classList.remove(showingSidebarMenuClass))
};

/*--------------------------------------------------------------------------------*/

var mainMenuClass = '.main-menu';
var mainMenuItemClass = '.main-menu-item';
var showSubMenuClass = 'show-sub-menu';

var mainMenuElement = document.querySelector(mainMenuClass); /*Таким образом получаем весь HTML-элемент 
с классом "main-menu" и все его дочерние элементы. При использовании "querySelector()" класс нужно 
указывать через точку.*/

mainMenuElement.addEventListener('click', addShowSubMenuClass);

function addShowSubMenuClass(event) {
    var menu = event.target.closest(mainMenuItemClass); /*Таким образом находим ближайший родительский 
    элемент (или сам элемент), который соответствует заданному CSS-селектору. То есть при нажатии на 
    HTML-элемент "span" находим его родительский HTML-элемент "li" c классом "main-menu-item". При 
    использовании "closest()" класс нужно указывать через точку. Здесь "event" нужно передавать как
    параметр, иначе будет использоваться глобальный объект "event", что является нежелательным и устаревшим.*/
    menu.classList.toggle(showSubMenuClass); /*Таким образом можно добавлять/удалять какой-то класс у 
    HTML-элемента. То есть здесь мы добавляем/удаляем класс "show-sub-menu" к родительскому по отношению к 
    HTML-элементу "span", по которому мы кликнули, HTML-элементу "li" c классом "main-menu-item".*/
};

/*--------------------------------------------------------------------------------*/

var mainMenuItemTwoClass = '.main-menu-item-two';
var allSpansInMainMenuItemTwoClass = '.main-menu-item-two span'; /*Означает HTML-элементы "span" внутри 
HTML-элементов с классом "main-menu-item-two".*/
var showSubMenuTwoClass = 'show-sub-menu-two';

var allSpansInMainMenuItemTwoArray = document.querySelectorAll(allSpansInMainMenuItemTwoClass); /*Таким образом 
получаем все HTML-элементы "span" внутри HTML-элементов с классом "main-menu-item-two".*/

for (var i = 0; i < allSpansInMainMenuItemTwoArray.length; i++) { /*Подписываем каждый HTML-элемент "span" 
на событие.*/
    allSpansInMainMenuItemTwoArray[i].addEventListener('click', addShowSubMenuTwoClass);
};

function addShowSubMenuTwoClass() {
    for (var i = 0; i < allSpansInMainMenuItemTwoArray.length; i++) { /*Пробегаемся по всем HTML-элементам "span".*/
        if (allSpansInMainMenuItemTwoArray[i] === this) { /*Если нашли тот, на который нажали, то находим для 
            него ближайший родительский HTML-элемент с классом "main-menu-item-two" и добавляем этому элементу 
            класс "show-sub-menu-two".*/
            this.closest(mainMenuItemTwoClass).classList.add(showSubMenuTwoClass);
        } else { /*Иначе если нашли не тот, на который нажали, то находим для него ближайший родительский 
            HTML-элемент с классом "main-menu-item-two" и удаляем у этого элемента класс "show-sub-menu-two".*/
            allSpansInMainMenuItemTwoArray[i].closest(mainMenuItemTwoClass).classList.remove(showSubMenuTwoClass);
        };
    };
};