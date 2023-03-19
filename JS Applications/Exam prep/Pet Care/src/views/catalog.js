import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPostcards } from '../api/data.js';

const postcardTemplate = (el) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src=${el.image}>
    </article>
    <h2 class="name">${el.name}</h2>
    <h3 class="breed">${el.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${el._id}">Details</a>
    </div>
</div>
`

const template = (data) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">

        ${data.length == 0
                ? html`<div>
            <p class="no-pets">No pets in dashboard</p>
        </div>`
        : data.map(el => postcardTemplate(el))}

    </div>
</section>
`

export async function catalogView(ctx){

    const data=await getAllPostcards();

    ctx.render(template(data));
}