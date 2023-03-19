import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { validateRegisterData } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="registerPage">
    <form class="registerForm" @submit=${onSubmit}>
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>
`

export async function registerView(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
            rePass: formData.get('repeatPassword')
        }

        if (validateRegisterData(data)) {
            register(data.email, data.password);
            ctx.updateNavBar();
            ctx.page.redirect('/');
        }
    }
}