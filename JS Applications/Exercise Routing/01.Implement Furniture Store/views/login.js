import { html, render } from '../node_modules/lit-html/lit-html.js'
import { login } from '../src/data.js';
import page from '../node_modules/page/page.mjs'
import { navBar } from '../src/app.js';

const root = document.getElementById('root');

const template = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
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
            <input type="submit" @click=${onSubmit} class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>
`

export function showLogin() {
    render(template(), root);
}

function onSubmit(e) {
    e.preventDefault();

    let form = document.querySelector('form');
    let formData = new FormData(form);

    let { email, password } = Object.fromEntries(formData);

    login(email,password);
    
    page.redirect('/');
    
}

