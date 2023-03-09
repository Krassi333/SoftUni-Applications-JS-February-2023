import page from '../node_modules/page/page.mjs';
import { registerView } from './views/register.js';
import { render } from '../node_modules/lit-html/lit-html.js';
import { loginView } from './views/login.js';
import { catalogView } from './views/catalog.js';
import { homepageView } from './views/homepage.js';
import { addProductView } from './views/addProduct.js';
import { logout } from './api/data.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';


const root = document.querySelector('main');

function decorateCtx(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateNavBar = updateNavBar;
    next();
}

function updateNavBar() {
    let user = localStorage.getItem('user');

    if (user) {
        document.querySelector('div.user').style.display = 'inline-block';
        document.querySelector('div.guest').style.display = 'none';
    } else {
        document.querySelector('div.user').style.display = 'none';
        document.querySelector('div.guest').style.display = 'inline-block';
    }
}


page(decorateCtx);

page('/', homepageView);
page('/register', registerView);
page('/login', loginView);
page('/catalog', catalogView);
page('/addProduct', addProductView);
page('/logout', () => {
    logout();
    page.redirect('/catalog');
});
page('/details/:id', detailsView);

page('/edit/:id', editView);


page.start();