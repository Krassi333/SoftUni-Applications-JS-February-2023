import * as api from './api.js';

const ednpoints = {
    'register': "users/register",
    'login': 'users/login',
    'logout': 'users/logout',
    'create': 'data/catalog',
    'getAllItems': 'data/catalog',
    'getItemById': 'data/catalog/'
}

export async function register(email, password) {
    let res = await api.post(ednpoints.register, { email, password });
    sessionStorage.setItem('user', JSON.stringify(res));
    return res;
}

export async function login(email, password) {
    let res = await api.post(ednpoints.login, { email, password });
    sessionStorage.setItem('user', JSON.stringify(res));
    return res;
}

export async function logout() {
    debugger
    console.log('here2');
    let res = await api.get(ednpoints.logout);
    sessionStorage.removeItem('user');
    return res;
}

export async function createItem(data) {
    let res = await api.post(ednpoints.create, data);
    return res;
}

export async function getAllItems() {
    let res = await api.get(ednpoints.getAllItems);
    return res;
}

export async function getItemDetails(id) {
    let res = await api.get(ednpoints.getItemById + id);
    return res;
}

export async function updateItem(id, data) {
    let res = await api.put(ednpoints.getItemById + id, data);
    return res;
}

export async function deleteItem(id) {
    debugger
    let res = await api.del(ednpoints.getItemById + id);
    return res;
}

export async function getMyItems() {
    let userData = JSON.parse(sessionStorage.getItem('user'));
    let userId = userData._id;
    let res = await api.get('data/catalog?where=_ownerId%3D%22' + userId + '%22');
    return res;
}

