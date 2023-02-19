console.log('TODO:// Implement Register functionality');
let url = 'http://localhost:3030/users/register';

let form = document.getElementById('register_form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let info = new FormData(form);
    let email = info.get('email');
    let password = info.get('password');
    let rePass = info.get('rePass');

    try {
        if (password != rePass) {
            throw new Error('Password and repeated password do not match.');
        } else {
            let body = {
                email,
                password
            };

            let res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            let data = await res.json();
            //console.log(data);
            if (res.status != 200) {
                //console.log(data.code);
                throw new Error(`${res.message}`);
            }

            localStorage.setItem('email', data.email);
            localStorage.getItem('id', data._id);
            localStorage.setItem('accessToken', data.accessToken);
            window.location = './index.html';
        }
    } catch (error) {
        document.querySelector('p.notification').innerText = `Error: ${error}`;
    }



})
