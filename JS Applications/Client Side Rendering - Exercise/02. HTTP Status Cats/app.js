import { cats } from './catSeeder.js';
import { html, render } from '/node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js'

let root = document.getElementById('allCats');
cats.forEach(cat => cat.info = true);

console.log(cats);
let addCats = (cats) => html`
<ul>
    ${cats.map(cat => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${showStatus}>${cat.info ? 'Show' : 'Hide'} status code</button>
            <div class="status" style=${styleMap(cat.info ? { display: 'none' } : { display: 'block' })} id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>
    `)}
</ul>

`

function showStatus(e) {
    let currentCatId = e.target.parentElement.querySelector('.status').id;
    console.log(currentCatId);

    cats.forEach(el => {
        if (el.id == currentCatId) {
            el.info ? el.info = false : el.info = true;
            render(addCats(cats), root)

        }
    })
}

render(addCats(cats), root)