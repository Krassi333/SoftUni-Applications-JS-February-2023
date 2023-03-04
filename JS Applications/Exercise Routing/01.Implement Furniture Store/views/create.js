import { html, render } from '../node_modules/lit-html/lit-html.js'
import { createItem } from '../src/data.js'
import page from '../node_modules/page/page.mjs'

const root = document.getElementById('root');

const template = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" @click=${onSubmit} class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`


export function showCreate() {
    render(template(), root);

}

 async function onSubmit(e) {
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
        createItem(data);
        page.redirect('/');
    }

}

export function validate(data) {
    let res = true;

    if (data.make.length < 4 || data.make=='' ) {
        res = false;
        document.getElementById('new-make').setAttribute('class', 'is-invalid');
    } else {
        document.getElementById('new-make').setAttribute('class', 'is-valid');
    }

    if (data.model.length < 4 || data.model=='') {
        res = false;
        document.getElementById('new-model').setAttribute('class', 'is-invalid');
    } else {
        document.getElementById('new-model').setAttribute('class', 'is-valid');
    }

    if (Number(data.year) < 1950 || Number(data.year) > 2050 || data.year=='') {
        res = false;
        document.getElementById('new-year').setAttribute('class', 'is-invalid');
    } else {
        document.getElementById('new-year').setAttribute('class', 'is-valid');

    }

if(data.description.length <= 10 || data.description=='' ){
    res = false;
    document.getElementById('new-description').setAttribute('class', 'is-invalid');
} else {
    document.getElementById('new-description').setAttribute('class', 'is-valid');

}
      
if(Number(data.price) < 0 || data.price==''){
    res = false;
    document.getElementById('new-price').setAttribute('class', 'is-invalid');
} else {
    document.getElementById('new-price').setAttribute('class', 'is-valid');
}

if(data.img == '' ){
    res = false;
    document.getElementById('new-image').setAttribute('class', 'is-invalid');
} else {
    document.getElementById('new-image').setAttribute('class', 'is-valid');
}
    
    return res;
}