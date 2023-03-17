import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPosts } from '../api/data.js';


const postTemplate = (el) => html`
<div class="all-posts">
    <div class="post">
        <h2 class="post-title">${el.title}</h2>
        <img class="post-image" src=${el.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${el._id}" class="details-btn btn">Details</a>
        </div>
    </div>
`
const template = (data) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>

    ${data.length == 0
            ? html`<h1 class="title no-posts-title">No posts yet!</h1>`
            : data.map(el => postTemplate(el))}

</section>
`

export async function catalogView(ctx){
    const data=await getAllPosts();

    ctx.render(template(data));
}