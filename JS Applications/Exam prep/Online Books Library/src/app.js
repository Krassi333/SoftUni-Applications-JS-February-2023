import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { loginView } from './views/login.js';
import { catalogView } from './views/catalog.js';
import { registerView } from './views/register.js';
import { detailsView } from './views/details.js';
import { createView } from './views/create.js';
import { myBooksView } from './views/myBooks.js';

const root = document.getElementById('site-content');

function decoratectx(ctx, next) {
    ctx.render = (htmlResult) => render(htmlResult, root);
    ctx.uppdateNavBar = uppdateNavBar;
    next();
}

function uppdateNavBar() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        document.getElementById('guest').style.display = 'none';
        document.getElementById('user').style.display = 'inline-block';
        document.querySelector('#user span').textContent = `Welcome, ${user.email}`;
    } else {
        document.getElementById('guest').style.display = 'inline-block';
        document.getElementById('user').style.display = 'none';
    }
}

page(decoratectx);

page('/', catalogView);
page('/login', loginView);
page('/register', registerView);
//page('/details', detailsView);
page('/addBook', createView);
page('/myBooks', myBooksView);
//debugger
page('/details/:id',detailsView);

page.start();