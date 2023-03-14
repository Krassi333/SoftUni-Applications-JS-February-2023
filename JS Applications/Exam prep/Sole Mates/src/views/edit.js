import { html } from '../../node_modules/lit-html/lit-html.js';
import { editItem, getItemById } from '../api/data.js';
import { validateItemData } from './addItem.js';

const template = (data, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" value=${data.brand} />
            <input type="text" name="model" id="shoe-model" placeholder="Model" value=${data.model} />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" value=${data.imageUrl} />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" value=${data.release} />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" value=${data.designer} />
            <input type="text" name="value" id="shoe-value" placeholder="Value" value=${data.value} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function editView(ctx) {
    let id = ctx.params.id;
    let data =await  getItemById(id);

    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let newData = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            imageUrl: formData.get('imageUrl'),
            release: formData.get('release'),
            designer: formData.get('designer'),
            value: formData.get('value')
        }

        if (validateItemData(newData)) {
            editItem(id, newData);
            ctx.page.redirect(`/details/${id}`);
        }
    }
}