import {html} from '../../node_modules/lit-html/lit-html.js';
import { delAlbum, getAlbumById } from '../api/data.js';
import { getUser } from '../api/util.js';

const template=(data,isOwner,onDelete)=>html`
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
    <div id="likes">Likes: <span id="likes-count">0</span></div>      

          <!--Edit and Delete are only for creator-->
          ${isOwner == true
          ?html`<div id="action-buttons"></div>
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="#" id="delete-btn" @click=${onDelete}>Delete</a>
         </div>
          `
          :''}
          
        </div>
      </section>
`

export async function detailsView(ctx){
    
const data=await getAlbumById(ctx.params.id);

 let isOwner=false;
 let user=getUser();
 
 if(user && user._id == data._ownerId){
    isOwner=true;
 }
 
ctx.render(template(data,isOwner,onDelete));

 async function onDelete(e){
e.preventDefault();
   let confirmRes= confirm('Are you sure you want to delete the record?');

    if (confirmRes){
       await delAlbum(ctx.params.id);
ctx.page.redirect('/catalog');
    }

 }
}