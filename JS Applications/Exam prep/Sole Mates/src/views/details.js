import { html } from '../../node_modules/lit-html/lit-html.js';
import { delItem, getItemById } from '../api/data.js';
import { getUser } from '../api/util.js';

const template = (data, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${data.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${data.brand}</span></p>
            <p>
                Model: <span id="details-model">${data.model}</span>
            </p>
            <p>Release date: <span id="details-release">${data.release}</span></p>
            <p>Designer: <span id="details-designer">${data.designer}</span></p>
            <p>Value: <span id="details-value">${data.value}</span></p>
        </div>

        ${isOwner
        ? html`
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="#" @click=${onDelete} id="delete-btn">Delete</a>
        </div>`
        : null}

    </div>
</section>
`

export async function detailsView(ctx) {
    let id = ctx.params.id;
    let data = await getItemById(id);

    let isOwner = false;
    let user = getUser();

    if (user && data._ownerId == user._id) {
        isOwner = true;
    }

    ctx.render(template(data, isOwner, onDelete));

    async function onDelete(e) {
        e.preventDefault();
        let confirmResponse = confirm('Are you sure you want to delete this item?');

        if (confirmResponse) {
            await delItem(id);
            ctx.page.redirect('/catalog');
        }
    }
}