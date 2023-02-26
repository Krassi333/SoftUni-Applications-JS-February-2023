import {register} from '/..api/user.js';

let section = document.getElementById('registerView');
let form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let contextCopy = null;

export function showRegister(context) {
    contextCopy = context;
    context.showSection(section);
}

async function onSubmit(e) {
    e.preventDefault();
debugger
    let formData = new FormData(form);
    let { email, password, rePassword } = Object.fromEntries(formData);

    if (password != rePassword) {
        alert('Password and repeated password dont match');
    } else {
        await register(email, password);

        contextCopy.goTo('/');
    }
}