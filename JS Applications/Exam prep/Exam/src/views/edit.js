import { html } from '../../node_modules/lit-html/lit-html.js';
import { editFruit, getFruitById } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (data, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Fruit</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="name" id="name" placeholder="Fruit Name" value=${data.name} />
            <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image URL" value=${data.imageUrl} />
            <textarea id="fruit-description" name="description" placeholder="Description" rows="10" cols="50"
                .value=${data.description}></textarea>
            <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"
                .value=${data.nutrition}></textarea>
            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getFruitById(id);

    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newData = {
            name: formData.get('name'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
            nutrition: formData.get('nutrition')

        }

        if (validate(newData)) {
            await editFruit(id, newData);
            ctx.page.redirect(`/details/${id}`);
        } else {
            alert('Please, fill all the information!');
        }
    }
}