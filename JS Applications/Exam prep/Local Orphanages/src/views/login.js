import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { validateLoginData } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="login-page" class="auth">
    <form id="login" @submit=${onSubmit}>
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>
`

export async function loginView(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        if (validateLoginData(data)){
             await login(data);
             ctx.updateNavBar();
             ctx.page.redirect('/catalog');
        }
           
    }
}