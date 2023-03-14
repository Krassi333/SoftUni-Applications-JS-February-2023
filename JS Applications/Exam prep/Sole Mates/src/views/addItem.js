import { html } from '../../node_modules/lit-html/lit-html.js';
import { addItem } from '../api/data.js';

const template = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add item</h2>
        <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
            <input type="text" name="model" id="shoe-model" placeholder="Model" />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
            <input type="text" name="value" id="shoe-value" placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function addItemView(ctx) {
    ctx.render(template(onSubmit));

    function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let data = {
            brand: formData.get('brand'),
            model: formData.get('model'),
            imageUrl: formData.get('imageUrl'),
            release: formData.get('release'),
            designer: formData.get('designer'),
            value: formData.get('value')
        }

        if (validateItemData(data)) {
            addItem(data);
            ctx.page.redirect('/catalog');
        } else {
            alert('Please, fill in all filds!');
        }
    }
}

export function validateItemData(data) {

    for (let el of Object.values(data)) {
        if (el == '') {
            return false;
        }
    }

    return true;
}