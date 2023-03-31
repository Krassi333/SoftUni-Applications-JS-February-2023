import { html } from '../../node_modules/lit-html/lit-html.js';
import { addApplication, delOffer, didUserApplied, getAllAplications, getOfferById } from '../api/data.js';
import { getUser } from '../api/util.js';

const buttonsTemplate = (data, isOwner, onDelete) => {

    if (isOwner) {
        return html`
    <div id="action-buttons">
        <a href="/edit/${data._id}" id="edit-btn">Edit</a>
        <a href="#" @click=${onDelete} id="delete-btn">Delete</a>
    </div>`;
    } else {
        return null;
    }
}

const applyTemplate = (showApplyButton, onApply) => {
    if (showApplyButton) {
        return html`<a href="#" @click=${onApply} id="apply-btn">Apply</a>`
    } else {
        return null;
    }
}

const template = (data, isOwner, onDelete, totalApplications, showApplyButton, onApply) => html`
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
            Applications: <strong id="applications">${totalApplications}</strong>
        </p>

        ${buttonsTemplate(data, isOwner, onDelete)}

        ${applyTemplate(showApplyButton, onApply)}

    </div>
</section>
`

export async function detailsView(ctx) {
    let id = ctx.params.id;
    let data = await getOfferById(id);
    let user = getUser();

    let isOwner = false;

    if (user && user._id == data._ownerId) {
        isOwner = true;
    }

    let totalApplications = await getAllAplications(id);
    //console.log(totalApplications);

    let showApplyButton = false;
//console.log('didUserApplied '+await didUserApplied(user._id,id));
    if (user && !isOwner && await didUserApplied(id,user._id)==0) {
        showApplyButton = true;
    }
    console.log(showApplyButton);

    ctx.render(template(data, isOwner, onDelete, totalApplications, showApplyButton, onApply));

    async function onDelete(e) {
        e.preventDefault();

        let confirmResponce = confirm('Are you sure you want to delete this offer?');

        if (confirmResponce) {
            await delOffer(id);
            ctx.page.redirect('/catalog');
        }

    }

    async function onApply() {
        debugger
        await addApplication(id);
        ctx.page.redirect(`/details/${id}`);
    }
}