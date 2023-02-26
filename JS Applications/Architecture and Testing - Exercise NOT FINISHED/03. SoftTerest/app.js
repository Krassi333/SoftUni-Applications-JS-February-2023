import * as api from './src/api/user.js'
import { showCatalog } from './src/views/catalog.js';
import { showCreate } from './src/views/create.js';
import { showDetails } from './src/views/details.js';
import { showHome } from './src/views/home.js';
import { showLogin } from './src/views/login.js';
import { showRegister } from './src/views/register.js';
import { initialize } from './src/router.js';

let section = document.getElementById('contentSection');
section.remove();

let links = {
    '/': showHome,
    '/login': showLogin,
    '/create': showCreate,
    '/details': showDetails,
    '/catalog': showCatalog,
    '/register': showRegister
}

let router=initialize(links);
router.goTo('/');







