import { getUser } from "../util.js";

const baseURL = 'http://localhost:3030';

async function request(url, options) {
debugger
    try {
        let res = await fetch(baseURL + url, options);

        if (res.ok == false) {
            let error = res.json();
            throw new Error(error.mesage);
        } 

        if (res.status == 204) {
            return res;
        } else {
           return  res.json(); 
        }



    } catch (error) {
        alert(error.mesage);

    }
}

 function getOption(method = 'GET', body) {
    debugger
    let option = {
        method,
        headers: {}
    }

    if (body) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(body);
    }

    let user = getUser();
    if (user) {
        option.headers['X-Authorization'] = user.accessToken;
    }
//console.log(option);
    return option;
}

export async function get(url) {
    let res = await request(url, getOption());
    return res;
}

export async function post(url, data) {
    return await request(url, getOption('POST', data));
}

export async function put(url, data) {
    return await request(url, getOption('PUT', data));
}

export async function del(url) {
    return await request(url, getOption('DELETE'));
}