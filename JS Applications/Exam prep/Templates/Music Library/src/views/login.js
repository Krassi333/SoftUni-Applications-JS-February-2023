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
                Not registered? <a href="#">Create an account</a>
            </p>
        </form>
    </div>
</section>
`


export async function loginView(ctx) {
    ctx.render(template(onSubmit));
    
    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        //console.log(email,password);

        if (email != '' && password != '') {
            login(email, password);
            ctx.updateNavBar();
            ctx.page.redirect('/catalog');
        } else {
            alert('All fields are required');
        }


    }
}

