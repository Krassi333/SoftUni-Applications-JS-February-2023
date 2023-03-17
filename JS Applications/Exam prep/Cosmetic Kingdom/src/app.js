import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {  logout } from './api/data.js';
import { getUser } from './api/util.js';
import { addProductView } from './views/addProduct.js';
import { catalogView } from './views/catalog.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';


const root = document.querySelector('main');

function decorateContext(ctx, next) {
    ctx.render = (htmlResponce) => render(htmlResponce, root);
    ctx.updateNavBar = updateNavBar;
    next();
}

function updateNavBar() {
    //debugger
    let user = getUser();
    let userSection = document.querySelector('div.user');
    let guestSection = document.querySelector('div.guest');

    if (user) {
        userSection.style.display = 'inline-block';
        guestSection.style.display = 'none';
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'inline-block';
    }
}

updateNavBar();
page(decorateContext);

page.redirect('/');

page('/login', loginView);
page('/', homeView);
page('/register', registerView);
page('/catalog', catalogView);
page('/logout', async () => {
    await logout();
    page.redirect('/catalog');
    updateNavBar();

});
page('/addProduct', addProductView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();