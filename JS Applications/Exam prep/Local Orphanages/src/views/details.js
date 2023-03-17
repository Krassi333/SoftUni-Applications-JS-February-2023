import { html } from '../../node_modules/lit-html/lit-html.js';
import { delPost, getPostById } from '../api/data.js';
import { getUser } from '../api/util.js';

const template = (data, isOwner, onDelete) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${data.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${data.title}</h2>
                <p class="post-description">Description: ${data.description}</p>
                <p class="post-address">Address: ${data.address}</p>
                <p class="post-number">Phone number: ${data.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>
                <div class="btns">

                    ${isOwner
                ? html`
                    <a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                    <a href="#" @click=${onDelete} class="delete-btn btn">Delete</a>

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a href="#" class="donate-btn btn">Donate</a>
                    `
                : null}

                </div>

            </div>
        </div>
    </div>
</section>
`

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const data = await getPostById(id);

    let isOwner = false;
    let user = getUser();

    if (user && user._id == data._ownerId) {
        isOwner = true;
    }

    ctx.render(template(data, isOwner, onDelete));

    async function onDelete(e) {
        e.preventDefault();
        
        let confirmedResponce = confirm ('Are you sure you want to delete this post?');

        if (confirmedResponce) {
            await delPost(id);
            ctx.page.redirect('/catalog');
        }

    }
}
