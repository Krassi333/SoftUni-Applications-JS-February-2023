console.log('TODO:// Implement Home functionality');
let addBtn = document.querySelector('button.add');

let catchesField = document.getElementById('main');
catchesField.innerHTML = '';
let legend = document.createElement('legend');
legend.innerText = 'Catches';
catchesField.appendChild(legend);

let token = localStorage.getItem('accessToken');
let userId = localStorage.getItem('id');

let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', async () => {
    let url = 'http://localhost:3030/users/logout';

    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Authorization': token
        }
    });

    localStorage.clear();
    window.location = './index.html';

})
if (token) {
    let email = localStorage.getItem('email');
    document.querySelector('p.email span').textContent = email;

    let href = document.querySelectorAll('a');
    href = Array.from(href);
    href[2].style.display = 'none';
    href[3].style.display = 'none';

    addBtn.disabled = false;
    addBtn.addEventListener('click', addNewRecord);
}

let loadBtn = document.querySelector('button.load');

loadBtn.addEventListener('click', loadFunc)
async function loadFunc() {
    let url = 'http://localhost:3030/data/catches';
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    catchesField.innerHTML = '';

    for (let fish in data) {
        renderData(data[fish]);
    }


}

function renderData(data) {
    let ownerId = data._ownerId;

    console.log(ownerId);

    let div = document.createElement('div');
    div.setAttribute('class', 'catch');
    div.innerHTML = ` <label>Angler</label>
     <input type="text" class="angler" value=${data.angler}>
     <label>Weight</label>
     <input type="text" class="weight" value=${data.weight}>
     <label>Species</label>
     <input type="text" class="species" value=${data.species}>
     <label>Location</label>
     <input type="text" class="location" value=${data.location}>
     <label>Bait</label>
     <input type="text" class="bait" value=${data.bait}>
     <label>Capture Time</label>
     <input type="number" class="captureTime" value=${data.captureTime}>`;
    // <button class="update" data-id=${data._id}>Update</button>
    //<button class="delete" data-id=${data._id}>Delete</button>

    let updateBtn = document.createElement('button');
    updateBtn.setAttribute('class', 'update');
    updateBtn.setAttribute('data-id', data._id);
    updateBtn.innerText = 'Update';
    updateBtn.addEventListener('click', updateFunc);
    div.appendChild(updateBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete');
    deleteBtn.setAttribute('data-id', data._id);
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', deleteFunc);
    div.appendChild(deleteBtn);

    if (userId != ownerId) {
        updateBtn.disabled = true;
        deleteBtn.disabled = true;
    }
    catchesField.appendChild(div);
}

async function updateFunc(e) {
    let children = Array.from(e.target.parentElement.children);
    let id = e.target.getAttribute('data-id');
    let token = localStorage.getItem('accessToken');

    let newInfo = {};

    for (let el of children) {

        switch (el.className) {
            case 'angler':
                newInfo.angler = el.value;
                break;
            case 'weight':
                newInfo.weight = el.value;
                break;
            case 'species':
                newInfo.species = el.value;
                break;
            case 'location':
                newInfo.location = el.value;
                break;
            case 'bait':
                newInfo.bait = el.value;
                break;
            case 'captureTime':
                newInfo.captureTime = el.value;
                break;
        }
    };

    let url = `http://localhost:3030/data/catches/${id}`;

    let res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(newInfo)
    })

    loadFunc();
};

async function deleteFunc(e) {
    let id = e.target.getAttribute('data-id');
    let token = localStorage.getItem('accessToken');

    let url = `http://localhost:3030/data/catches/${id}`;

    let res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    })

    e.target.parentElement.remove();
}

async function addNewRecord(e) {
    e.preventDefault();

    let url = 'http://localhost:3030/data/catches';
    let id = localStorage.getItem('id');
    let form = document.getElementById('addForm');
    let data = new FormData(form);

    let body = {
        angler: data.get('angler'),
        weight: data.get('weight'),
        species: data.get('species'),
        location: data.get('location'),
        bait: data.get('bait'),
        captureTime: data.get('captureTime'),
        '_ownerId': `${id}`
    }

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
            'X-Authorization': token
        },
        body: JSON.stringify(body)
    });

    let response = await res.json();
    console.log(response);
}
