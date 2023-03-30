import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { validateRegisterData } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
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
            rePass: formData.get('re-password')
        }

        if (validateRegisterData(data)) {
            register(data.email, data.password);
            ctx.updateNavBar();
            ctx.page.redirect('/catalog');
        }
    }
}