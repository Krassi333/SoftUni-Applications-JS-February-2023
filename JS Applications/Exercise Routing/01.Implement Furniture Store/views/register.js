import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { navBar } from '../src/app.js';
import { register } from '../src/data.js'

const root = document.getElementById('root');

const template = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" @click=${onSubmit} class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>
        `;


export function showRegister() {
    render(template(), root);
}

async function onSubmit(e) {
    e.preventDefault();
    //debugger
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let { email, password, rePass } = Object.fromEntries(formData);
    if (password == rePass) {
        register(email, password);
    } else {
        alert("Password and confirm password don't match");
    }
    navBar();
    page.redirect('/')

}