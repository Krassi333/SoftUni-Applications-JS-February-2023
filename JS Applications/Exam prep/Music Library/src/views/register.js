import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js';

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
    ctx.updateNavBar();

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let data = {
            email: formData.get('email'),
            password: formData.get('password'),
            rePass: formData.get('re-password')
        }

debugger
        if (validate(data)) {
            register(data.email, data.password);
            ctx.page.redirect('/catalog');
            
        } else {
            alert('Please,make sure all fields are corectly filled');
        }
    }
}

function validate(data) {
    let res = true;
debugger
    for (let el of Object.values(data)) {
        if (el == '') {
            res = false;
        }
    }

    if (data.password != data.rePass) {
        res = false;
    }

    return res;
}
