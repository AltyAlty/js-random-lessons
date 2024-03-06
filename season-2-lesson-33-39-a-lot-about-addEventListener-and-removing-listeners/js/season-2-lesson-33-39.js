/*Еще одна реализация отписки сразу всех слушателей от какого-либо элемента. Этот код должен быть в самом начале.*/

/*Сначала мы модернизируем работу оригинального метода "addEventListener()" так, чтобы у каждого элемента события
хранилось отдельное свойство, содержащее информацию о своих слушателях.*/
if (EventTarget.prototype.originalAddEventListener == null) {
  EventTarget.prototype.originalAddEventListener = EventTarget.prototype.addEventListener;

  function addEventListenerHook(event, listener, option) {
    console.log('Event listener has been added', this.nodeName, event);

    this.allListeners = this.allListeners || [];

    this.allListeners.push({ event, listener, option });

    this.originalAddEventListener(event, listener, option);
  };

  EventTarget.prototype.addEventListener = addEventListenerHook;
};

/*Затем мы создаем специальную функцию зачистки слушателей, которая как очищает указанных в HTML слушателей событий,
так и слушателей и специального свойства, созданного нами выше в каждом элементе события.*/
function cleanup(element) {
  for (let property in element) {
    if (property.startsWith('on') && element[property] != null) {
      element[property] = null;

      console.log('Listener (from HTML) has been removed from ' + element.nodeName, property);
    };
  };

  for (let l of element.allListeners || []) {
    element.removeEventListener(l.event, l.listener, l.option);

    console.log('Listener (from JS) has been removed from ' + element.nodeName, l.event);
  };
};

setTimeout(() => {
  cleanup(divButtonLogZeroElement);
}, 2000);


const divButtonLogZeroElement = document.querySelector('.div-button-log-zero');
const buttonLogZeroElement = document.querySelector('.button-log-zero');

function logZeroOne(text) {
  console.log(text);
};

function logZeroTwo(text) {
  console.log(text);
};

function logZeroThree() {
  console.log('0.3');
};

divButtonLogZeroElement.addEventListener('click', function () {
  logZeroOne('0.1');
});
divButtonLogZeroElement.addEventListener('click', () => {
  logZeroTwo('0.2');
});
divButtonLogZeroElement.addEventListener('click', logZeroThree);

buttonLogZeroElement.addEventListener('click', function () {
  logZeroOne('0.1');
});
buttonLogZeroElement.addEventListener('click', () => {
  logZeroTwo('0.2');
});
buttonLogZeroElement.addEventListener('click', logZeroThree);

/*--------------------------------------------------------------------------------*/

const buttonLogOneElement = document.querySelector('.button-log-one');
const buttonUnsubscribeLogOneElement = document.querySelector('.button-unsubscribe-log-one');

/*Функция с параметром.*/
function logSomething(text) {
  console.log(text);
};

/*Обвертка для функции с параметром.*/
function logSomethingOne() {
  logSomething('1');
};

/*Подписка, используя функцию обвертку для функции с параметром.*/
buttonLogOneElement.addEventListener('click', logSomethingOne);

/*Функция-обвертка для отписки.*/
function unsubscribeLogSomethingOne() {
  buttonLogOneElement.removeEventListener('click', logSomethingOne);
};

/*Подписываем вторую кнопку, чтобы она отписывала первую.*/
buttonUnsubscribeLogOneElement.addEventListener('click', unsubscribeLogSomethingOne);

/*--------------------------------------------------------------------------------*/

const buttonShowHideElement = document.querySelector('.button-show-hide');
const inputShowHideElement = document.querySelector('.search-show-hide');

function showText() {
  inputShowHideElement.type = 'text';
  buttonShowHideElement.innerHTML = 'HIDE';
  window.addEventListener('mouseup', hideText);
};

function hideText() {
  inputShowHideElement.type = 'password';
  buttonShowHideElement.innerHTML = 'SHOW';
  window.removeEventListener('mouseup', hideText);
};

buttonShowHideElement.addEventListener('mousedown', showText);

/*--------------------------------------------------------------------------------*/

const divButtonLogThreeElement = document.querySelector('.div-button-log-three');
const buttonLogThreeElement = document.querySelector('.button-log-three');

function logThreeOne() {
  console.log('3.1');
};

function logThreeTwo() {
  console.log('3.2');
};

divButtonLogThreeElement.addEventListener('click', logThreeOne);
divButtonLogThreeElement.addEventListener('click', logThreeTwo);

buttonLogThreeElement.addEventListener('click', logThreeOne);
buttonLogThreeElement.addEventListener('click', logThreeTwo);

/*Чтобы отписать сразу всех слушателей от какого-либо элемента, можно клонировать этот элемент. Но в данной реализации
мы также отписываем всех слушателей всех дочерних элементов указанного элемента. Это не самый оптимальный способ, он
медленный и затратный для памяти.*/

/*Метод "cloneNode()" возвращает дубликат узла, из которого этот метод был вызван. В качестве параметра указывается
должны ли дети узла быть клонированы или нет. Если нет, то эти дочерние элементы при замене указанного элемента будут
утеряны.*/
const newDivButtonLogThreeElement = divButtonLogThreeElement.cloneNode(true);

function removeAllListenersFromDivButtonLogThreeElementAndItsChildren() {
  /*Метод "parentNode()" возвращает родителя определенного элемента DOM-дерева.*/
  /*Метод "replaceChild()" заменяет дочерний элемент на выбранный и возвращает замененный элемент.*/
  divButtonLogThreeElement.parentNode.replaceChild(newDivButtonLogThreeElement, divButtonLogThreeElement);
};

setTimeout(removeAllListenersFromDivButtonLogThreeElementAndItsChildren, 2000);

/*--------------------------------------------------------------------------------*/

const divButtonLogFourElement = document.querySelector('.div-button-log-four');
const buttonLogFourElement = document.querySelector('.button-log-four');

function logFourOne() {
  console.log('4.1');
};

function logFourTwo() {
  console.log('4.2');
};

divButtonLogFourElement.addEventListener('click', logFourOne);
divButtonLogFourElement.addEventListener('click', logFourTwo);

buttonLogFourElement.addEventListener('click', logFourOne);
buttonLogFourElement.addEventListener('click', logFourTwo);

/*Еще одна реализация отписки сразу всех слушателей от какого-либо элемента, но в этот раз можно указывать должны ли
быть отписаны также все слушатели всех дочерних элементов указанного элемента.*/
function removeAllListenersFromElementAndOrItsChildren(element, withChildren) {
  if (withChildren) {
    element.parentNode.replaceChild(element.cloneNode(true), element);
  } else {
    var newElement = element.cloneNode(false);

    /*Оператор "while" создает цикл, выполняющий заданную инструкцию, пока истинно проверяемое условие. Логическое
    значение условия вычисляется перед исполнением тела цикла.*/
    /*Метод "hasChildNodes()" возвращает Boolean значение показывающее имеет ли текущий узел дочерние узлы или нет.*/
    /*Метод "appendChild()" добавляет узел в конец списка дочерних элементов указанного родительского узла. Если данный
    дочерний элемент является ссылкой на существующий узел в документе, то метод "appendChild()" перемещает его из
    текущей позиции в новую позицию (нет необходимости удалять узел из родительского узла перед добавлением его к
    какому-либо другому узлу).*/
    /*Свойство "firstChild" это свойство только для чтения, возвращающее первый потомок узла в древе или null, если узел
    является бездетным. Если узел это документ, он возвращает первый узел в списке своих прямых детей.*/
    while (element.hasChildNodes()) {
      newElement.appendChild(element.firstChild);
    };

    element.parentNode.replaceChild(newElement, element);
  };
};

setTimeout(() => {
  removeAllListenersFromElementAndOrItsChildren(divButtonLogFourElement, false);
}, 2000);

/*--------------------------------------------------------------------------------*/

const divButtonLogFiveElement = document.querySelector('.div-button-log-five');
const buttonLogFiveElement = document.querySelector('.button-log-five');

const divButtonLogSixElement = document.querySelector('.div-button-log-six');
const buttonLogSixElement = document.querySelector('.button-log-six');


function logFiveOne(text) {
  console.log(text);
};

function logFiveTwo(text) {
  console.log(text);
};

buttonLogFiveElement.addEventListener('click', function () {
  logFiveOne('5.1');
});
buttonLogFiveElement.addEventListener('click', () => {
  logFiveTwo('5.2');
});


function logSixOne(text) {
  console.log(text);
};

function logSixTwo(text) {
  console.log(text);
};

buttonLogSixElement.addEventListener('click', function () {
  logSixOne('6.1');
});
buttonLogSixElement.addEventListener('click', () => {
  logSixTwo('6.2');
});

/*
Вызов метода "addEventListener()" со слушателем в виде анонимной функции создает нового слушателя каждый раз. Вызов
метода "removeEventListener" в такой ситуации ничего не делает, поскольку анонимная функция создает уникальный объект
каждый раз, когда ее вызывают, и не происходит отсылки к уже существующему объекту.

Следующая реализация отписки сразу всех слушателей от какого-либо элемента позовляет работать со слушателями в виде
анонимных или стрелочных функций.
*/

/*Создаем объект, который предназначен для хранения слушателей.*/
var _eventListeners = {};

/*Делаем специальную функцию-обвертку для метода "addEventListener()". В качестве параметров принимает узел, где должно
произойти событие, тип события, слушателя этого события и опция "capture" для метода "addEventListener()".*/
const addListener = (node, event, listener, capture = false) => {
  /*Если указанного события в параметрах еще нет в объекте, предназначенном для хранения слушателей, то добавляем в этот
  объект свойство, имя которого будет как названия события, а значение будет пустым массивом, который в дальнейшем будет
  хранить самих слушателей.*/
  if (!(event in _eventListeners)) {
    _eventListeners[event] = [];
  };

  /*Далее добавляем в это свойство элемент массива в виде объекта, который содержит узел, в котором должно произойти
  событие, самого слушателя этого события и опцию "capture" для метода "addEventListener()".*/
  _eventListeners[event].push(
    {
      node: node,
      listener: listener,
      capture: capture
    }
  );

  /*Далее подписываем нашего слушателя на указанное событие в указанном узле.*/
  node.addEventListener(event, listener, capture)
};

/*Делаем специальную функцию-обвертку для метода "removeEventListener()". В качестве параметров принимает узел, где
должно произойти событие, и тип события.*/
const removeAllListeners = (targetNode, event) => {
  /*Удаляем слушателей указанного события из указанного узла. Сначала мы отфильтровываем только те объекты в объекте,
  предназначенном для хранения слушателей, в которых узел совпадает с указанным узлом. А затем у каждого полученного
  объекта мы берем свойство, хранящее узел и вызываем для него метод "removeEventListener()" для совершения отписки.*/
  _eventListeners[event]
    .filter(
      ({ node }) => node === targetNode
    )
    .forEach(
      ({ node, listener, capture }) => node.removeEventListener(event, listener, capture)
    );

  /*Обновляем объект, предназначенный для хранения слушателей. В этом объекте мы по свойству, означающему указанный тип
  события, оставляем только те узлы, которые не равны указанному узлу.*/
  _eventListeners[event] = _eventListeners[event].filter(
    ({ node }) => node !== targetNode,
  );
};


addListener(divButtonLogFiveElement, 'click', function () {
  logFiveOne('5.1');
}, false);

addListener(divButtonLogFiveElement, 'click', () => {
  logFiveTwo('5.2');
}, false);

setTimeout(() => {
  removeAllListeners(divButtonLogFiveElement, 'click');
}, 2000);


addListener(divButtonLogSixElement, 'click', function () {
  logSixOne('6.1');
}, false);

addListener(divButtonLogSixElement, 'click', () => {
  logSixTwo('6.2');
}, false);

setTimeout(() => {
  removeAllListeners(divButtonLogSixElement, 'click');
}, 3000);

/*--------------------------------------------------------------------------------*/

const divButtonLogSevenElement = document.querySelector('.div-button-log-seven');
const buttonLogSevenElement = document.querySelector('.button-log-seven');

function logSevenOne(text) {
  console.log(text);
};

function logSevenTwo(text) {
  console.log(text);
};

divButtonLogSevenElement.addEventListener('click', function () {
  logSevenOne('7.1');
});
divButtonLogSevenElement.addEventListener('click', () => {
  logSevenTwo('7.2');
});

buttonLogSevenElement.addEventListener('click', function () {
  logSevenOne('7.1');
});
buttonLogSevenElement.addEventListener('click', () => {
  logSevenTwo('7.2');
});

/*Еще одна реализация отписки сразу всех слушателей от какого-либо элемента и всех его дочерних элементов. Достаточно
простой, но грубый вариант, медленно работает на больших страницах. Атрибут "outerHTML" получает сериализованный
HTML-фрагмент, описывающий элемент, включая его потомков. При помощи этого атрибута можно установить замену элемента
узлами, полученными из заданной строки.*/
setTimeout(() => {
  divButtonLogSevenElement.outerHTML = divButtonLogSevenElement.outerHTML;
}, 2000);