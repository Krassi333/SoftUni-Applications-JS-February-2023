import { html } from '../../node_modules/lit-html/lit-html.js'
import page from '../../node_modules/page/page.mjs'
import { addBook } from '../data.js';

const template = (onSubmit) => html`
<section id="create-page" class="create">
    <form id="create-form" action="" method="">
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" @click=${onSubmit} type="submit" value="Add Book">
        </fieldset>
    </form>
</section>
`
export async function createView(ctx) {
    ctx.render(template(onSubmit));
    ctx.uppdateNavBar();

}

function onSubmit(e) {
    e.preventDefault();

    let form = document.getElementById('create-form');
    let formData = new FormData(form);

    let { title, description, imageUrl, type } = Object.fromEntries(formData);

    addBook({title, description, imageUrl, type});
    page.redirect('/');
}