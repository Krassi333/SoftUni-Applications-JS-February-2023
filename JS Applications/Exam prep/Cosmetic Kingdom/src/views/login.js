import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

const template = (onSubmit) => html`
        <section id="login">
            <div class="form">
                <h2>Login</h2>
                <form class="login-form" @submit=${onSubmit}>
                    <input type="text" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <button type="submit">login</button>
                    <p class="message">
                        Not registered? <a href="/register">Create an account</a>
                    </p>
                </form>
            </div>
        </section>
`

let context;
export async function loginView(ctx) {
    context = ctx;
    ctx.render(template(onSubmit));
    ctx.updateNavBar();
}

function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');

    if (email == "" || password == "") {
        alert("All fields must be fulfill");
    } else {
        login(email, password);
        context.page.redirect('/catalog');
    }

}