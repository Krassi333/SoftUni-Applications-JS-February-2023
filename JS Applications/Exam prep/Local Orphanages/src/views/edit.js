import { html } from '../../node_modules/lit-html/lit-html.js';
import { editPost, getPostById } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (data, onSubmit) => html`
<section id="edit-page" class="auth">
    <form id="edit" @submit=${onSubmit}>
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" value="${data.title}">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" value="${data.description}">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" value="${data.imageUrl}">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" value="${data.address}">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" value="${data.phone}">
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>
`

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getPostById(id);

    ctx.render(template(data, onSubmit));


    async function onSubmit(e) {
        e.preventDefault();
debugger
        const formData = new FormData(e.target);
        const newData = {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            address: formData.get('address'),
            phone: formData.get('phone')

        }

        if (validate(newData)) {
            await editPost(id,newData);
            ctx.page.redirect(`/details/${id}`);
        }else{
            alert('All filds must be fulfilled');
        }

    }
}