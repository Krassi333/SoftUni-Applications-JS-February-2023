import * as api from "./api.js";
import { clearUser, setUser } from "./util.js";

export async function login(email, password) {

    let res = await api.post('/users/login', { email, password });
    setUser(res);
    return res;
}

export async function register(email, password) {
    let res = await api.post('/users/register', { email, password });
    setUser(res);
    return res;
}

export async function logout() {
    let res = await api.get('/users/logout');
    clearUser();
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

export async function editProduct(id, data) {
    return await api.put('/data/products/' + id, data);
}

export async function delProduct(id) {
    return await api.del('/data/products/' + id);
}

export async function addBuy(productId) {
    return await api.post('/data/bought', {productId});
}

export async function getAllBuysForThisProduct(productId) {
    return api.get(`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`);
}

export async function getMyBuys(productId, userId) {
    return api.get(`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}