import page from '../node_modules/page/page.mjs';
import { showCatalog } from '../views/catalog.js';
import { showCreate } from '../views/create.js';
import { showDetails } from '../views/details.js';
import { showEdit } from '../views/edit.js';
import { showLogin } from '../views/login.js';
import { showMyFurnitures } from '../views/my-furniture.js';
import { showRegister } from '../views/register.js';
import { logout } from './data.js';

const logoutBtn = document.getElementById('logoutBtn');

//logoutBtn.addEventListener('click', async (e) => {
   // e.preventDefault();
   // console.log('here');
    //debugger
   // logout();
  //  navBar();
//})


export function navBar() {
    debugger
    const user = JSON.parse(sessionStorage.getItem('user'));
    const guestMenu = document.getElementById('guest');
    const myFurnitureBtn = document.getElementById('profileLink');
    const createBtn = document.getElementById('createLink');
    const logout_btn = document.getElementById('logoutBtn');

    if (user) {
        guestMenu.style.display = 'none';
        myFurnitureBtn.style.display = 'inline-block';
        createBtn.style.display = 'inline-block';
        logout_btn.style.display = 'inline-block';
    } else {
        guestMenu.style.display = 'inline-block';
        myFurnitureBtn.style.display = 'none';
        createBtn.style.display = 'none';
        logout_btn.style.display = 'none';

    }
}






page('/', showCatalog);
page('/create', showCreate);
page('/details/:itemId', showDetails);
page('/edit/:itemId', showEdit);
page('/login', showLogin);
page('/my-furniture', showMyFurnitures);
page('/register', showRegister);

page.start();

// TO DO logout and nav bar ?