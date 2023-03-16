import { html } from '../../node_modules/lit-html/lit-html.js';
import { delOffer, didUserApplied, getAllAplications, getOfferById } from '../api/data.js';
import { getUser } from '../api/util.js';

const template = (data, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-title">${data.title}</p>
        <p id="details-category">
            Category: <span id="categories">${data.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${data.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${data.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${data.requirements}</span>
            </div>
        </div>
        <p>
            Applications: <strong id="applications">0</strong>
        </p>

        <!--Edit and Delete are only for creator-->


        ${isOwner
        ? html`
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="#" @click=${onDelete} id="delete-btn">Delete</a>
        </div>`
        : null}


        <a href="#" @click=${onApply} id="apply-btn">Apply</a>



    </div>
</section>
`

export async function detailsView(ctx) {
    let id = ctx.params.id;
    let data = await getOfferById(id);
    let user = getUser();

    let isOwner = false;

    if (user) {


        if (user._id == data._ownerId) isOwner = true;
    }





    ctx.render(template(data,isOwner, onDelete));

    async function onDelete(e) {
        e.preventDefault();

        let confirmResponce = confirm('Are you sure you want to delete this offer?');

        if (confirmResponce) {
            delOffer(id);
            ctx.page.redirect('/catalog');
        }

    }


}