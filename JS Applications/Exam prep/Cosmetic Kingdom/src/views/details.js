import { html } from '../../node_modules/lit-html/lit-html.js';
import { addBuy, delProduct, getAllBuysForThisProduct, getMyBuys, getProductById } from '../api/data.js';
import { getUser } from '../api/util.js';

const buttonTemplates = (data, isOwner, onDelete) => {
    if (isOwner) {
        return html`
    <a href="/edit/${data._id}" id="edit-btn">Edit</a>
    <a href="javascript:void[0]" @click=${onDelete} id="delete-btn">Delete</a>
    `
    } else {
        return null;
    }
}

const buyTemplate = (isLoged, isOwner, onBuy) => {
    if (isLoged && !isOwner) {
        return html`<a href="javascript:void[0]" @click=${onBuy} id="buy-btn">Buy</a>`
    } else {
        return null;
    }
}

const template = (data, allBuyCount, isOwner, onDelete, isLoged, onBuy) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.imageUrl} alt="example1" />
        <p id="details-title">${data.name}</p>
        <p id="details-category">
            Category: <span id="categories">${data.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${data.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">${allBuyCount}</span> times.</h4>
                <span>${data.description}</span>
            </div>
        </div>


        <div id="action-buttons">

            ${buttonTemplates(data, isOwner, onDelete)}
            ${buyTemplate(isLoged, isOwner, onBuy)}

        </div>
    </div>
</section>
`

export async function detailsView(ctx) {

    const id = ctx.params.id;
    const data = await getProductById(id);
    const user = getUser();

    let isOwner = false;
    let isLoged = false;
    const myBuy = await getMyBuys(id, user._id);

    if (user && user._id == data._ownerId ) {
        isOwner = true;
    }

    if (user && !isOwner && myBuy == 0) {
        isLoged = true;
    }

    const allBuyCount = await getAllBuysForThisProduct(id);

    ctx.render(template(data, allBuyCount, isOwner, onDelete, isLoged, onBuy));

    async function onDelete() {
        const confirmRes = confirm('Are you sure you want to delete this product?');

        if (confirmRes) {
            await delProduct(id);
            ctx.page.redirect('/catalog')
        }
    }

    async function onBuy() {
        console.log('buy button clicked');
        await addBuy(id);

        ctx.page.redirect(`/details/${id}`);
    }
}
