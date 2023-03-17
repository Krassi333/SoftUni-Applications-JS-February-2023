import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { validateRegisterData } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="register-page" class="auth">
    <form id="register" @submit=${onSubmit}>
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
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
            await register(data.email, data.password);
            ctx.updateNavBar();
            ctx.page.redirect('/catalog');
        }

    }
}