let host = 'http://localhost:3030/';
let user = JSON.parse(localStorage.getItem('user'));

async function request(method, url, body) {
    debugger
    let options = {
        method,
        headers: {}
    };

    if (user) {
        let token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    if (body != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    try {
        let res = await fetch(host + url, options);

        if (res.ok != true) {
            if (res.status == 403) {
                localStorage.removeItem('user');
            };

            let err = res.statusText;
            console.log(err);
            throw new Error(err);
        }

        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }



    } catch (error) {
        alert(error.message);
        throw error;
    }

}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {
    get,
    post,
    put,
    del 
}

