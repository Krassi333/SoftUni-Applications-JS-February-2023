import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const template = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="register-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`
let context;

export async function registerView(ctx) {
    context = ctx;
    ctx.render(template(onSubmit));
    ctx.updateNavBar();
}

async function onSubmit(e) {
    e.preventDefault();
    console.log('submit');

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('re-password');

    if (email == "" || password == "" || rePass == "") {
        alert("All fields are required ")
    } else if (password != rePass) {
        alert('Passsword and repeat password dont match');
    } else {
        await register(email, password);
        context.page.redirect('/');
    }


}