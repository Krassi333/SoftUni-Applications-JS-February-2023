import * as api from "./api.js";
import { clearUser, setUser } from "./util.js";

export async function login(email, password) {
    let res = await api.post('/users/login', { email, password });
    setUser(res);
    return res;
}

export async function register(data) {
    let res = await api.post('/users/register', data);
    setUser(res);
    return res;
}

export async function logout() {
    let res = await api.get('/users/logout');
    clearUser();
    return res;
}

export async function getAllMemes() {
     return await  api.get('/data/memes?sortBy=_createdOn%20desc');
}

export async function addMeme(data) {
    return await api.post('/data/memes', data);
}

export async function getMemeById(id) {
    return await api.get('/data/memes/' + id);
     
}

export async function editMeme(id, data) {
    return await api.put('/data/memes/' + id, data);
}

export async function delMeme(id) {
    return await api.del('/data/memes/' + id);
}

export async function getMyMemes(userId){
    return await api.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}