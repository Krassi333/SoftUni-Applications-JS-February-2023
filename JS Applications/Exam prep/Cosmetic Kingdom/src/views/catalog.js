import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllProducts } from '../api/data.js';

const template = (data) => html`
<h2>Products</h2>
<section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${data.length==0 
    ? html`<h2>No products yet.</h2>`
    : html`
${data.map(el=>html`
<div class="product">
        <img src=${el.imageUrl} alt="example1" />
        <p class="title">
            ${el.name}
        </p>
        <p><strong>Price:</strong><span class="price">${el.price}</span>$</p>
        <a class="details-btn" href="/details/${el._id}">Details</a>
    </div>
`)}
`}
    
   
</section>

`

export async function catalogView(ctx) {
let data=await getAllProducts();
console.log('catalog/n',data);
    ctx.render(template(data));
    ctx.updateNavBar();
}