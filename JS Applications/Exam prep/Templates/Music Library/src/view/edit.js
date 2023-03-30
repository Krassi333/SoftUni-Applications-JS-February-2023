import { html } from '../../node_modules/lit-html/lit-html.js';
import { editAlbum, getAlbumById } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (data, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${data.singer} />
            <input type="text" name="album" id="album-album" placeholder="Album" value=${data.album} />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${data.imageUrl} />
            <input type="text" name="release" id="album-release" placeholder="Release date" value=${data.release} />
            <input type="text" name="label" id="album-label" placeholder="Label" value=${data.label} />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${data.sales} />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getAlbumById(id);

    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newData = {
            singer: formData.get('singer'),
            album: formData.get('album'),
            imageUrl: formData.get('imageUrl'),
            release: formData.get('release'),
            label: formData.get('label'),
            sales: formData.get('sales')

        }

        if (validate(newData)) {
            await editAlbum(id, newData);
            ctx.page.redirect(`/details/${id}`);
        } else {
            alert('All filds must be filled!');
        }
    }
}