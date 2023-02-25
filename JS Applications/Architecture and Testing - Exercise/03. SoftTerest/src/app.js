import * as api from './src/api/user.js'
import showHome from './src/home.js'

let main = document.getElementById('main');

let homeView = document.getElementById('homeView');
let registerView = document.getElementById('registerView');
let loginView = document.getElementById('loginView');
let dashboard = document.getElementById('dashboard-holder');
let detailsView = document.getElementById('detailsView');
let createView = document.getElementById('createView');

let section = document.getElementById('contentSection');
section.remove();

let links = {
    '/': homeView,
    '/login': loginView,
    '/create': createView,
    '/details': detailsView,
    '/catalog': dashboard,
    '/register': registerView
}

//window.api=api;

export function showSection(section) {
    main.replaceChildren(section);
}

//showSection(homeView);






