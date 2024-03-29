const canvas = document.getElementsByClassName('canvas-one')[0];
const ctx = canvas.getContext('2d');

/*-------------------------------------------------------------------------------------------------------------------*/

/*Интерфейс "ImageData" представляет лежащие в основе пиксельные данные области холста. Он создается, используя
конструктор "ImageData()" или методы холст, например, "createImageData()" и "getImageData()". Он также может быть
использован для установки части холста, используя метод "putImageData()".

Интерфейс "ImageData" имеет следующие свойства: 
- "ImageData.data" - одномерный Uint8ClampedArray-массив, содержащий данные цветовой модели RGBA, с целыми значениями от
0 до 255 (включительно). Только для чтения.
- "ImageData.height" - фактическая высота в пикселях объекта "ImageData". Только для чтения.
- "ImageData.width" - Фактическая ширина в пикселях объекта "ImageData". Только для чтения.

Uint8ClampedArray-массив - это массив, служащий для хранения 8-битных беззнаковых чисел, обрезаемых до диапазона от 0 до
255. Если значение меньше 0, то оно будет приведено к 0, и к 255, если оно больше 255. Числа с плавающей точкой
округляются с помощью математического округления. Массив инициализируется нулями. После того как значение установлено,
вы можете ссылаться на него с помощью методов объекта или через стандартный синтаксис массивов. Для создания таких
массивов можно использовать конструктор "Uint8ClampedArray()".

Конструктор "ImageData()" создает экземпляр "ImageData". Может принимаеть следующие параметры:
- "width" - ширина изображения.
- "height", высота изображения. Является необязательным, если задан Uint8ClampedArray-массив, так как высота будет
выведена из размера массива и заданной ширины.
- "settings" - объект со свойством "colorSpace", задающим цветовое пространство данных изображения. Можно установить
значение "srgb" для цветового пространства "sRGB" или "display-p3" для цветового пространства "display-p3".
- "dataArray" - Uint8ClampedArray-массив, содержащий базовое представление изображения в пикселях. Если такой массив не
задан, будет создано изображение с прозрачным черным прямоугольником заданной ширины и высоты.*/

/*Метод "createImageData()" создает новый пустой объект "ImageData" с указанными размерами. Все пиксели в новом объекте
прозрачно-черные. Сгенерированный объект имеет ширину 100 пикселей и высоту 100 пикселей, всего 10000 пикселей. Каждый
пиксель в объекте "ImageData" состоит из четырех значений массива, поэтому свойство данных объекта имеет длину 4×10000
или 40000.*/
const imageData = ctx.createImageData(100, 100);

console.log(imageData);
console.log(imageData.data);

/*Итерируем через каждый пиксель.*/
for (let i = 0; i < imageData.data.length; i += 4) {
    /*Модифицируем данные пикселей.*/
    imageData.data[i + 0] = 190; // R value
    imageData.data[i + 1] = 0; // G value
    imageData.data[i + 2] = 210; // B value
    imageData.data[i + 3] = 255; // A value
};

console.log(imageData);
console.log(imageData.data);

/*Отрисовываем данные изображения на холсте при помощи метода "putImageData()". Может дополнительно принимаеть еще набор
из четырех параметров:
- "dirtyX" - горизонтальная позиция (координата x) верхнего левого угла, из которого будут извлечены данные изображения.
По умолчанию 0. Необязательный.
- "dirtyY" - вертикальная позиция (координата y) верхнего левого угла, из которого будут извлечены данные изображения.
По умолчанию 0. Необязательный.
- "dirtyWidth" - ширина прямоугольника для рисования. По умолчанию ширина данных изображения. Необязательный.
- "dirtyHeight" - высота прямоугольника для рисования. По умолчанию высота данных изображения. Необязательный.*/
ctx.putImageData(imageData, 20, 20);