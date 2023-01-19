/*Запросы POST, PUT, DELETE и PATCH, созданные при помощи "axios".*/
function postSomethingWithAxios() {
    const promise = axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title: 'kek',
        body: 'lol',
        userId: 102,
    });

    return promise.then((data) => {
        console.log('post with axios 1:');
        console.log(data);
    });
};

function putSomethingWithAxios() {
    const promise = axios.put(`https://jsonplaceholder.typicode.com/posts/3`, {
        id: 3,
        title: 'kok',
        body: 'lal',
        userId: 3,
    });

    return promise.then((data) => {
        console.log('put with axios 1:');
        console.log(data);
    });
};

function deleteSomethingWithAxios() {
    const promise = axios.delete(`https://jsonplaceholder.typicode.com/posts/5`);

    return promise.then((data) => {
        console.log('delete with axios 1:');
        console.log(data);
    });
};

function patchSomethingWithAxios() {
    const promise = axios.patch(`https://jsonplaceholder.typicode.com/posts/3`, {
        title: 'lul',
        body: 'kuk'
    });

    return promise.then((data) => {
        console.log('patch with axios 1:');
        console.log(data);
    });
};

postSomethingWithAxios();
putSomethingWithAxios();
deleteSomethingWithAxios();
patchSomethingWithAxios();

/*--------------------------------------------------------------------------------*/

/*Еще одна версия запросов POST, PUT, DELETE и PATCH, созданных при помощи "axios".
Более "низкоуровневая".*/
function postSomethingWithAxiosTwo() {
    const promise = axios({
        method: 'post',
        url: `https://jsonplaceholder.typicode.com/posts`,
        data: {
            title: 'kek',
            body: 'lol',
            userId: 102,
        }
    });

    return promise.then((data) => {
        console.log('post with axios 2:');
        console.log(data);
    });
};

function putSomethingWithAxiosTwo() {
    const promise = axios({
        method: 'put',
        url: `https://jsonplaceholder.typicode.com/posts/3`,
        data: {
            id: 3,
            title: 'kok',
            body: 'lal',
            userId: 3,
        }
    });

    return promise.then((data) => {
        console.log('put with axios 2:');
        console.log(data);
    });
};

function deleteSomethingWithAxiosTwo() {
    const promise = axios({
        method: 'delete',
        url: `https://jsonplaceholder.typicode.com/posts/5`
    });

    return promise.then((data) => {
        console.log('delete with axios 2:');
        console.log(data);
    });
};

function patchSomethingWithAxiosTwo() {
    const promise = axios({
        method: 'patch',
        url: `https://jsonplaceholder.typicode.com/posts/3`,
        data: {
            title: 'lul',
            body: 'kuk'
        }
    });

    return promise.then((data) => {
        console.log('post with axios 2:');
        console.log(data);
    });
};

postSomethingWithAxiosTwo();
putSomethingWithAxiosTwo();
deleteSomethingWithAxiosTwo();
patchSomethingWithAxiosTwo();

/*--------------------------------------------------------------------------------*/

/*Запросы POST, PUT, DELETE и PATCH, созданные при помощи "JQuery". Способом, указанным
здесь, можно сделать только POST-запрос.*/
function postSomethingWithJQuery() {
    const promise = $.post(`https://jsonplaceholder.typicode.com/posts`, {
        title: 'kek',
        body: 'lol',
        userId: 102,
    });

    return promise.then((data) => {
        console.log('post with JQuery 1:');
        console.log(data);
    });
};

// function putSomethingWithJQuery() {
//     const promise = $.put(`https://jsonplaceholder.typicode.com/posts/3`, {
//         id: 3,
//         title: 'kok',
//         body: 'lal',
//         userId: 3,
//     });

//     return promise.then((data) => {
//         console.log('put with JQuery 1:');
//         console.log(data);
//     });
// };

// function deleteSomethingWithJQuery() {
//     const promise = $.delete(`https://jsonplaceholder.typicode.com/posts/5`);

//     return promise.then((data) => {
//         console.log('delete with JQuery 1:');
//         console.log(data);
//     });
// };

// function patchSomethingWithAJQuery() {
//     const promise = $.patch(`https://jsonplaceholder.typicode.com/posts/3`, {
//         title: 'lul',
//         body: 'kuk'
//     });

//     return promise.then((data) => {
//         console.log('patch with JQuery 1:');
//         console.log(data);
//     });
// };

postSomethingWithJQuery();

/*--------------------------------------------------------------------------------*/

/*Еще одна версия запросов POST, PUT, DELETE и PATCH, созданных при помощи "JQuery".
Более "низкоуровневая".*/
function postSomethingWithJQueryTwo() {
    const promise = $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts`,
        type: 'POST',
        data: {
            title: 'kek',
            body: 'lol',
            userId: 102,
        }
    });

    return promise.then((data) => {
        console.log('post with JQuery 2:');
        console.log(data);
    });
};

function putSomethingWithJQueryTwo() {
    const promise = $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/3`,
        type: 'PUT',
        data: {
            id: 3,
            title: 'kok',
            body: 'lal',
            userId: 3,
        }
    });

    return promise.then((data) => {
        console.log('put with JQuery 2:');
        console.log(data);
    });
};

function deleteSomethingWithJQueryTwo() {
    const promise = $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/5`,
        type: 'DELETE',
    });

    return promise.then((data) => {
        console.log('delete with JQuery 2:');
        console.log(data);
    });
};

function patchSomethingWithJQueryTwo() {
    const promise = $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/3`,
        type: 'PATCH',
        data: {
            title: 'lul',
            body: 'kuk'
        }
    });

    return promise.then((data) => {
        console.log('patch with JQuery 2:');
        console.log(data);
    });
};

postSomethingWithJQueryTwo();
putSomethingWithJQueryTwo();
deleteSomethingWithJQueryTwo();
patchSomethingWithJQueryTwo();

/*--------------------------------------------------------------------------------*/

/*Запросы POST, PUT, DELETE и PATCH, созданные при помощи метода "fetch()".*/
async function postSomethingWithFetch() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'kek',
            body: 'lol',
            userId: 102,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('post with fetch 1:');
            console.log(json);
        });
};

async function putSomethingWithFetch() {
    fetch('https://jsonplaceholder.typicode.com/posts/3', {
        method: 'PUT',
        body: JSON.stringify({
            id: 3,
            title: 'kok',
            body: 'lal',
            userId: 3,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('put with fetch 1:');
            console.log(json);
        });
};

async function deleteSomethingWithFetch() {
    fetch('https://jsonplaceholder.typicode.com/posts/5', {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('delete with fetch 1:');
            console.log(json);
        });
};

async function patchSomethingWithFetch() {
    fetch('https://jsonplaceholder.typicode.com/posts/3', {
        method: 'PATCH',
        body: JSON.stringify({
            title: 'lul',
            body: 'kuk'
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('patch with fetch 1:');
            console.log(json);
        });
};

postSomethingWithFetch();
putSomethingWithFetch();
deleteSomethingWithFetch();
patchSomethingWithFetch();

/*--------------------------------------------------------------------------------*/

/*Запросы POST, PUT, DELETE и PATCH, созданные при помощи конструктора "XMLHttpRequest".*/
function postSomethingWithXMLHttpRequest() {
    const tempXMLHttpRequest = new XMLHttpRequest();

    /*Здесь второй параметр указывает на асинхронность работы.*/
    tempXMLHttpRequest.open('POST', `https://jsonplaceholder.typicode.com/posts`, true);

    tempXMLHttpRequest.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    tempXMLHttpRequest.onreadystatechange = function () {
        if (tempXMLHttpRequest.readyState == XMLHttpRequest.DONE &&
            (tempXMLHttpRequest.status == 200 || tempXMLHttpRequest.status == 201)) {
            console.log('post with XMLHttpRequest 1:');
            console.log(JSON.parse(tempXMLHttpRequest.response));
        };
    };

    tempXMLHttpRequest.send(JSON.stringify(
        {
            title: 'kek',
            body: 'lol',
            userId: 102,
        }
    ));
};

function putSomethingWithXMLHttpRequest() {
    const tempXMLHttpRequest = new XMLHttpRequest();

    tempXMLHttpRequest.open('PUT', `https://jsonplaceholder.typicode.com/posts/3`, true);

    tempXMLHttpRequest.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    tempXMLHttpRequest.onreadystatechange = function () {
        if (tempXMLHttpRequest.readyState == XMLHttpRequest.DONE &&
            (tempXMLHttpRequest.status == 200 || tempXMLHttpRequest.status == 201)) {
            console.log('put with XMLHttpRequest 1:');
            console.log(JSON.parse(tempXMLHttpRequest.response));
        };
    };

    tempXMLHttpRequest.send(JSON.stringify(
        {
            id: 3,
            title: 'kok',
            body: 'lal',
            userId: 3,
        }
    ));
};

function deleteSomethingWithXMLHttpRequest() {
    const tempXMLHttpRequest = new XMLHttpRequest();

    tempXMLHttpRequest.open('DELETE', `https://jsonplaceholder.typicode.com/posts/3`, true);    

    tempXMLHttpRequest.onreadystatechange = function () {
        if (tempXMLHttpRequest.readyState == XMLHttpRequest.DONE &&
            (tempXMLHttpRequest.status == 200 || tempXMLHttpRequest.status == 201)) {
            console.log('delete with XMLHttpRequest 1:');
            console.log(JSON.parse(tempXMLHttpRequest.response));
        };
    };

    tempXMLHttpRequest.send();
};

function patchSomethingWithXMLHttpRequest() {
    const tempXMLHttpRequest = new XMLHttpRequest();

    tempXMLHttpRequest.open('PATCH', `https://jsonplaceholder.typicode.com/posts/3`, true);

    tempXMLHttpRequest.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    tempXMLHttpRequest.onreadystatechange = function () {
        if (tempXMLHttpRequest.readyState == XMLHttpRequest.DONE &&
            (tempXMLHttpRequest.status == 200 || tempXMLHttpRequest.status == 201)) {
            console.log('patch with XMLHttpRequest 1:');
            console.log(JSON.parse(tempXMLHttpRequest.response));
        };
    };

    tempXMLHttpRequest.send(JSON.stringify(
        {
            title: 'lul',
            body: 'kuk'
        }
    ));
};

postSomethingWithXMLHttpRequest();
putSomethingWithXMLHttpRequest();
deleteSomethingWithXMLHttpRequest();
patchSomethingWithXMLHttpRequest();