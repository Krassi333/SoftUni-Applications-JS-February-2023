import { getAllItems } from '../src/data.js'
import { html, render } from '../node_modules/lit-html/lit-html.js'
import { showDetails } from './details.js';
import { navBar } from '../src/app.js';


const root = document.getElementById('root');

const template = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">

    ${data.map(el => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${el.img}" />
                <p>${el.descriptioin}</p>
                <footer>
                    <p>Price: <span>${el.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${el._id}"  class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
    `)}

</div>
`

export async function showCatalog() { 
    debugger
    navBar();
    let data = await getAllItems();
   
    render(template(data), root);
}

