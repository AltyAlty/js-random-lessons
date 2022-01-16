/*Это класс, указывающий на кнопки c цифрами 0-9 и операцией ".". Далее получаем массив элементов этих 
кнопок.*/
const enterButtonClass = 'enter-button';
const enterButtonElements = document.getElementsByClassName(enterButtonClass);

/*Это класс, указывающий на кнопки операций в первом ряду ("+", "-", "*", ":"). Далее получаем массив 
элементов этих кнопок.*/
const calcButtonOneClass = 'calc-button-one';
const calcButtonOneElements = document.getElementsByClassName(calcButtonOneClass);

/*Это класс, указывающий на кнопки операций во втором ряду ("+/-", "=", "С"). Далее получаем массив 
элементов этих кнопок.*/
const calcButtonTwoClass = 'calc-button-two';
const calcButtonTwoElements = document.getElementsByClassName(calcButtonTwoClass);

/*Это класс, указывающий на кнопку удаления цифр из поля для вывода в калькуляторе. Далее получаем элемент 
этой кнопки.*/
const eraseClass = 'erase';
const eraseElement = document.getElementsByClassName(eraseClass)[0];

/*Это класс, указывающий на поле вывода в калькуляторе. Далее получаем элемент этого поля.*/
const resultClass = 'result';
const resultElement = document.getElementsByClassName(resultClass)[0];

/*Создаем вспомогательные переменные для хранения текущих введенных первого и второго чисел, а также 
текущей выбранной операции.*/
let currentFirstNumber = '';
let currentSecondNumber = '';
let currentOperation = '';

/*Создаем вспомогательную переменную для указания введена ли уже точка в поле для вывода в калькуляторе и 
вспомогательную переменную для указания выбрали ли мы уже операцию.*/
let ifWeHaveDot = false;
let ifWeHaveOperation = false;

/*-------------------------------------------------------------------------------------------------------------*/

/*Это вспомогательная функция для сброса данных о текущей операции.*/
function resetNumbersAndOperation() {
    currentOperation = '';
    currentFirstNumber = '';
    currentSecondNumber = '';
    ifWeHaveDot = false;
    ifWeHaveOperation = false;
};

/*-------------------------------------------------------------------------------------------------------------*/

/*Это функция для ввода данных в поле вывода в калькуляторе. Эта функция принимает какое-то значение и
дописывает его в поле, а не перезатирает предыдущее значение.*/
function enterSomething(valueToEnter) {
    resultElement.innerText += valueToEnter;
};

/*Это функция-подписчик, которая является обверткой для функции "enterSomething()".*/
function enterButtonListener(event) {
    /*Если длина числа больше 20 знаков, то укорачиваем ее.*/
    if (resultElement.innerText.length > 20) {
        resultElement.innerText = resultElement.innerText.substring(0, 20);
    };

    /*Проверяем введена ли уже точка в поле для вывода в калькуляторе.*/
    for (let i = 0; i < resultElement.innerText.length; i++) {
        if (resultElement.innerText[i] === '.') {
            ifWeHaveDot = true;
        };
    };

    /*Далее мы получаем элемент события и сохраняем у этого элемента свойства "value" в качестве данных для 
    ввода в поле вывода.*/
    const elementInEvent = event.currentTarget;
    let valueToEnter = elementInEvent.value;

    /*Если в поле для вывода уже есть точка и мы хотим ввести еще одну точку, то вместо этого вводим ничего.*/
    if (ifWeHaveDot && valueToEnter === '.') {
        valueToEnter = '';
    };

    /*В итоге добавляем данные в поле вывода в калькуляторе.*/
    enterSomething(valueToEnter);
};

/*Здесь мы пробегаемся по всем нашим кнопкам с цифрами 0-9 и точкой, и подписываем их на событие "click", при 
срабатывании, которого будет вызываться функция "enterButtonListener()".*/
for (let i = 0; i < enterButtonElements.length; i++) {
    enterButtonElements[i].addEventListener('click', enterButtonListener);
};

/*-------------------------------------------------------------------------------------------------------------*/

/*Эта функция после выбора операции сохраняет текущее введенное первое число и текущую выбранную операцию.*/
function doAfterChoosingOperation(operation) {
    /*Сначала проверяем, что текущего введенного числа нет и, что поле для вывода в калькуляторе не пустое и не 
    состоит из одной точки, знака минус или знака минус с точкой. Если проверка проходит, то мы сохраняем то, что 
    в данный момент введено в поле, в качестве введенного первого числа, а затем зануляем поле для вывода в 
    калькуляторе.*/
    if (currentFirstNumber === ''
        && resultElement.innerText !== '' && resultElement.innerText !== '.'
        && resultElement.innerText !== '-' && resultElement.innerText !== '-.') {
        currentFirstNumber = Number(resultElement.innerText);
        resultElement.innerText = '';
    };

    /*Затем проверяем, что текущего введенного числа нет и, что поле для вывода в калькуляторе пустое, 
    состоит из одной точки, знака минус или знака минус с точкой. Если проверка проходит, то мы в качестве 
    введенного первого числа указываем нуль, а затем зануляем поле для вывода в калькуляторе.*/
    if (currentFirstNumber === ''
        && (resultElement.innerText === '' || resultElement.innerText === '.'
            || resultElement.innerText === '-' || resultElement.innerText === '-.')) {
        currentFirstNumber = 0;
        resultElement.innerText = '';
    };

    /*Далее указываем, что точка в поле еще не введена, так как поле было сброшено для ввода второго числа. 
    После этого сохраняем текущую выбранную операцию. Далее выводим информацию об имеющихся участниках 
    информации.*/
    ifWeHaveDot = false;
    currentOperation = operation;
    showInfo();
};

/*Это функция-подписчик, которая является обверткой для функции "doAfterChoosingOperation()".*/
function calcButtonOneListener(event) {
    /*Сначала проверяем есть ли у нас уже текущая выбранная операция на случай, если после ввода второго числа
    мы захотим сразу же выбрать следующую операцию, где первым числом будет результат текущей операции. Для
    этого мы проверяем, что у нас имеется текущее выбранное первое число и текущая выбранная операция, а
    также то, что поле для вывода в калькуляторе не пустое и не состоит из одной точки, знака минус или знака 
    минус с точкой, чтобы использовать данные введенные в поле в качестве второго числа.*/
    if (currentFirstNumber !== '' && currentOperation !== ''
        && resultElement.innerText !== '' && resultElement.innerText !== '.'
        && resultElement.innerText !== '-' && resultElement.innerText !== '-.') {
        ifWeHaveOperation = true;
    };

    /*Далее мы получаем элемент события и сохраняем у этого элемента свойства "value" в качестве операции.*/
    const elementInEvent = event.currentTarget;
    const operation = elementInEvent.value;

    /*Если у нас уже была текущая невысчитанная операция и мы выбрали следующую операцию в момент ввода второго
    числа для текущей операции, то мы сначала вычисляем текущую операцию. Если текущее введенное первое число 
    было сброшено, что означает успешное завершение операции, то результат текущей операции сохраняем как первое 
    число для следующей операции, затем последнюю выбранную операцию устанавливаем как новую текущую 
    выбранную операцию и зануляем поле для вывода, чтобы подготовить его для ввода второго числа в новой
    текущей операции. И в конце выводим информацию об участниках новой текущей операции.*/
    if (ifWeHaveOperation) {
        calculateSomething('=');

        if (currentFirstNumber === '') {
            currentFirstNumber = Number(resultElement.innerText);
            currentOperation = operation;
            resultElement.innerText = '';
            showInfo();
        };
    } else {
        doAfterChoosingOperation(operation);
    }; /*Иначе если у нас нет еще невысчитанных операций, то есть мы имеем только текущее введенное первое число, 
    то мы просто сохраняем текущую выбранную операцию.*/
};

/*Здесь мы пробегаемся по всем нашим кнопкам с операциями "+", "-", "*", ":" и подписываем их на событие "click", 
при срабатывании, которого будет вызываться функция "calcButtonOneListener()".*/
for (let i = 0; i < calcButtonOneElements.length; i++) {
    calcButtonOneElements[i].addEventListener('click', calcButtonOneListener);
};

/*-------------------------------------------------------------------------------------------------------------*/

/*Это функция для нахождения количества разрядов после запятой для правильного округления результатов операций
сложения, вычитания и умножения.*/
function findPlacesForRounding(numberOne, numberTwo, operation) {
    /*Получаем строковые представления текущих выбранных чисел.*/
    let stringNumberOne = String(numberOne);
    let stringNumberTwo = String(numberTwo);

    /*Задаем переменную, обозначающую количество разрядов после точки в результате в операциях сложения и 
    вычитания, а также схожую переменную только для операции умножения.*/
    let places = 0;
    let placesForMult = 0;

    /*------------------------*/

    /*Задаем две переменные, обозначающие есть ли в первом или втором числе точка.*/
    let ifWeHaveDotInNumberOne = false;
    let ifWeHaveDotInNumberTwo = false;

    /*Находим есть ли в первом числе точка.*/
    for (let i = 0; i < stringNumberOne.length; i++) {
        if (stringNumberOne[i] === '.') {
            ifWeHaveDotInNumberOne = true;
        };
    };

    /*Находим есть ли во втором числе точка.*/
    for (let i = 0; i < stringNumberTwo.length; i++) {
        if (stringNumberTwo[i] === '.') {
            ifWeHaveDotInNumberTwo = true;
        };
    };

    /*------------------------*/

    /*Если в первом или втором числе есть точка, то делаем следующее.*/
    if (ifWeHaveDotInNumberOne || ifWeHaveDotInNumberTwo) {
        /*Задаем две переменные, обозначающие позицию точки в первом и втором числах.*/
        let dotPositionNumberOne = 0;
        let dotPositionNumberTwo = 0;

        /*Находим номер позиции точки в первом числе.*/
        for (let i = 0; i < stringNumberOne.length; i++) {
            if (stringNumberOne[i] === '.') {
                dotPositionNumberOne = i + 1;
            };
        };

        /*Находим номер позиции точки во втором числе.*/
        for (let i = 0; i < stringNumberTwo.length; i++) {
            if (stringNumberTwo[i] === '.') {
                dotPositionNumberTwo = i + 1;
            };
        };

        /*------------------------*/

        /*Задаем две переменные, обозначающие строковые представления дробных частей первого и второго чисел.*/
        let stringDecimalPartNumberOne;
        let stringDecimalPartNumberTwo;

        /*Находим строковые представления дробных частей первого и второго чисел в зависимости от того, какие
        из этих чисел имеют дробные части. Также здесь находим количество разрядов в дробной части в операции
        умножения путем сложения количества разрядов двух дробных частей.*/
        if (ifWeHaveDotInNumberOne && ifWeHaveDotInNumberTwo) {
            stringDecimalPartNumberOne = stringNumberOne.substring(dotPositionNumberOne);
            stringDecimalPartNumberTwo = stringNumberTwo.substring(dotPositionNumberTwo);
            placesForMult = stringDecimalPartNumberOne.length + stringDecimalPartNumberTwo.length;
        } else if (ifWeHaveDotInNumberOne && !ifWeHaveDotInNumberTwo) {
            stringDecimalPartNumberOne = stringNumberOne.substring(dotPositionNumberOne);
            stringDecimalPartNumberTwo = '0';
            placesForMult = stringDecimalPartNumberOne.length;
        } else {
            stringDecimalPartNumberOne = '0';
            stringDecimalPartNumberTwo = stringNumberTwo.substring(dotPositionNumberTwo);
            placesForMult = stringDecimalPartNumberTwo.length;
        };

        console.log('stringDecimalPartNumberOne before is ' + stringDecimalPartNumberOne);
        console.log('stringDecimalPartNumberTwo before is ' + stringDecimalPartNumberTwo);

        /*------------------------*/

        /*Для правильного сложения и вычитания дробных частей нам нужно привести обе дробные части к одинаковому 
        количеству разрядов. Например, если мы складываем "0.2031" и "0.15", то нам нужно дробные части привести 
        к "2031 и 1500", то есть количество разрядов в каждой дробной части должно соотвествовать самому большому 
        количеству разрядов среди эти двух дробных частей. Поэтому здесь мы опредялем какая дробная часть 
        содержит больше разрядов, находим разницу в количестве разрядов, и благодаря этой разнице дописываем 
        нули в той дробной части, которая содержит меньше разрядов.*/
        if (stringDecimalPartNumberOne.length > stringDecimalPartNumberTwo.length) {
            let diff = stringDecimalPartNumberOne.length - stringDecimalPartNumberTwo.length;

            for (let i = 0; i < diff; i++) {
                stringDecimalPartNumberTwo += '0';
            };
        } else {
            let diff = stringDecimalPartNumberTwo.length - stringDecimalPartNumberOne.length;

            for (let i = 0; i < diff; i++) {
                stringDecimalPartNumberOne += '0';
            };
        };

        console.log('stringDecimalPartNumberOne after is ' + stringDecimalPartNumberOne);
        console.log('stringDecimalPartNumberTwo after is ' + stringDecimalPartNumberTwo);

        /*------------------------*/

        /*Задаем переменную, которая будет отображать числовое представление результата сложения или вычитания
        дробных частей.*/
        let numberDecimalResult;

        /*Высчитываем результат сложения или вычитания дробных частей.*/
        if (operation === '+') {
            numberDecimalResult = Number(stringDecimalPartNumberOne) + Number(stringDecimalPartNumberTwo);
        } else if (operation === '-') {
            numberDecimalResult = Number(stringDecimalPartNumberOne) - Number(stringDecimalPartNumberTwo);
        };

        console.log('numberDecimalResult is ' + numberDecimalResult);

        /*------------------------*/

        /*Задаем переменную, хранящуюю строковое представление результата сложения или вычитания дробных частей.*/
        let stringDecimalResult = String(numberDecimalResult);

        console.log('stringDecimalResult is ' + stringDecimalResult);

        /*Задаем переменную, обозначающую, что при пробегании по строковому представлению результата сложения или 
        вычитания дробных частей с конца в начало мы уже находили цифру отличную от нуля, так как нам нужно 
        обросить нули только после этой цифры, а не до нее. Используется дальше.*/
        let ifWeGotNotZero = false;

        /*В результате сложения или вычитания двух дробных частей иногда мы можем получить меньшее количество 
        разрядов в дробной части результата, чем любая из дробных частей чисел в операции. Например, сложение
        "1.25" и "2.35" даст "3.6", или вычитание "2.35" и "1.25" даст "1.1". На такой случай мы пробегаем по 
        строковому представлению результата сложения или вычитания дробных частей с конца в начало и проверяем 
        наличие нулей в конце, так как при выводе нам они не будут нужны, то есть мы должны вывести "3.6", а 
        не "3.60", или "1.1", а не "1.10".*/
        for (let i = 0; i < stringDecimalResult.length; i++) {
            /*Если мы нашли цифру отличную от нуля, то мы увеличиваем количество разрядов в дробной части на 1, 
            и также отдельно отмечаем, что нашли такую цифру, чтобы в дальнейшем попадать во второй блок этого 
            условия, когда наткнемся на нуль, так как от таких нулей нам уже избавляться не надо.*/
            if (stringDecimalResult[stringDecimalResult.length - 1 - i] !== '0') {
                ifWeGotNotZero = true;
                ++places;
                /*Иначе если мы найдем нуль и при этом мы уже нашли цифру отличную от нуля, то мы увеличиваем 
                количество разрядов в дробной части на 1, так как такие нули нам надо учитывать.*/
            } else if (stringDecimalResult[stringDecimalResult.length - 1 - i] === '0' && ifWeGotNotZero) {
                ++places;
            }; /*То есть, если строковое представлению результата сложения или вычитания дробных частей у нас
            получилось "1030", то мы проигнорируем последний нуль, а "103" даст нам в суммк только 3 разряда 
            в дробной части.*/
        };

        console.log('places before are ' + places);

        /*------------------------*/

        /*В результате сложения или вычитания двух дробных частей иногда мы можем получить целое число. Например, 
        если сложить "0.78" и "0.42", то мы получим "1.2". Но в нашей программе при сложении дробных частей "78" 
        и "42" мы получаем "120", где в реальном примере "100" перешло бы в целые числа, а оставшееся "20" стало 
        бы "0.2". В таком случае дробная часть в результате будет по количеству разрядов меньше, чем любая из 
        дробных частей чисел в операции. На такой случай мы проверяем больше ли по количеству разрядов дробная 
        часть результата, чем одна из дробных частей чисел в операции, и если это так, то уменьшаем количество 
        разрядов в дробной части результата на 1, чтобы избавиться в конце от лишнего нуля. То есть при сложении 
        "0.78" и "0.42" мы получим дробные части "78" и "42", сложим их и получим "120", далее определим, что 
        последний нуль лишний при подсчете разрядов дробной части и получим, что дробная часть должна иметь 2 
        разряда, когда в действительности ей нужен только один разряд - "1.2", а не "1.20". Поэтому здесь мы 
        проверим, что строка "120" больше чем строка "78" или "42", поэтому уменьшим количество разрядов в дробной 
        части до 1. 
        
        Можно рассмотреть похожий случай с вычитанием, например вычтем из "2.35" число "1.05". Вычитаем дробные
        части "35" и "5", получаем "30". Здесь также получается, что последний нуль будет лишним в дробной части
        и по логике выше мы от него в итоге избавимся при учета количества разрядов в дробной части результата,
        то есть получим "1.3", а не "1.30".
        
        Отдельная проблема может быть при вычитании. Если мы вычтем из "1" число "8.1", то мы получим "-7.1". Но 
        в нашей программе при вычитании дробных частей "0" и "1" мы получаем "-1", где в реальном примере единица 
        была бы вычтена из целой части, а оставшееся "1" стало бы "0.1". В таком случае строковое представление 
        дробной части будет длиннее, чем любая из дробных частей чисел в операции, так как будет содержать знак 
        минуса. На такой случай мы проверяем больше ли по количеству разрядов дробная часть результата, чем одна из 
        дробных частей чисел в операции, и если это так, то уменьшаем количество разрядов в дробной части результата 
        на 1, чтобы избавиться в конце от лишнего нуля. То есть при вычитании "1" и "8.1" мы получим дробные части 
        "0" и "1", вычтем их и получим "-1", далее определим, что дробная часть должна иметь 2 разряда, когда в 
        действительности ей нужен только один разрял - "-7.1", а не "-7.10". Поэтому здесь мы проверим, что строка 
        "-1" больше чем строка "0" или "1", поэтому уменьшим количество разрядов в дробной части до 1.
        
        Можно рассмотреть похожий случай с вычитанием, например вычтем из "1.05" число "2.35". Вычитаем дробные
        части "5" и "35", получаем "-30". Здесь также получается, что знак минуса будет лишним при подсчете 
        количества разрядов в дробной части и по логике выше мы от него в итоге избавимся при учета количества 
        разрядов в дробной части результата, то есть получим "-1.3", а не "-1.30".*/
        if ((operation === '+' || operation === '-') &&
            (stringDecimalResult.length > stringDecimalPartNumberOne.length
                || stringDecimalResult.length > stringDecimalPartNumberTwo.length)) {
            --places;
        };

        console.log('places after are ' + places);
    };

    /*------------------------*/

    /*Проверяем если умножали два числа и хотя бы один из них был нулем, то разрядов в дробной части должно 
    быть 0. Иначе количество разрядов в дробной части в умножении не нулевых чисел будет равно "placesForMult". 
    Иначе если у нас было сложение или вычичитание, то количество разрядов в дробной части будет равно 
    "places".*/
    if (operation === '*' && (currentFirstNumber === 0 || currentSecondNumber === 0)) {
        return 0;
    } else if (operation === '*' && currentFirstNumber !== 0 && currentSecondNumber !== 0) {
        return placesForMult;
    } else {
        return places;
    };
};

/*-------------------------------------------------------------------------------------------------------------*/

/*Это функция для вычисления какой-либо операции.*/
function calculateSomething(operation) {
    switch (operation) {
        /*Если выбрана операция добавления/удаления знака минус, то делаем следующее.*/
        case '+/-':
            /*Если в поле первый символ не знак минуса, то мы его добавляем, иначе убираем.*/
            if (resultElement.innerText[0] !== '-') {
                resultElement.innerText = '-' + resultElement.innerText;
            } else {
                let content = resultElement.innerText; /*Строки в JS "immutable", поэтому мы не можем просто 
                изменить какой-то один символ в строке, то есть нельзя сделать так 
                "resultElement.innerText[0] = '123'", нам нужно переназначить измененную версию обратно в 
                "innerText".*/
                resultElement.innerText = content.substring(1); /*Метод "substring()" возвращает подстроку 
                строки между двумя индексами, или от одного индекса и до конца строки.*/
            };

            break;

        /*Если выбрана операция сброса, то просто сбрасываем всю информацию об участниках операции.*/
        case 'C':
            resetNumbersAndOperation();
            resultElement.innerText = '';
            showInfo();
            break;

        /*Если была выбрана операция поиска ответа, то делаем следующее.*/
        case '=':
            /*Сначала провереям, что у нас есть текущее введенное первое число и поле для вывода не является
            пустым, не состоит только из точки, знака минуса или знака минуса с точкой. Если это так, то
            сохраняем то, что введено в данный момент в поле для вывода, в качестве текущего введенного второго
            числа. Иначе это второе число оставляем пустым.*/
            if (currentFirstNumber !== ''
                && resultElement.innerText !== '' && resultElement.innerText !== '.'
                && resultElement.innerText !== '-' && resultElement.innerText !== '-.') {
                currentSecondNumber = Number(resultElement.innerText);
            } else {
                currentSecondNumber = '';
            };

            /*Затем проверяем, что у нас есть текущее введенное первое число и, что текущее введенное второе
            число отсутствует, и также то, что поле для вывода состоит только из точки, знака минуса или знака 
            минуса с точкой. Если это так, то указываем 0 в качестве текущего введенного второго числа.*/
            if (currentFirstNumber !== '' && currentSecondNumber === ''
                && (resultElement.innerText === '.' || resultElement.innerText === '-'
                    || resultElement.innerText === '-.')) {
                currentSecondNumber = 0;
            };

            /*Теперь когда у нас есть текущие введеное первое число, введенное второе число и операция, мы можем
            начать рассчет.*/
            if (currentFirstNumber !== '' && currentSecondNumber !== '' && currentOperation !== '') {
                /*Создаем локальную переменную, которая будет хранить количество разрядов для десятичной части
                при рассчетах. Нужно для округления.*/
                let tempPlaces;

                switch (currentOperation) {
                    /*Если у нас операция сложения, то проверяем, что ни одно из чисел не больше 15 знаков, так
                    как JS не может нормально работать с большими числами. Если проверка не проходит, то сообщаем
                    об этом, иначе находим количество разрядов в десятичной части, производим рассчет, результат
                    указываем в поле для вывода, выводим информацию об участниках операции, а затем делаем их
                    сброс.*/
                    case '+':
                        if (currentFirstNumber > 999999999999999 || currentSecondNumber > 999999999999999) {
                            alert('One of the numbers is more than 999 999 999 999 999!');
                            showInfo();
                            break;
                        } else {
                            tempPlaces = findPlacesForRounding(currentFirstNumber, currentSecondNumber, '+');
                            /*Метод "toFixed()"" форматирует число, используя запись с фиксированной запятой.*/
                            resultElement.innerText = String((currentFirstNumber + currentSecondNumber).toFixed(tempPlaces));
                            showInfo();
                            resetNumbersAndOperation();
                            break;
                        };

                    /*Если у нас операция вычитания, то проверяем, что ни одно из чисел не больше 15 знаков, так
                    как JS не может нормально работать с большими числами. Если проверка не проходит, то сообщаем
                    об этом, иначе находим количество разрядов в десятичной части, производим рассчет, результат
                    указываем в поле для вывода, выводим информацию об участниках операции, а затем делаем их
                    сброс.*/
                    case '-':
                        if (currentFirstNumber > 999999999999999 || currentSecondNumber > 999999999999999) {
                            alert('One of the numbers is more than 999 999 999 999 999!');
                            showInfo();
                            break;
                        } else {
                            tempPlaces = findPlacesForRounding(currentFirstNumber, currentSecondNumber, '-');
                            resultElement.innerText = String((currentFirstNumber - currentSecondNumber).toFixed(tempPlaces));
                            showInfo();
                            resetNumbersAndOperation();
                            break;
                        };

                    /*Если у нас операция умножения, то проверяем, что ни одно из чисел не больше 8 знаков, так
                    как умножение таких чисел даст 16-ти значное число, а JS не может нормально работать с большими 
                    числами, и также проверяем, что ни одно из чисел не равно нулю, так как произведению с нулем всегда
                    дает нуль. Если проверка не проходит, то сообщаем об этом, иначе находим количество разрядов в 
                    десятичной части, производим рассчет, результат указываем в поле для вывода, выводим информацию 
                    об участниках операции, а затем делаем их сброс.*/
                    case '*':
                        if ((currentFirstNumber >= 99999999 || currentSecondNumber >= 99999999)
                            && (currentFirstNumber !== 0 && currentSecondNumber !== 0)) {
                            alert('One of the numbers is more than 99 999 999!');
                            showInfo();
                            break;
                        } else {
                            tempPlaces = findPlacesForRounding(currentFirstNumber, currentSecondNumber, '*');
                            resultElement.innerText = String((currentFirstNumber * currentSecondNumber).toFixed(tempPlaces));
                            showInfo();
                            resetNumbersAndOperation();
                            break;
                        };

                    /*Если у нас операция деления, то проверяем, что ни одно из чисел не больше 15 знаков, так
                    как JS не может нормально работать с большими числами. Если проверка не проходит, то сообщаем
                    об этом, иначе если второе число не является нулем, то производим рассчет, результат
                    указываем в поле для вывода, выводим информацию об участниках операции, а затем делаем их
                    сброс. Если же второе число было нулем, то выводим информацию об этом.*/
                    case ':':
                        if (currentFirstNumber > 999999999999999 || currentSecondNumber > 999999999999999) {
                            alert('One of the numbers is more than 999 999 999 999 999!');
                            showInfo();
                            break;
                        } else {
                            if (currentSecondNumber !== 0) {
                                resultElement.innerText = String(currentFirstNumber / currentSecondNumber);
                                showInfo();
                                resetNumbersAndOperation();
                                break;
                            } else {
                                alert('Do not use 0 in division!');
                                showInfo();
                                break;
                            };
                        };

                    default:
                        break;
                };
            };

        default:
            break;
    };
};

/*Это функция-подписчик, которая является обверткой для функции "calculateSomething()".*/
function calcButtonTwoListener(event) {
    /*Здесь мы получаем элемент события и сохраняем у этого элемента свойства "value" в качестве операции, а
    затем производим эту операцию.*/
    const elementInEvent = event.currentTarget;
    const operation = elementInEvent.value;
    calculateSomething(operation);
};

/*Здесь мы пробегаемся по всем нашим кнопкам с операциями "+/-", "=", "С" и подписываем их на событие "click", 
при срабатывании, которого будет вызываться функция "calcButtonTwoListener()".*/
for (let i = 0; i < calcButtonTwoElements.length; i++) {
    calcButtonTwoElements[i].addEventListener('click', calcButtonTwoListener);
};

/*-------------------------------------------------------------------------------------------------------------*/

/*Эта функция позволяет удалять данные из поля выводя в калькуляторе.*/
function removeSomething() {
    /*Сначала мы удаляем последний символ в строке.*/
    resultElement.innerText = resultElement.innerText.slice(0, -1);

    /*Затем пробегаемся по строке и проверяем осталась ли там точка. Если точка была удалена, то мы должны
    указать, что точки в числе мы на данные момент больше не имеем. Если не делать эту проверку, то удалив
    точку мы не сможем ее поставить еще раз.*/
    for (let i = 0; i < resultElement.innerText.length; i++) {
        if (resultElement.innerText[i] !== '.') {
            ifWeHaveDot = false;
        };
    };
};

/*Подписиваем нашу кнопку удаления данных на событие "click", при срабатывании, которого будет вызываться 
функция "removeSomething()".*/
eraseElement.addEventListener('click', removeSomething);

/*-------------------------------------------------------------------------------------------------------------*/

/*Здесь реализован функционал отображения информации об участниках текущей операции.*/
const currentFirstNumberIsClass = 'first-number-is';
const currentOperationIsClass = 'current-operation-is';
const currentSecondNumberIsClass = 'second-number-is';

const currentFirstNumberIsElement = document.getElementsByClassName(currentFirstNumberIsClass);
const currentOperationIsElement = document.getElementsByClassName(currentOperationIsClass);
const currentSecondNumberIsElement = document.getElementsByClassName(currentSecondNumberIsClass);

function showInfo() {
    currentFirstNumberIsElement[0].innerHTML = currentFirstNumber;
    currentSecondNumberIsElement[0].innerHTML = currentSecondNumber;
    currentOperationIsElement[0].innerHTML = currentOperation;

    console.log('First number is ' + currentFirstNumber);
    console.log('Second number is ' + currentSecondNumber);
    console.log('Operation is ' + currentOperation);
    console.log('-----------');
};

/*-------------------------------------------------------------------------------------------------------------*/

/*Здесь мы биндим кнопки на клавиатуре.*/
function enterButtonListenerWrapper(v) {
    enterButtonListener({
        currentTarget: {
            value: v
        }
    });
};

function calcButtonOneListenerWrapper(v) {
    calcButtonOneListener({
        currentTarget: {
            value: v
        }
    });
};

function calcButtonTwoListenerWrapper(v) {
    calcButtonTwoListener({
        currentTarget: {
            value: v
        }
    });
}

document.onkeydown = function (event) {
    switch (event.key) {
        case '0':
            enterButtonListenerWrapper('0');
            break;

        case '1':
            enterButtonListenerWrapper('1');
            break;

        case '2':
            enterButtonListenerWrapper('2');
            break;

        case '3':
            enterButtonListenerWrapper('3');
            break;

        case '4':
            enterButtonListenerWrapper('4');
            break;

        case '5':
            enterButtonListenerWrapper('5');
            break;

        case '6':
            enterButtonListenerWrapper('6');
            break;

        case '7':
            enterButtonListenerWrapper('7');
            break;

        case '8':
            enterButtonListenerWrapper('8');
            break;

        case '9':
            enterButtonListenerWrapper('9');
            break;

        case '.':
            enterButtonListenerWrapper('.');
            break;

        case '+':
            calcButtonOneListenerWrapper('+');
            break;

        case '-':
            calcButtonOneListenerWrapper('-');
            break;

        case '*':
            calcButtonOneListenerWrapper('*');
            break;

        case '/':
            calcButtonOneListenerWrapper(':');
            break;

        case 'm':
            calcButtonTwoListenerWrapper('+/-');
            break;

        case 'c':
            calcButtonTwoListenerWrapper('C');
            break;

        case 'Enter':
            calcButtonTwoListenerWrapper('=');
            break;

        case 'Backspace':
            removeSomething();
            break;

        default:
            return;
    };
};