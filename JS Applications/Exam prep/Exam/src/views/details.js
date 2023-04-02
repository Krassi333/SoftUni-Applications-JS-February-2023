import { html } from '../../node_modules/lit-html/lit-html.js';
import { delFruit, getFruitById } from '../api/data.js';
import { getUser } from '../api/util.js';

const template = (data, onDelete, isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-title">${data.name}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p>${data.description}</p>
                <p id="nutrition">Nutrition</p>
                <p id="details-nutrition">${data.nutrition}</p>
            </div>
            ${isOwner ? html`<div id="action-buttons">
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>`
            : null}
        </div>
    </div>
</section>
`

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const data = await getFruitById(id);
    const user = getUser();
    let isOwner = false;

    if (user && user._id == data._ownerId) {
        isOwner = true;
    }

    ctx.render(template(data, onDelete, isOwner));

    async function onDelete(e) {
        e.preventDefault();

        const confirmRes = confirm('Are you sure you want to delete this album?');

        if (confirmRes) {
            await delFruit(id);
            ctx.page.redirect('/catalog');
        } else {
            ctx.page.redirect('/details');
        }


    }

}
