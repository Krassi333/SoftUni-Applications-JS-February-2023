import { html } from '../../node_modules/lit-html/lit-html.js'
import { catalog } from '../data.js'

const template = (data) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${data.length == 0 ?
    html`<p class="no-books">No books in database!</p>`
    : html`<ul class="other-books-list">
        ${data.map(el => html`
        <li class="otherBooks">
            <h3>${el.title}</h3>
            <p>Type: ${el.type}</p>
            <p class="img"><img src=${el.imageUrl}></p>
            <a class="button" href="/details">Details</a>
        </li>
        `)}
    </ul>
    `
    }



    <!-- Display paragraph: If there are no books in the database -->

</section>
`

export async function catalogView(ctx) {
   
        let data = await catalog();
        console.log(data);
        
        ctx.render(template(data));
        ctx.uppdateNavBar();
        


}