import { html, render } from '../node_modules/lit-html/lit-html.js'
import { getItemDetails } from '../src/data.js';
import page from '../node_modules/page/page.mjs'
import { validate } from './create.js';
import { updateItem } from '../src/data.js';

const root = document.getElementById('root');

const template = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" value=${data.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model" value=${data.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year" value=${data.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    value=${data.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value=${data.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value=${data.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value=${data.material}>
            </div>
            <input type="submit" @click=${onSubmit} class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`
let id;

export async function showEdit(ctx) {

    id = ctx.params.itemId;
    let data = await getItemDetails(id);
    console.log(data);
    render(template(data), root);
}

function onSubmit(e) {
    e.preventDefault();

    let form = document.querySelector('form');
    let formData = new FormData(form);
    let data = {
        make: formData.get('make'),
        model: formData.get('model'),
        year: formData.get('year'),
        description: formData.get('description'),
        price: formData.get('price'),
        img: formData.get('img'),
        material: formData.get('material')
    }

    if (validate(data)) {
        updateItem(id, data);
        page.redirect('/');
    }
}

