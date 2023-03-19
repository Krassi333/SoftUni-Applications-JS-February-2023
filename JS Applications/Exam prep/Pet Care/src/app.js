import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';


const root = document.getElementById('content');

function decorateContext(ctx, next) {
    ctx.render = (htmlResponce) => render(htmlResponce, root);
    ctx.updateNavBar = updateNavBar;
    next();
}

function updateNavBar() {
    //debugger
    let user = localStorage.getItem('user');
    const liElements=document.querySelectorAll('li');

    if (user) {
        liElements[2].style.display = 'none';
        liElements[3].style.display = 'none';

        liElements[4].style.display = 'inline-block';
        liElements[5].style.display = 'inline-block';
    } else {
        liElements[2].style.display = 'inline-block';
        liElements[3].style.display = 'inline-block';

        liElements[4].style.display = 'none';
        liElements[5].style.display = 'none';
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
    updateNavBar();
    page.redirect('/');
});
page('/createPostcard', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();