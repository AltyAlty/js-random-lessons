/*GET-запрос при помощи "JQuery" и callback-функции.*/
function getImageDataWithJQueryAndCallback(imageID, callback) {
    $.ajax(`https://jsonplaceholder.typicode.com/photos/${imageID}`, {
        /*Вторым параметром здесь передается объект со свойством "success". 
        Это свойство нужно для обработки успешного завершения запроса. 
        Запрос вернет промис, и если этот промис завершится успешно, то
        сработает наш callback, в который будет передан ответ от сервера.*/
        success: function (data) {
            callback(data);
        }
    });
};

/*Аналогичный GET-запрос при помощи "JQuery" и промиса.*/
function getImageDataWithJQueryAndPromise(imageID) {    
    /*То, что вернет промис, который в свою очередь вернется запросом, мы сохраняем 
    в отдельную переменую.*/
    const promise = $.ajax(`https://jsonplaceholder.typicode.com/photos/${imageID}`);

    /*И возвращаем дальше результат промиса, в котором при успешном завешении будет
    находится ответ от сервера.*/
    return promise;
};

/*Аналогичный GET-запрос при помощи "axios" и промиса.*/
function getImageDataWithAxios(imageID) {
    /*То, что вернет промис, который в свою очередь вернется запросом, мы сохраняем 
    в отдельную переменую.*/
    const promise = axios.get(`https://jsonplaceholder.typicode.com/photos/${imageID}`);

    /*И возвращаем дальше результат промиса, в котором при успешном завешении будет
    находится ответ от сервера, при помощи метода "then()".*/
    return promise.then((data) => {
        return data.data;
    });
};