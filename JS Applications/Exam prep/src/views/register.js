import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data.js';

const template = (onSubmit) => html`
<section id="register-page" class="register">
    <form id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" @click=${onSubmit} type="submit" value="Register">
        </fieldset>
    </form>
</section>
`

export async function registerView(ctx) {
    ctx.render(template(onSubmit));
    ctx.uppdateNavBar();

}

function onSubmit(e) {
    e.preventDefault();

    let form = document.querySelector('form');
    let formData = new FormData(form);

    let { email, password } = Object.fromEntries(formData);
    let confirmPass = document.getElementById('repeat-pass').value;

    console.log(email, password, confirmPass);

    if (password == confirmPass) {
        register(email, password);
    }
}