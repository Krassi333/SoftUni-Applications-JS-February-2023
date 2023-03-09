import * as api from './api.js';
import { clearUser, setUser } from '../util.js';



export async function login(email, password) {
    let res = await api.post('/users/login', { email, password });
    setUser(res);
    return res;
}

export async function logout() {
    let res = await api.get('/users/logout');
    clearUser();
    return res;
}

export async function register(email, password) {
    console.log('here');
    let res = await api.post('/users/register', { email, password });
    setUser(res);
    return res;
}

export async function getAllProducts() {
    return await api.get('/data/products?sortBy=_createdOn%20desc');
}

export async function addProduct(data) {
    return await api.post('/data/products', data);
}

export async function getProductById(id) {
    return await api.get('/data/products/' + id);
}

export async function editProduct(productId, data) {
    return await api.put('/data/products/' + productId, data);
}

export async function deleteProduct(productId) {
    return await api.del('/data/products/' + productId);
}


