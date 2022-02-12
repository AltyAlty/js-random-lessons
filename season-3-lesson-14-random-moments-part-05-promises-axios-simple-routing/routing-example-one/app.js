const menu = new MenuComponent('menu', showPage);
menu.render();

function showPage(url) {
    let page;

    switch (url) {
        case 'page1':
            page = new Page1Component('outlet');
            page.render();
            break;

        case 'page2':
            page = new Page2Component('outlet');
            page.render();
            break;

        default:
            break;
    };
};