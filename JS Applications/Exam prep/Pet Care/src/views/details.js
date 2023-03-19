import { html } from '../../node_modules/lit-html/lit-html.js';
import { addDonation, delPostcard, didUserDonate, getAllDonations, getPostcardById } from '../api/data.js';
import { getUser } from '../api/util.js';

const userTemplate=(data,isOwner,onDelete,onDonate)=>html`

<div class="actionBtn">
    ${isOwner
         ?html`
                <a href="/edit/${data._id}" class="edit">Edit</a>
                <a href="javascript.void[0]" @click=${onDelete} class="remove">Delete</a>
         `
        :html`<a href="#" @click=${onDonate} class="donate">Donate</a>`
        }

</div>
`

const template = (data, onDelete, isOwner, isUser,donations,onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${data.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${data.name}</h1>
                <h3>Breed: ${data.breed}</h3>
                <h4>Age: ${data.age}</h4>
                <h4>Weight: ${data.weight}</h4>
                <h4 class="donation">Donation: ${donations*100}$</h4>
            </div>

            ${isUser
                  ? userTemplate(data,isOwner,onDelete)
                  : userTemplate(data,false,onDelete)}
            
        </div>
    </div>
</section>
`

export async function detailsView(ctx){
    const id=ctx.params.id;
    const data=await getPostcardById(id);
    const user=getUser();

    let isUser=false;

    if(user){
        isUser=true;
    }

    let isOwner=false;

    if(user && user._id == data._ownerId){
        isOwner=true;
    }

    const donations=await getAllDonations(id);
const isDonate=await didUserDonate(id,user._id);

    ctx.render(template(data, onDelete, isOwner, isUser,donations));

    async function onDelete(e){
e.preventDefault();

        const confirmRes=confirm('Are you sure you want to delete this postcard?');

        if(confirmRes){
            await delPostcard(id);
            ctx.page.redirect('/');
        }
        

    }

    async function onDonate(e){
        e.preventDefault();

        await addDonation(id);
        ctx.page.redirect(`/details/${id}`);
    }
}