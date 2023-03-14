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

export async function getAllItems() {
     return await  api.get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function addItem(data) {
    return await api.post('/data/shoes', data);
}

export async function getItemById(id) {
    debugger
    let el=await api.get('/data/shoes/' + id);
    return el;
}

export async function editItem(id, data) {
    return await api.put('/data/shoes/' + id, data);
}

export async function delItem(id) {
    return await api.del('/data/shoes/' + id);
}