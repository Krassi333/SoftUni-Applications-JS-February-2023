import { html, render } from '/node_modules/lit-html/lit-html.js'

let url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function loadData() {

    let res = await fetch(url);
    let rowData = await res.json();
    let data = Object.values(rowData);

    update(data);
}

loadData();

function addItem() {

    let addBtn = document.querySelector('input[type=submit]');
    addBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        let text = document.getElementById('itemText').value;
        console.log(text);
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text
            })
        })

        if (res.status == 200) {
            console.log(await res.json());
            loadData();
            document.getElementById('itemText').value = '';
        }
    })
}
addItem()

function update(data) {
    let root = document.getElementById('menu');
    let optionList = (data) => html`
    ${data.map(el => html`<option value=${el._id}>${el.text}</option>`)}
    `
    render(optionList(data), root)
}
