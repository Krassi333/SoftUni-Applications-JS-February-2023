let host = 'http://localhost:3030/';

async function request(url, options) {
    debugger
    console.log('here 4');
    try {
        let res = await fetch(host + url, options);
        //console.log(res);
        if (res.status != 200) {
            //alert(res.statusText);
            throw new Error(res.message);
        }

        return res.json();

    } catch (err) {
        alert(err.message);
        return err;
    }

}

function getOption(method, body) {
    console.log('here 3');
   debugger
    let option = {
        method,
        headers: {}
    };

    if (body) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(body);
    }

    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        option.headers["X-Authorization"] = user.accessToken;
    }
    return option;
}

export async function get(url) {
    return request(url, getOption('GET'));
}

export async function post(url, data) {
    return request(url, getOption('POST', data));
}

export async function put(url, data) {
    return request(url, getOption('PUT', data));
}

export async function del(url) {
    return request(url, getOption('DELETE'));
}