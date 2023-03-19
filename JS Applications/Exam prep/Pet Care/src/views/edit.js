import { html } from '../../node_modules/lit-html/lit-html.js';
import { editPostcard, getPostcardById } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (data, onSubmit) => html`
<section id="editPage">
    <form class="editForm" @submit=${onSubmit}>
        <img src="./images/editpage-dog.jpg">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value=${data.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value=${data.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value=${data.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value=${data.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value=${data.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>
`

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getPostcardById(id);
console.log('edit');
    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newData = {
            name: formData.get('name'),
            breed: formData.get('breed'),
            age: formData.get('age'),
            weight: formData.get('weight'),
            image: formData.get('image')
        }
console.log(newData);
        if (validate(newData)) {
            await editPostcard(id,newData);
            ctx.page.redirect(`/details/${id}`);
        }else{
            alert('All filleds are required!');

        }
    }
}