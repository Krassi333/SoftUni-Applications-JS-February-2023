import { html } from '../../node_modules/lit-html/lit-html.js';
import { editMeme, getMemeById } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (data, onSubmit) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" value=${data.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                  ${data.description}
                </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${data.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getMemeById(id);

    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newData = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl')
        }


        if (validate(newData)) {
            await editMeme(id, newData);
            ctx.page.redirect(`/details/${id}`);
        } 
    }
}