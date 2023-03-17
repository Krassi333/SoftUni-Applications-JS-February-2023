import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllProducts } from '../api/data.js';

const productTemplate=(el)=>html`
<div class="product">
    <img src=${el.imageUrl} alt="example1" />
    <p class="title">
        ${el.name}
    </p>
    <p><strong>Price:</strong><span class="price">${el.price}</span>$</p>
    <a class="details-btn" href="/details/${el._id}">Details</a>
</div>
`

const template = (data) => html`
<!-- Dashboard page -->
<h2>Products</h2>

${data.length == 0
        ? html`<h2>No products yet.</h2>`
        : html`<section id="dashboard">
    ${data.map(el => productTemplate(el))}
</section>`}

`

export async function catalogView(ctx){
    const data=await getAllProducts();

    ctx.render(template(data))
}