import page from '../node_modules/page/page.mjs';
import { showCatalog } from '../views/catalog.js';
import { showCreate } from '../views/create.js';
import { showDetails } from '../views/details.js';
import { showEdit } from '../views/edit.js';
import { showLogin } from '../views/login.js';
import { showMyFurnitures } from '../views/my-furniture.js';
import { showRegister } from '../views/register.js';

const root = document.getElementById('root');

page('/', showCatalog);
page('/create', showCreate);
page('/details/:itemId', showDetails);
page('/edit/:itemId', showEdit);
page('/login', showLogin);
page('/my-furniture', showMyFurnitures);
page('/register', showRegister);

page.start();

