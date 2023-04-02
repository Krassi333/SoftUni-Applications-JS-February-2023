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

export async function getAllFruits() {
    return await api.get('/data/fruits?sortBy=_createdOn%20desc');
}

export async function addFruit(data) {
    return await api.post('/data/fruits', data);
}

export async function getFruitById(id) {
    return await api.get('/data/fruits/' + id);

}

export async function editFruit(id, data) {
    return await api.put('/data/fruits/' + id, data);
}

export async function delFruit(id) {
    return await api.del('/data/fruits/' + id);
}

export async function search(query) {
    return await api.get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
    ///data/cars?where=year%3D${query}
}