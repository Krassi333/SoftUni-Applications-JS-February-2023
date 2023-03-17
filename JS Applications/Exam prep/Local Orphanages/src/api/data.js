import * as api from "./api.js";
import { clearUser, setUser } from "./util.js";

export async function login(data) {

    let res = await api.post('/users/login', data);
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

export async function getAllPosts() {
    return await api.get('/data/posts?sortBy=_createdOn%20desc');
}

export async function addPost(data) {
    return await api.post('/data/posts', data);
}

export async function getPostById(id) {
    return await api.get('/data/posts/' + id);

}

export async function editPost(id, data) {
    debugger
    return await api.put('/data/posts/' + id, data);
}

export async function delPost(id) {
    return await api.del('/data/posts/' + id);
}

export async function getMyPosts(userId) {
    return await api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function makeDonation(postId) {
    return await api.post('/data/donations', postId);
}

export async function getAllDonationsCount(postId) {
    return await api.get(`/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function isUserDonated(postId, userId) {
    return await api.get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

