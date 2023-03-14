import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllItems } from '../api/data.js';

const template=(data)=>html`
  <section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
      <!-- Display a li with information about every post (if any)-->
${data.length != 0 
? data.map(el => html`
   <li class="card">
        <img src=${el.imageUrl} alt="travis" />
        <p>
          <strong>Brand: </strong><span class="brand">${el.brand}</span>
        </p>
        <p>
          <strong>Model: </strong
          ><span class="model">${el.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${el.value}</span>$</p>
        <a class="details-btn" href="/details/${el._id}">Details</a>
      </li>
   `)
   : html`<h2>There are no items added yet.</h2>`}

    </ul>
    
  </section>
`;

export async function catalogView(ctx){
    let data= await getAllItems();
    //console.log(data);
    ctx.render(template(data));
}