let counterWidgetElement = findCounterWidgetElement();
let counteValueElement = findCounteValueElement();

bindCounterWidgetToClickEvent(counterWidgetElement, counteValueElement);

restoreCounterValueFromLocalStorage(counteValueElement);

/*--------------------------------------------------------------------------------*/

function findCounterWidgetElement() {
    let counterWidget = document.querySelector('.js-counter');
    return counterWidget;
};

function findCounteValueElement() {
    let counteValue = document.querySelector('.js-counter-value');
    return counteValue;
};

function bindCounterWidgetToClickEvent(counterWidget, counteValue) {
    counterWidget.addEventListener('click', () => {
        let currentValue = counteValue.innerHTML;

        currentValue++;

        localStorage.setItem('counter-value', currentValue);

        counteValue.innerHTML = currentValue;
    });
};

function restoreCounterValueFromLocalStorage(counteValue) {
    var counterValueFromLocalStorage = localStorage.getItem('counter-value') || 0;

    counteValue.innerHTML = counterValueFromLocalStorage;
};