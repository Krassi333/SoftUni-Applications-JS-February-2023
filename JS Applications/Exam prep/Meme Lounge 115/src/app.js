import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout } from './api/data.js';
import { addMemeView } from './view/addMeme.js';
import { catalogView } from './view/catalog.js';
import { detailsView } from './view/details.js';
import { editView } from './view/edit.js';
import { homeView } from './view/home.js';
import { loginView } from './view/login.js';
import { myMemesView } from './view/myMemes.js';
import { registerView } from './view/register.js';


const root = document.querySelector('main');

function decorateContext(ctx, next) {
    ctx.render = (htmlResponce) => render(htmlResponce, root);
    ctx.updateNavBar = updateNavBar;
    next();
}

function updateNavBar() {
    debugger
    let user =JSON.parse(localStorage.getItem('user')) ;
    let userSection = document.querySelector('div.user');
    let guestSection = document.querySelector('div.guest');
    let userName = document.querySelector('.profile span');

    if (user) {
        userSection.style.display = 'inline-block';
        guestSection.style.display = 'none';
        console.log(user);
        userName.textContent=`Welcome, ${user.username}`
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'inline-block';
    }
}

updateNavBar();
page(decorateContext);

page.redirect('/home');

page('/login', loginView);
page('/home', homeView);
page('/register', registerView);
page('/catalog', catalogView);
page('/logout', async () => {
    let res = await logout();
    if (res.status == 204) {
        page.redirect('/home');
        updateNavBar();
    }
});
page('/addMeme', addMemeView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/myMemes', myMemesView);


page.start();