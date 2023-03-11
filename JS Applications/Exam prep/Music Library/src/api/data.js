import * as api from "./api";
import { clearUser, setUser } from "./util";

export async function login(email, password) {
    let res = await api.post('/users/login', { email, password });
    setUser(res);
    return res;
}

export async function register(email, password) {
    return res = await api.post('/users/register', { email, password });
}

export async function logout() {
    let res = await api.del('/users/logout');
    clearUser();
    return res;
}

export async function getAllAlbums() {
    return await api.get('/data/albums?sortBy=_createdOn%20desc');
}

export async function addAlbum(data) {
    return await api.post('/data/albums', data);
}

export async function getAlbumById(id) {
    return api.get('/data/albums/' + id);
}

export async function editAlbum(id, data) {
    return api.post('/data/albums/' + id, data);
}

export async function delAlbum(id) {
    return await api.del('/data/albums/' + id);
}