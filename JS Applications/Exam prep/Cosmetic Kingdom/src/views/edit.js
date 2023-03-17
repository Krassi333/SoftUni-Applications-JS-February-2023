import { html } from '../../node_modules/lit-html/lit-html.js';
import { editProduct, getProductById } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (data, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Product</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="name" id="name" placeholder="Product Name" value=${data.name} />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" value=${data.imageUrl} />
            <input type="text" name="category" id="product-category" placeholder="Category" value=${data.category} />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50">${data.description}</textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" value=${data.price} />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getProductById(id);

    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newData = {
            name: formData.get('name'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            price: formData.get('price')

        }

        if (validate(newData)) {
            await editProduct(id, newData);
            ctx.page.redirect(`/details/${id}`);
        }else{
            alert('Fill all');
        }
    }
}