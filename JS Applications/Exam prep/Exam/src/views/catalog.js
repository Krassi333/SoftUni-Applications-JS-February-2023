import { html } from '../../node_modules/lit-html/lit-html.js';
import {  getAllFruits } from '../api/data.js';

const fruitTemplate = (el) => html`
<div class="fruit">
    <img src=${el.imageUrl} alt="example1" />
    <h3 class="title">${el.name}</h3>
    <p class="description">${el.description}</p>
    <a class="details-btn" href="/details/${el._id}">More Info</a>
</div>
`
const template = (data) => html`
<!-- Dashboard page -->
<h2>Fruits</h2>
${data.length == 0 
? html`<h2>No fruit info yet.</h2>`
: html`
   <section id="dashboard">
      ${data.map(el => fruitTemplate(el))}
   </section>

`}

`

export async function catalogView(ctx) {
    ctx.updateNavBar();
    const data = await getAllFruits();
    ctx.render(template(data));
}