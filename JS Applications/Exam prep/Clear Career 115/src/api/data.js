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

export async function getAllOffers() {
     return await  api.get('/data/offers?sortBy=_createdOn%20desc');
}

export async function addOffer(data) {
    return await api.post('/data/offers', data);
}

export async function getOfferById(id) {
    return await api.get('/data/offers/' + id);
     
}

export async function editOffer(id, data) {
    return await api.put('/data/offers/' + id, data);
}

export async function delOffer(id) {
    return await api.del('/data/offers/' + id);
}

export async function addApplication(offerId){
    return await api.post('/data/applications',{offerId});
}

export async function getAllAplications(offerId){
    return api.get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function didUserApplied(offerId,userId){
    return api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}