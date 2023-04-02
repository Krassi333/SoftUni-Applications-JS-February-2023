import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';
import { getUser } from '../api/util.js';

const fruitTemplate = (el) => html`
<div class="fruit">
    <img src=${el.imageUrl} alt="example1" />
    <h3 class="title">${el.name}</h3>
    <p class="description">${el.description}</p>
    <a class="details-btn" href="/details/${el._id}">More Info</a>
    
</div>
`
const template = (isClicked,onSearch, data) => html`
<section id="search">

    <div class="form">
        <h2>Search</h2>
        <form class="search-form">
            <input type="text" name="search" id="search-input" />
            <button class="button-list" @click=${onSearch}>Search</button>
        </form>
    </div>
    <h4>Results:</h4>
    <div class="search-result">

        ${isClicked
         ? data.length == 0
            ?html`<p class="no-result">No result.</p>`
            :data.map(el => fruitTemplate(el))
         : null}

    </div>
</section>
`

export async function searchView(ctx) {
    let data = null;
    let isClicked = false;
    ctx.render(template(isClicked, onSearch, data));
    const searchInput = document.getElementById('search-input');
    

    async function onSearch(e) {
        e.preventDefault();

        const query = searchInput.value;

        if (query) {
            isClicked = true;
            data = await search(query);
            ctx.render(template(isClicked, onSearch, data));

        } else {
            alert('Enter search word, please!');
        }

    }
}