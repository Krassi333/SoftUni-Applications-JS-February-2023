import * as api from './api.js';

let endpoint = {
    login: 'users/login',
    register: 'users/register',
    logout: 'users/logout'
}
export async function login(username, password) {
    debugger
    let user = await api.post(endpoint.login, { username, password });
    localStorage.setItem('user', JSON.stringify(user));
}

export async function register(email, password) {
    debugger
    const user = await api.post(endpoint.register, { email, password });
    localStorage.setItem('user', JSON.stringify(user));

}

export async function logout(){
   api.get(endpoint.logout);
    localStorage.removeItem('user');
}