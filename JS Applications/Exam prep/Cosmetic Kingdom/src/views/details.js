import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteProduct, getProductById } from '../api/data.js';
import { getUser } from '../util.js';

const template = (isOwner,data,onDelete) => html`
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
                        <h4>Bought: <span id="buys">0</span> times.</h4>
                        <span>${data.description}</span>
                    </div>
                </div>
        
                ${isOwner 
                ? html` 
                <div id="action-buttons">
                    <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                    <a href="" @click=${onDelete} id="delete-btn">Delete</a>
                `
                : ""}
               
               
        
                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a href="" id="buy-btn">Buy</a>
                </div>
            </div>
        </section>
`

export async function detailsView(ctx) {
    let isOwner=false;
    let productId = ctx.params.id;
    let data = await getProductById(productId);
   //console.log(data);
    if(getUser() && data._ownerId == getUser()._id){
        isOwner=true;
    }

   
    ctx.render(template(isOwner,data,onDelete));
    ctx.updateNavBar();

   async function onDelete(e){
      e.preventDefault();
      alert('Are you sure you want to delete this product?');
       deleteProduct(productId);

ctx.page.redirect('/catalog');
   }
}