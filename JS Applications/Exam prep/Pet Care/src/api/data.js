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

export async function getAllPostcards() {
     return await  api.get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function addPostcard(data) {
    return await api.post('/data/pets', data);
}

export async function getPostcardById(id) {
    return await api.get('/data/pets/' + id);
     
}

export async function editPostcard(id, data) {
    console.log(data);
    return await api.put('/data/pets/' + id, data);
}

export async function delPostcard(id) {
    return await api.del('/data/pets/' + id);
}

//TO DO
export async function addDonation(petId){
    return await api.post('/data/donation',petId);
}

export async function getAllDonations(petId){
    return api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function didUserDonate(petId,userId){
    return api.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}