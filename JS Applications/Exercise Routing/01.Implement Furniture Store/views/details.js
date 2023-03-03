//TO DO delete btn ?

import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { deleteItem, getItemDetails } from '../src/data.js'


const root = document.getElementById('root');

const btnTemplate = () => html`
<div>
    <a href='/edit/${itemId}' class="btn btn-info">Edit</a>
    <a href=”#” @click=${delFunction} class="btn btn-red">Delete</a>
</div>
`;

const template = (data, isThisOwner) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${data.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${data.make}</span></p>
        <p>Model: <span>${data.model}</span></p>
        <p>Year: <span>${data.year}</span></p>
        <p>Description: <span>${data.description}</span></p>
        <p>Price: <span>${data.price}</span></p>
        <p>Material: <span>${data.material}</span></p>
        ${isThisOwner ? btnTemplate() : ''}
    </div>
</div>`;

let itemId;

export async function showDetails(ctx) {
    itemId = ctx.params.itemId;
    let data = await getItemDetails(itemId);

    let isThisOwner = false;
    let itemOwnerId = data._ownerId;
    let user = JSON.parse(sessionStorage.getItem('user'));
    let userId = user._id;

    if (itemOwnerId == userId) {
        isThisOwner = true;
    }

    render(template(data, isThisOwner), root)
}

function delFunction(e) {
    e.preventDefault();
    alert('Are you sure you want to delete this item?');
    deleteItem(itemId);
    page.redirect('/');

}