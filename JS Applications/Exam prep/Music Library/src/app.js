
import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { catalogView } from './views/catalog.js';
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


page(decorateContext);

page.redirect('/home');

page('/home', homeView);
page('/login', loginView)
page('/register', registerView);
page('/catalog', catalogView);
page('/logout', () => {
    logout();
    page.redirect('/catalog');
})


page.start();