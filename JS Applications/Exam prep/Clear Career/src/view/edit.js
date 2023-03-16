import { html } from '../../node_modules/lit-html/lit-html.js';
import { editOffer, getOfferById } from '../api/data.js';
import { getUser } from '../api/util.js';
import { validate } from '../api/validate.js';

const template = (data, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="title" id="job-title" placeholder="Title" value=${data.title} />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" value=${data.imageUrl} />
            <input type="text" name="category" id="job-category" placeholder="Category" value=${data.category} />
            <textarea id="job-description" name="description" placeholder="Description" rows="4"
                cols="50">${data.description}</textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50">${data.requirements}</textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" value=${data.salary} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function editView(ctx) {
    let id = ctx.params.id;
    let data = await getOfferById(id);
   
    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);

        let newData = {
            title: formData.get('title'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            requirements: formData.get('requirements'),
            salary: formData.get('salary')

        }

        if (validate(newData)) {
            await editOffer(id, newData);
            ctx.page.redirect(`/details/${id}`);
        } else {
            alert('All filds must be fulfiiled');
        }
    }
}