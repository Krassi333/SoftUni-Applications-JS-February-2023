import page from '../../node_modules/page/page.mjs';
import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data.js';

const template = (onSubmit) => html`
<section id="login-page" class="login">
    <form id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" @click=${onSubmit} type="submit" value="Login">
        </fieldset>
    </form>
</section>
`

export async function loginView(ctx) {

    ctx.render(template(onSubmit));
    ctx.uppdateNavBar();
}

function onSubmit(e) {
    e.preventDefault();

    let form = document.querySelector('form');
    let formData = new FormData(form);

    let { email, password } = Object.fromEntries(formData);
//debugger
    login(email, password);
    page.redirect('/');
}