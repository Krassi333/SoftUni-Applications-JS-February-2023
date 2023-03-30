import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUser } from '../api/util.js';
import { getPostById,getAllDonationsCount ,delPost ,isUserDonated} from '../api/data.js';

const template = (isOwner, data, donations,onDelete,onDonate,isDonated) => html`
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
                <p class="donate-Item">Donate Materials: ${donations}</p>
                <!--Edit and Delete are only for creator-->
                <!--Bonus - Only for logged-in users ( not authors )-->
                ${ isOwner
                ? html`
                 <div class="btns">
                    <a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                    <a href="${onDelete}" class="delete-btn btn">Delete</a>
                   
                </div>
    `
                                :html`
                                 ${!isDonated
                                ? html`
                                 <a href="${onDonate}" class="donate-btn btn">Donate</a>
                                `
                            :null}
                                `}
               
            </div>
        </div>
    </div>
</section>
`
export async function detailsView(ctx){
    let isOwner=false;
    const user=getUser();
    const id=ctx.params.id;
    console.log(id);
    const data=await getPostById(id);
const donations=await getAllDonationsCount();
const isDonated= await isUserDonated(id,user._id);

    if(user){
        isOwner=true;
    }

    ctx.render(template(isOwner, data, donations,onDelete,onDonate,isDonated))

    async function onDonate(e){
e.preventDefault();

await makeDonation(id);
ctx.page.redirect(`/details/${id}`);
    }

    async function onDelete(){
const confirmRes=confirm('Are you sure you want to delete this post?');

if(confirmRes){
    await delPost(id);
    ctx.page.redirect('/catalog');
}
    }

}