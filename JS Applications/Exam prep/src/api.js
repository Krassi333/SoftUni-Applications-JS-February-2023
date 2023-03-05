const baseURL = 'http://localhost:3030/';


async function request(url, options) {
//debugger
console.log(baseURL+url);
    try {
        let res = await fetch(baseURL + url, options);
//console.log(await res.json());
        if (res.ok==false) {
            let error=await res.json();
            throw new Error(error.message);
        }

        if (res.status == 204) {
            return res;
        } else {
           return  res.json(); 
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function getOption(method = 'GET', body) {
//debugger
    let option = {
        method,
        headers: {}
    };

    if (body) {
        option.headers['Content-Type'] = 'application/json';

        option.body = JSON.stringify(body);
    }

    let user = JSON.parse(localStorage.getItem('user'));

    if (user != undefined) {
        option.headers["X-Authorization"] = user.accessToken;
    }
    console.log(option);
    return option;
}

export async function get(url) {
    return request(url, getOption());
}

export async function post(url, data) {
    return await request(url, getOption('POST', data));
}

export async function put(url, data) {
    return request(url, getOption('PUT', data));
}

export async function del(url) {
    return request(url, getOption('DELETE'));
}

