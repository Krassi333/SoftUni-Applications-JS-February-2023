import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';

const template = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">login</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`

export async function registerView(ctx) {
    ctx.render(template(onSubmit))

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('re-password');

        if (email != '' && password != '' && rePass != '') {

            if (password == rePass) {
                register(email, password);
                ctx.updateNavBar();
                ctx.page.redirect('/catalog');
            } else {
                alert('Password dont math the repeated password!')
            }
            
        } else {
            alert('PLease, fill in all fields!');
        }
    }
}