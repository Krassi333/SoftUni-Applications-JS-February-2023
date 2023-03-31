import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../api/data.js';


const memeTemplate = (el) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${el.title}</p>
            <img class="meme-image" alt="meme-img" src=${el.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${el._id}">Details</a>
        </div>
    </div>
</div>
`
const template = (data) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${data.length == 0
            ? html` <p class="no-memes">No memes in database.</p>`
                : data.map(el => memeTemplate(el))}
    </div>
</section>
`

export async function catalogView(ctx) {
    ctx.updateNavBar();
    const data = await getAllMemes();
    ctx.render(template(data));
}