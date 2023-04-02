import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { addFruitView } from './views/add.js';
import { catalogView } from './views/catalog.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';


const root = document.querySelector('main');

function decorateContext(ctx, next) {
    ctx.render = (htmlResponce) => render(htmlResponce, root);
    ctx.updateNavBar = updateNavBar;
    next();
}

function updateNavBar() {
    debugger
    let user = localStorage.getItem('user');
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
    let res = await logout();
    if (res.status == 204) {
        page.redirect('/');
        updateNavBar();
    }
});
page('/addFruit', addFruitView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/search', searchView);

page.start();