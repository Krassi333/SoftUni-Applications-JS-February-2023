import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
import { validateRegisterData } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="register">
    <form id="register-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`

export async function registerView(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('repeatPass'),
            gender: formData.get('gender'),
            rePass: formData.get('repeatPass')
        }


        if (validateRegisterData(data)) {
            register({
                email: data.email,
                password: data.password,
                username: data.username,
                gender: data.gender
            });
            ctx.updateNavBar();
            ctx.page.redirect('/catalog');
        }
    }
}