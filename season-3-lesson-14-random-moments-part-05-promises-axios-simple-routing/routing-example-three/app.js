const menu = new MenuComponent('menu');
menu.render();

window.addEventListener('hashchange', () => showPage(document.location.hash));

function showPage(hash) {
    let page = getPage(hash);
    page.render();
};

/*Создаем объект, который будет хранить как бы закешированные версии страниц.*/
const pages = {};

function getPage(pageName) {
    if (!pageName) {
        pageName = '#page1';
    };

    if (!pages[pageName]) {
        switch (pageName) {
            case '#page1':
                pages[pageName] = new Page1Component('outlet');                
                break;

            case '#page2':
                pages[pageName] = new Page2Component('outlet');                
                break;            
        };
    };

    return pages[pageName];
};