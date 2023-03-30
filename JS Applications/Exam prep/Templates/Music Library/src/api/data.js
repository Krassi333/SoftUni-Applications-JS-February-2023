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

export async function getAllAlbums() {
     return await  api.get('/data/albums?sortBy=_createdOn%20desc');
}

export async function addAlbum(data) {
    return await api.post('/data/albums', data);
}

export async function getAlbumById(id) {
    return await api.get('/data/albums/' + id);
     
}

export async function editAlbum(id, data) {
    return await api.put('/data/albums/' + id, data);
}

export async function delAlbum(id) {
    return await api.del('/data/albums/' + id);
}

export async function addLike(albumId){
    return await api.post('/data/likes',{albumId});
}

export async function getAllLikes(albumId){
    return api.get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export async function didUserLikes(albumId,userId){
    return api.get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count `);
}