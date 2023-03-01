import { html, render } from '/node_modules/lit-html/lit-html.js'

let loadBtn = document.getElementById('btnLoadTowns');
loadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    debugger
    let formEl = document.querySelector('form');
    let data = new FormData(formEl);
    let towns = data.get('towns').split(', ');
    let template = (towns) => html`
    <ul>
        ${towns.map(el => html`<li>${el}</li>`)}
    </ul>`
    let root = document.getElementById('root');
    //root.replaceChildren();
    render(template(towns), root);

    document.getElementById('towns').value = '';
});

