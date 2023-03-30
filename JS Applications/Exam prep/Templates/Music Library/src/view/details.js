import { html } from '../../node_modules/lit-html/lit-html.js';
import { addLike, delAlbum, didUserLikes, getAlbumById, getAllLikes } from '../api/data.js';
import { getUser } from '../api/util.js';

const template = (data, likes, onDelete, showLikeBtn,onLike,isOwner) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${data.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${data.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>
        <div id="action-buttons">
            ${isOwner
            ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="javascript.void[0]" @click=${onDelete} id="delete-btn">Delete</a>
            `
            : html`
             ${showLikeBtn
                    ? html` <a href="javascript.void[0]" @click=${onLike} id="like-btn">Like</a>`
                        : null}
            `}
           
        </div>
    </div>
</section>
`

export async function detailsView(ctx){
    const id=ctx.params.id;
    const data=await getAlbumById(id);
const user=getUser();
const likes=await getAllLikes(id);
let isOwner=false;

if(user && user._id==data._ownerId){
    isOwner=true;
}

let showLikeBtn=false;
debugger
if(user && !isOwner && await didUserLikes(id,user._id) == 0){
    showLikeBtn=true;
}


    ctx.render(template(data, likes, onDelete, showLikeBtn,onLike,isOwner));
async function onDelete(e){
e.preventDefault();

const confirmRes=confirm('Are you sure you want to delete this album?');

if(confirmRes){
    await delAlbum(id);
    ctx.page.redirect('/catalog');
}


}

async function onLike(e){
    e.preventDefault();

    await addLike(id);
    ctx.page.redirect(`/details/${data._id}`);
}
}
