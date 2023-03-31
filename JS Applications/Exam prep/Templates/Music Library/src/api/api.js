import { getUser } from './util.js';

const baseURL = 'http://localhost:3030';


async function request(url, options) {
    //debugger
    try {
        let res = await fetch(baseURL + url, options);

        if (res.ok == false) {
            let err = await res.json();
            throw new Error(err.message);
        }

        if (res.status == 204) {
            return res;
        } else {
            return await res.json();
        }
    } catch (error) {
        alert(error.message);
    }
}

function getOptions(method, body) {
    //debugger
    let option = {
        method,
        headers: {}
    }

    if (body) {
        option.body = JSON.stringify(body);
        option.headers['Content-Type'] = 'application/json';
    }

    const user = getUser();

    if (user) {
        option.headers['X-Authorization'] = user.accessToken;
    }

    return option;
}

export async function get(url) {
    return request(url, getOptions('GET'));
}

export async function put(url, data) {
    return request(url, getOptions('PUT', data));
}

export async function post(url, data) {
    return request(url, getOptions('POST', data));
}

export async function del(url) {
    return request(url, getOptions('DELETE'));
}