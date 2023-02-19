console.log('TODO:// Implement Login functionality');
let url = 'http://localhost:3030/users/login';

let form = document.getElementById('login-form');
console.log(form);
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let info = new FormData(form);

    let email = info.get('email');
    let password = info.get('password');
    let body = {
        email,
        password
    };

    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        console.log(res.status);
        if (res.status != 200) {
            throw new Error(res.message);
        } else {
            let data = await res.json();
           // console.log(data);
            let accessToken = data.accessToken;
            let email = data.email;
            let id = data._id;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('email', email);
            localStorage.setItem('id', id);

          
            window.location = './index.html';
        }
    } catch (error) {
        document.querySelector('p.notification').textContent = `${error}`;
    }




})