import { html } from '../../node_modules/lit-html/lit-html.js';
import { addMeme } from '../api/data.js';

import { validate } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="create-meme">
    <form id="create-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`

export async function addMemeView(ctx) {
    ctx.render(template(onSubmit));
    
    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            title : formData.get('title'),
            description : formData.get('description'),
            imageUrl : formData.get('imageUrl')
          }
          

        if (validate(data)) {
            addMeme(data);
            ctx.page.redirect('/catalog');
        }
    }
}