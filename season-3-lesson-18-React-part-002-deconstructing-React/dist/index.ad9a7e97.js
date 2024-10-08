/*
1. npm install typescript parcel -D

2. добавить в package.json:

"scripts": {
   ...
   "tsc": "tsc"
},

3. npm run tsc -- --init

4. изменение tsconfig.json:

...
"jsx": "react",
...
"strict": false,
...

5. npx parcel index.html
*/ /*-------------------------------------------------------------------------------------------------------------*/ let React = {
    /*Метод "React.createElement()" должен получать JSX и выдать наружу элемент для отрисовки. При запуске
    приложения автоматически запускается с каждой переменной и функцией, указанно в коде. Переменные
    преобразуются в объект, обозначающий React-элемент. функции преобразуются в объект, обозначающий 
    React-компонент, что в JSX мы указываем как тег, например "<App />".*/ createElement: (tag, props, ...children)=>{
        if (typeof tag === 'function') try {
            return tag(props);
        } catch ({ promise , key  }) {
            promise.then((data)=>{
                promiseCache.set(key, data);
                rerender();
            });
            return {
                tag: "h1",
                props: {
                    children: [
                        "I AM LOADING"
                    ]
                }
            };
        }
        /*Формируем объект, обозначающий React-элемент.*/ const element = {
            tag,
            props: {
                ...props,
                children
            }
        };
        // console.log(element);
        /*Возвращаем наружу сформированный React-элемент.*/ return element;
    }
};
/*-------------------------------------------------------------------------------------------------------------*/ /*Если использовать JSX, например, без React, то будет ошибка, говорящая о тому, что необходимо орпеделить React. 
Поэтому мы определили его выше. Но далее появится еще одна ошибка о том, что метод "React.createElement()" не 
определена. Поэтому здесь мы также определяем и этот метод выше. Этот метод принимает три аргумента: тэг, props 
и дочерние элементы. В соответствии с этими аргументами можно вывести информацию о наших элементах JSX в 
консоль и увидеть таким образом дерево нашего проекта. Примерно так и формируется виртуальный DOM - объект с 
дочерними элементами.

Переменная "abc" это только лишь React-элемент, далее ниже мы уже создаем компонент "App".*/ const abc = /*#__PURE__*/ React.createElement("div", {
    className: "react-2020",
    __source: {
        fileName: "index.tsx",
        lineNumber: 72,
        columnNumber: 13
    },
    __self: this
}, /*#__PURE__*/ React.createElement("h1", {
    __source: {
        fileName: "index.tsx",
        lineNumber: 73,
        columnNumber: 5
    },
    __self: this
}, "Hello, not a person!"), /*#__PURE__*/ React.createElement("p", {
    __source: {
        fileName: "index.tsx",
        lineNumber: 74,
        columnNumber: 5
    },
    __self: this
}, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt ut quod tempore beatae! Vitae necessitatibus voluptatibus dicta rem repudiandae eligendi, aut doloribus omnis atque, quo aliquid libero in itaque accusamus."));
/*-------------------------------------------------------------------------------------------------------------*/ /*Это наш "state".*/ const states = [];
/*Наш "state" это массив, который содержится из как бы множества сдвигаемых частей, то есть каждый элемент
массива обозначает какую-то часть "state". Поэтому мы будем здесь использовать курсор, для перемещения по 
"state". Например, вызвав этот хук первый раз мы под первым эдементом массива сохраним имя пользователя и
сдвигаем курсор на 1, затем вызвав второй раз этот хук мы уже под вторым элементом, так как курсор сдвинули,
сохраним данные счетчика. Вызывая сеттеры этого хука мы курсор уже сдвигать не будем, что позволит хранить
и изменять данные под одними и тем же курсорами.*/ let stateCursor = 0;
/*Определяем хук "useState". Этот хук получает изначальный "state" и возвращает
массив, содержащий "state" и сеттер для этого значения.*/ const useState = (initialState)=>{
    /*Получаем текущий курсор "state" и сохраняем его отдельно для каждой новой части "state", чтобы какая-то 
    часть "state" и сеттер для изменения этой части "state" работали по одному и тому же курсору. Далее по 
    этому курсору в "state" сохраняем какие-то данные.*/ const FROZENCURSOR = stateCursor;
    /*Если "state" по какому-то курсору уже существовал, то его и сохраняем, иначе сохраняем переданный
    "state". Это нам нужно, чтобы после перерисовки компонента не сбрасывались значения "state".*/ states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;
    /*Сеттер получает новый "state", записывает его в текущий "state" по нужному курсору, и вызывает 
    перерисовку.*/ const setState = (newState)=>{
        states[FROZENCURSOR] = newState;
        console.log(states);
        rerender();
    };
    /*Записав данные по курсору в "state" и определив для этих данных сеттер, сдвигаем курсор вперед.*/ stateCursor++;
    /*Возвращаем наружу "state" по определенному курсору и сеттер для изменения этой части "state"*/ return [
        states[FROZENCURSOR],
        setState
    ];
};
/*-------------------------------------------------------------------------------------------------------------*/ const promiseCache = new Map();
/*В React есть функция "createResource()", при помощи которой можно обвернуть промисы и создать ресурс на их
основе. Эта функция принимает два параметра - что-то, что возвращает промис, и уникальный ключ для данных, 
полученных в результате этого промиса. В этой функции мы должны отслеживать зарезольвился ли промис, то есть 
готовы ли данные. Для такого отслеживания мы создали коллекцию ключ/значение "promiseCache" выше.*/ const createResource = (thingThatReturnsASomething, key)=>{
    /*Если наш кэш промисов имеет указанный ключ, то мы возвращаем значение этого ключа.*/ if (promiseCache.has(key)) return promiseCache.get(key);
    /*Если наш кэш промисов не имеет указанный ключ, то мы выкидываем объект, содержащий промис и ключ.
    Для получения промиса мы вызываем переданную функцию.*/ throw {
        promise: thingThatReturnsASomething(),
        key
    };
};
/*-------------------------------------------------------------------------------------------------------------*/ /*Здесь мы уже создаем React-компонент, поэтому используем функцию, а не переменную.*/ const App = ()=>{
    /*Здесь мы используем хук "useState", который мы определили выше.*/ const [name, setName] = useState("person");
    const [count, setCount] = useState(0);
    /*Далее пример использования хука в условии. В этом примере работа хука будет непредсказуема, поэтому
    хуки в условиях не используются.*/ // let count = 451;
    // let setCount = () => {};
    // if (Math.random() > .5) {
    //     [count, setCount] = useState(0);
    // };
    /*В React разрабатывается "concurrent mode" (конкурентный режим), который позволяет осуществлять 
    асинхронную отрисовку. В этом режим может приостанавливаться отрисовка компонента, если необходимо дождаться 
    завершения какой-то асинхронной операции, например, промиса или запроса. На данный момент это все еще 
    эскперементальный функционал.
    
    Здесь вызываем функцию "createResource()", передав функцию, которая делает запрос, во время которого
    будет создан промис, что добавит асинхронности в наш код. Также вторым параметром для функции
    "createResource()" мы указываем уникальный ключ для данных, которые будут получены, когда
    промис зарезольвится.*/ const dogPhotoUrl = createResource(()=>fetch('https://dog.ceo/api/breeds/image/random').then((r)=>r.json()
        ).then((payload)=>payload.message
        )
    , "dogPhoto");
    /*Компонент должен возвращать JSX.*/ return /*#__PURE__*/ React.createElement("div", {
        className: "react-2020",
        __source: {
            fileName: "index.tsx",
            lineNumber: 166,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h1", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 167,
            columnNumber: 13
        },
        __self: this
    }, "Hello, ", name, "!"), /*#__PURE__*/ React.createElement("input", {
        value: name,
        onchange: (e)=>setName(e.target.value)
        ,
        type: "text",
        placeholder: "name",
        __source: {
            fileName: "index.tsx",
            lineNumber: 168,
            columnNumber: 13
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("h2", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 169,
            columnNumber: 13
        },
        __self: this
    }, "The count is: ", count), /*#__PURE__*/ React.createElement("img", {
        alt: "GOOD BOYEE",
        src: dogPhotoUrl,
        __source: {
            fileName: "index.tsx",
            lineNumber: 170,
            columnNumber: 13
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count + 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 171,
            columnNumber: 13
        },
        __self: this
    }, "+"), /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>setCount(count - 1)
        ,
        __source: {
            fileName: "index.tsx",
            lineNumber: 172,
            columnNumber: 13
        },
        __self: this
    }, "-"), /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 173,
            columnNumber: 13
        },
        __self: this
    }, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem voluptates porro consectetur assumenda architecto pariatur, mollitia dolore ipsa neque, natus et quis! Temporibus quos et ipsa tenetur. Ab, sapiente cupiditate?"));
};
/*-------------------------------------------------------------------------------------------------------------*/ /*Определим функцию, которая будет отвечать за отрисовку. Эта функция должна принимать React-элемент и контейнер,
в котором нужно отрисовать этот React-элемент. Благодаря этой функции виртуальный DOM встраивается в обычный 
DOM.*/ const render = (reactElementOrStringOrNumber, container)=>{
    /*Помимпо React-элементов, в функцию отрисовки могут быть переданы строки и числа, например, в 
    качестве дочерних элементов в виде текста у HTML-элементов. Поэтому мы здесь проверяем, что
    если переданный первый параметр имеет тип строки или числа, то мы переводи в строку этот
    параметр, затем на его основе этого создаем новый текстовой узел, и в конце добавляем
    этот узел в указанный контейнер. После этого завершаем отрисовку.*/ if ([
        "string",
        "number"
    ].includes(typeof reactElementOrStringOrNumber)) {
        container.appendChild(document.createTextNode(String(reactElementOrStringOrNumber)));
        return;
    }
    /*Создаем в DOM новый HTML-элемент на основе тега, указанного в переданном React-элементе.*/ const actualDomElement = document.createElement(reactElementOrStringOrNumber.tag);
    /*Если в переданном React-элементе указаны какие-либо "props", то мы берем их ключи,
    берем из них те, которые не являются дочерними элементами, и затем для каждого из них
    создаем атрибут для указанного React-элемента.*/ if (reactElementOrStringOrNumber.props) Object.keys(reactElementOrStringOrNumber.props).filter((p)=>p !== "children"
    ).forEach((p)=>actualDomElement[p] = reactElementOrStringOrNumber.props[p]
    );
    /*Если в переданном React-элементе указаны какие-либо дочерние элементы, то мы рекурсивно
    отрисовываем их внутри указанного React-элемента. Нужно обратить внимание здесь на то, что
    контейнер в данном случае уже является сам HTML-элемент, соотвествующий переданному
    React-элементу, чтобы была сохранена структура дерева виртуального DOM.*/ if (reactElementOrStringOrNumber.props.children) reactElementOrStringOrNumber.props.children.forEach((child)=>render(child, actualDomElement)
    );
    /*И в итоге добавляем наполненый HTML-элемент в DOM.*/ container.appendChild(actualDomElement);
};
/*Определим функцию для перерисовки. Для перерисовки мы удаляем первый дочерний элемент
в контейнере, то есть наш компонент "App", и затем отрисовываем этот компонент заного. Также здесь
мы сбрасываем курсор, так как если мы будем вызывать перерисовку компонента при использовании сеттеров 
из хука "useState" и не будем сбрасывать курсор, то курсор постоянно будет сдвигаться дальше, так как
при отрисовке компонента мы каждый раз вызываем хук "useState", что может привести к тому, что, например,
при первой отрисовке имя пользователя сохранится под курсором "0", а данные счетчика под курсором "1",
далее при перерисовке имя пользователя сохранится под курсором "2", а данные счетчика под курсором "3",
когда нам нужно, чтобы каждая часть "state" оставалась под одним и тем же курсором.*/ const rerender = ()=>{
    stateCursor = 0;
    document.querySelector("#app").firstChild.remove();
    render(/*#__PURE__*/ React.createElement(App, {
        __source: {
            fileName: "index.tsx",
            lineNumber: 230,
            columnNumber: 12
        },
        __self: this
    }), document.querySelector("#app"));
};
/*Вызываем функию для отрисовки, передав ей компонет JSX и элемент, в котором нужно отрисовать нужный компонент.
На самом деле любой "id" в HTML-разметке это глобальный объект, поэтому вторым параметром можно было указать
"window.app", но так лучше не делать.*/ render(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "index.tsx",
        lineNumber: 236,
        columnNumber: 8
    },
    __self: this
}), document.querySelector("#app")); /*React-элементы, которые не являются компонентами, тоже можно отрисовать, только не в виде тега.*/  // render(abc, document.querySelector("#app"));

//# sourceMappingURL=index.ad9a7e97.js.map
