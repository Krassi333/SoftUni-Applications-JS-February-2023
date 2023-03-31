import { html } from '../../node_modules/lit-html/lit-html.js';
import { delMeme, getMemeById } from '../api/data.js';
import { getUser } from '../api/util.js';

const template = (data, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${data.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${data.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${data.description}
            </p>

            ${isOwner
            ? html`
            <a class="button warning" href="/edit/${data._id}">Edit</a>
            <button class="button danger" @click=${onDelete}>Delete</button>
            `
            : null}

        </div>
    </div>
</section>
`

export async function detailsView(ctx) {
    console.log('details');
    const id = ctx.params.id;
    const data = await getMemeById(id);

    let isOwner = false;
    const user = getUser();

    if (user && user._id == data._ownerId) {
        isOwner = true;
    }

    ctx.render(template(data, isOwner, onDelete));

    async function onDelete(e) {
        e.preventDefault();

        const confirmRes = confirm('Are you sure you want to delete this meme?');

        if (confirmRes) {
            await delMeme(id);
            ctx.page.redirect('/catalog');
        }
    }
}