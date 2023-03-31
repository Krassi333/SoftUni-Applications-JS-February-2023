import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyMemes } from '../api/data.js';
import { getUser } from '../api/util.js';

const memeTemplate=(el)=>html`
 <div class="user-meme">
            <p class="user-meme-title">${el.title}</p>
            <img class="userProfileImage" alt="meme-img" src=${el.imageUrl}>
            <a class="button" href="/details/${el._id}">Details</a>
        </div>
`

const template = (user, data) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${user.gender == 'female'
        ? "/images/female.png"
        : "/images/male.png"}>
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
${data.length == 0 
?html` <p class="no-memes">No memes in database.</p>`
:data.map(el => memeTemplate(el))}


       
    </div>
</section>
`

export async function myMemesView(ctx){
    const user=getUser();
    const data=await getMyMemes(user._id);

    ctx.render(template(user,data));
}