import { html } from '../../node_modules/lit-html/lit-html.js';
import { addProduct } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add Product</h2>
        <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50"></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>
`

export async function addProductView(ctx) {
    ctx.render(template(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            name: formData.get('name'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            description: formData.get('description'),
            price: formData.get('price')
        }

        if (validate(data)) {
            await addProduct(data);
            ctx.page.redirect('/catalog');
        }
    }
}