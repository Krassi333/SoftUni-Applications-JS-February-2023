import { html } from '../../node_modules/lit-html/lit-html.js';
import { addAlbum } from '../api/data.js';
import { validate } from '../api/validate.js';

const template = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function addAlbumView(ctx) {
    ctx.render(template(onSubmit));
    debugger
    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            singer: formData.get('singer'),
            album: formData.get('album'),
            imageUrl: formData.get('imageUrl'),
            release: formData.get('release'),
            label: formData.get('label'),
            sales: formData.get('sales')
        }

        if (validate(data)) {
            addAlbum(data);
            ctx.page.redirect('/catalog');
        } else {
            alert('All filds must be fullfiled!');
        }
    }
}