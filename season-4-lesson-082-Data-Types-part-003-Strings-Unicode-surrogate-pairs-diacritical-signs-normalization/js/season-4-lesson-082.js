'use strict';

/*-------------------------------------------------------------------------------------------------------------------*/

/*Строки в JavaScript основаны на Юникоде: каждый символ представляет из себя последовательность байтов из 1-4 
байтов.*/

/*JavaScript позволяет нам вставить символ в строку, указав его шестнадцатеричный Юникод с помощью одной из этих трех
нотаций:

1) "\xXX"
2) "\uXXXX"
3) "\uXXXX"*/

/*"\xXX". Вместо "XX" должны быть указаны две шестнадцатеричные цифры со значением от 00 до FF. В этом случае "\xXX" -
это символ, Юникод которого равен "XX". Поскольку нотация "\xXX" поддерживает только две шестнадцатеричные цифры, ее 
можно использовать только для первых 256 символов Юникода. Эти 256 символов включают в себя латинский алфавит, 
большинство основных синтаксических символов и некоторые другие. Например, "\x7A" - это то же самое, что "z" (Юникод
U+007A).*/
console.log('\x7A'); // "z"
console.log('\xA9'); // "©"
console.log(' ');

/*"\uXXXX". Вместо "XXXX" должны быть указаны ровно 4 шестнадцатеричные цифры со значением от 0000 до FFFF. В этом 
случае "\uXXXX" - это символ, Юникод которого равен "XXXX". Символы со значениями Юникода, превышающими U+FFFF, также
могут быть представлены с помощью этой нотации, но в таком случае нам придется использовать так называемую суррогатную
пару.*/
console.log('\u00A9'); // "©"
console.log('\u044F'); // "я"
console.log('\u2191'); // "↑"
console.log(' ');

/*"\u{X…XXXXXX}". Вместо "X…XXXXXX" должно быть шестнадцатеричное значение от 1 до 6 байт от 0 до 10FFFF (максимальная
точка кода, определенная стандартом Юникод). Эта нотация позволяет нам легко представлять все существующие символы 
Юникода.*/
console.log('\u{20331}'); // "𠌱"
console.log('\u{1F60D}'); // "😍"

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Все часто используемые символы имеют 2-байтовые коды (4 шестнадцатеричные цифры). В большинстве европейских языков
буквы, цифры и основные унифицированные идеографические наборы CJK (CJK - от китайской, японской и корейской систем 
письма) имеют 2-байтовое представление. Изначально JavaScript был основан на кодировке UTF-16, которая предусматривала
только 2 байта на один символ. Однако 2 байта допускают только 65536 комбинаций, и этого недостаточно для всех 
возможных символов Юникода. Поэтому редкие символы, требующие более 2 байт, кодируются парой 2-байтовых символов, 
которые называются "суррогатной парой". Побочным эффектом является то, что длина таких символов равна 2. Это происходит
потому, что суррогатные пары не существовали в то время, когда был создан JavaScript, и поэтому они не обрабатываются
языком корректно.*/
console.log('𝒳'.length); // 2
console.log('😂'.length); // 2
console.log('𩷶'.length); // 2

/*Технически, суррогатные пары также можно определить по их кодам: если символ имеет код в интервале "0xd800...0xdbff",
то он является первой частью суррогатной пары. Вторая часть должна иметь код в интервале "0xdc00...0xdfff". Эти 
интервалы зарезервированы стандартом исключительно для суррогатных пар.*/

/*Для работы с суррогатными парами в JavaScript были добавлены методы "String.fromCodePoint()" и "str.codePointAt()". 
По сути, они аналогичны методам "String.fromCharCode()" и "str.charCodeAt()", но они правильно обрабатывают суррогатные
пары.*/
console.log('𝒳'.charCodeAt(0).toString(16)); // "d835", только первая часть
console.log('𝒳'[0].charCodeAt(0).toString(16)); // "d835", первая часть
console.log('𝒳'[1].charCodeAt(0).toString(16)); // "dcb3", вторая часть
console.log('𝒳'.codePointAt(0).toString(16)); // "1d4b3", вся пара

console.log('--------------------------------------');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Во многих языках есть символы, состоящие из основного символа и знака над или под ним. Например, буква "a" может быть
основой для этих символов: "àáâäãåā". Большинство распространенных "составных" символов имеют свой собственный код в 
таблице Юникода. Но не все, потому что существует слишком большое количество возможных комбинаций. Для поддержки любых
комбинаций стандарт Юникод позволяет нам использовать несколько Юникодных символов: основной символ, за которым следует
один или много символов-"меток" (диакритических знаков), которые "украшают" его. Например, если за "S" следует 
специальный символ "точка сверху" "\u0307", то он отобразится как "Ṡ".*/
console.log('S\u0307'); // "Ṡ"

/*Например, если мы добавим символ "точка снизу" "\u0323", то получим "Ṩ".*/
console.log('S\u0307\u0323'); // "Ṩ"

/*Это обеспечивает большую гибкость, но при этом возникает определенная проблема: два символа могут визуально выглядеть
одинаково, но при этом они будут представлены разными комбинациями Юникода.*/
let string01 = 'S\u0307\u0323'; // "Ṩ", "S" + точка сверху + точка снизу
let string02 = 'S\u0323\u0307'; // "Ṩ", "S" + точка снизу + точка сверху
console.log(string01 === string02); // false

/*Для решения этой проблемы предусмотрен алгоритм "Юникодной нормализации", приводящий каждую строку к единому 
"нормальному" виду. Его реализует метод "normalize()".*/
console.log(string01.normalize()); // "Ṩ"
console.log(string02.normalize()); // "Ṩ"
console.log(string01.normalize() === string02.normalize()); // true

/*В нашем случае метод "normalize()" "схлопывает" последовательность из трех символов в один: "\u1e68" - "S" с двумя
точками. Причина в том, что символ "Ṩ" является достаточно распространенным, поэтому создатели стандарта Юникод включили
его в основную таблицу и присвоили ему отдельный код.*/
console.log(string01.length); // 3
console.log(string02.length); // 3
console.log(string01.normalize().length); // 1
console.log(string02.normalize().length); // 1

console.log('\u1e68'); // "Ṩ"
console.log(string01.normalize() === '\u1e68'); // true
console.log(string02.normalize() === '\u1e68'); // true