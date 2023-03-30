import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../api/data.js';


const albumTemplate = (el) => html`
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
            ${data.length == 0
                 ? html`<h2>There are no albums added yet.</h2>`
                 : data.map(el => albumTemplate(el))}
    
        </ul>
    
        </section>
    `

export async function catalogView(ctx) {
    let data = await getAllAlbums();

    ctx.render(template(data));
    ctx.updateNavBar();


}