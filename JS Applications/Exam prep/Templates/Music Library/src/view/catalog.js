import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../api/data.js';

const cardTemplate = (el) => html`
<li class="card">
    <img src=${el.imageUrl} alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${el.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${el.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${el.sales}</span></p>
    <a class="details-btn" href="/details/${el._id}">Details</a>
</li>
`
const template = (data) => html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->

        ${data.map(el => cardTemplate(el))}
    </ul>

    <!-- Display an h2 if there are no posts -->
    <h2>There are no albums added yet.</h2>
</section>
`

export async function catalogView(ctx) {
    ctx.updateNavBar();
    const data = await getAllAlbums();
    ctx.render(template(data));
}