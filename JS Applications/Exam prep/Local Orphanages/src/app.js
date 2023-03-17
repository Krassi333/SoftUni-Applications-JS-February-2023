import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { catalogView } from './views/catalog.js';
import { createPostView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { myPostsView } from './views/myPosts.js';
import { registerView } from './views/register.js';


console.log('app');
const root = document.getElementById('main-content');

function decorateContext(ctx, next) {
    ctx.render = (htmlResponce) => render(htmlResponce, root);
    ctx.updateNavBar = updateNavBar;
    next();
}

function updateNavBar() {
    //debugger
    let user = localStorage.getItem('user');
    let userSection = document.querySelector('div#user');
    let guestSection = document.querySelector('div#guest');

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
//page('/', homeView);
page('/register', registerView);
page('/catalog',catalogView);
page('/logout', async () => {
    await logout();
    page.redirect('/catalog');
    updateNavBar();

});
page('/create', createPostView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/myPosts', myPostsView);


page.start();