import { html } from '../../node_modules/lit-html/lit-html.js'
import { myBooks } from '../data.js';

const template = (data) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${data.length == 0 ?
        html`<p class="no-books">No books in database!</p>`
        : html`<ul class="my-books-list">
        ${data.map(el => html`
        <li class="otherBooks">
            <h3>${el.title}</h3>
            <p>Type: ${el.type}</p>
            <p class="img"><img src=${el.imageUrl}></p>
            <a class="button" href="/details/${el._id}">Details</a>
        </li>
        `)}
    </ul>`}

</section>
`

export async function myBooksView(ctx) {
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user._id
    let data =await  myBooks(userId);
    ctx.render(template(data));
    ctx.uppdateNavBar();
}