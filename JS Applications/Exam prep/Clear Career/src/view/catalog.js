import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllOffers } from '../api/data.js';

const offerTemplate = (el) => html`
<div class="offer">
    <img src=${el.imageUrl} alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${el.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${el.salary}</span></p>
    <a class="details-btn" href="/details/${el._id}">Details</a>
</div>
`

const template = (data) => html`
<section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    ${data.length == 0
            ? html`<h2>No offers yet.</h2>`
            : data.map(el => offerTemplate(el))}

    <!-- Display an h2 if there are no posts -->

</section>
`

export async function catalogView(ctx){
    let data=await getAllOffers();
    ctx.render(template(data));
}