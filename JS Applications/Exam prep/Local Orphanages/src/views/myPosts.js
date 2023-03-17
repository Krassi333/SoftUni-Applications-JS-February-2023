import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyPosts } from '../api/data.js';
import { getUser } from '../api/util.js';

const postTemplate = (el) => html`
<div class="post">
    <h2 class="post-title">${el.title}</h2>
    <img class="post-image" src=${el.imageUrl} alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${el._id}" class="details-btn btn">Details</a>
    </div>
</div>

`

const template = (data) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    <div class="my-posts">

        ${data.length == 0
            ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
                : data.map(el => postTemplate(el))}

    </div>

</section>
`

export async function myPostsView(ctx){
    const user=getUser();
    const data=await getMyPosts(user._id);
    
    ctx.render(template(data));
}