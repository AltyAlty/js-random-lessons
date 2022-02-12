const menu = new MenuComponent('menu');
menu.render();

/*Если измениться часть URL следующая за символом "#"", то будет вызываться функция "showPage()" с этой частью URL.*/
window.addEventListener('hashchange', () => showPage(document.location.hash));

function showPage(hash) {
    let page;

    switch (hash) {
        case '#page1':
            page = new Page1Component('outlet');
            page.render();
            break;

        case '#page2':
            page = new Page2Component('outlet');
            page.render();
            break;

        default:
            break;
    };
};