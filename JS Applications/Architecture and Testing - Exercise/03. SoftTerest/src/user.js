import * as api from './api.js';

let endpoint = {
    login: 'users/login',
    register: 'user/register',
    logout: 'user/logout'
}
export async function login(username, password) {
    let user = await api.post(endpoint.login, { username, password });
    localStorage.setItem('user', JSON.stringify(user));
}

export async function register(email, password) {
    const user = await api.post(endpoint.register, { email, password });
    localStorage.setItem('user', JSON.stringify(user));

}

export async function logout(){
   await api.get(endpoint.logout);
    localStorage.removeItem('user');
}