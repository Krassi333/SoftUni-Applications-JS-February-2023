import * as api from './api.js'

const endpoints = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': 'users/logout',
    'addBook': 'data/books',
    'getAllBooks': 'data/books',
    'bookDetails': 'data/books/',
    'editBook': 'data/books/',
    'deleteBook': 'data/books/'
}

export async function register(email, password) {
    
    let res =await api.post(endpoints.register, { email, password });
    localStorage.setItem('user', JSON.stringify(res));
    return res;
}

export async function login(email, password) {
    let res = await api.post(endpoints.login, { email, password });
    console.log(res);
    localStorage.setItem('user', JSON.stringify(res));
    return res;
}

export async function logout() {
    let res = await api.get(endpoints.logout);
    localStorage.removeItem('user');

}

export async function addBook(data) {
    let res = await api.post(endpoints.addBook, data);
    return res;
}

export async function catalog() {
    let res = await api.get(endpoints.getAllBooks);
    console.log(res);
    return res;
}

export async function getBookDetails(id) {
    let res = await api.get(endpoints.bookDetails + id);
    return res;
}

export async function editBook(id) {
    let res = await api.post(endpoints.editBook + id);
    return res
}

export async function deleteBook(id) {
    let res = await api.del(endpoints.deleteBook + id);
    return res;
}


export async function myBooks(userId) {
    let res = await api.get(`data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return res;
}
