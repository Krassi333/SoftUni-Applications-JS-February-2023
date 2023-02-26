import { login } from "../api/user.js";

let contextCopy = null;
let section = document.getElementById('loginView');
let form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function showLogin(context) {
    contextCopy = context;
    context.showSection(section);

}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(form);
    let { email, password } = Object.fromEntries(formData);
debugger
    await login(email, password);
    
    contextCopy.toTo('/');
}