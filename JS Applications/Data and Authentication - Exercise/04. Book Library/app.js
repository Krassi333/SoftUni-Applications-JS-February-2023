let loadBtn = document.getElementById('loadBooks');
loadBtn.addEventListener('click', loadBooks);

let submitBtn = document.querySelector('form button');
submitBtn.addEventListener('click', saveNewRecord);

let table = document.querySelector('table tbody');
let titleField = document.querySelector('input[name="title"]');
let authorField = document.querySelector('input[name="author"]');
let form = document.querySelector('form');

async function loadBooks() {
    table.innerHTML = '';

    let url = 'http://localhost:3030/jsonstore/collections/books';
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    for (let el in data) {
        renderData(data[el]);
    }

}

async function saveNewRecord(e) {
    e.preventDefault();

    let formElement = document.querySelector('form');
    let data = new FormData(formElement);

    let info = {
        author: data.get('author'),
        title: data.get('title')
    }

    let url = 'http://localhost:3030/jsonstore/collections/books';

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    });

    renderData(await res.json());

    titleField.value = '';
    authorField.value = '';
}

function renderData(data) {
    console.log(data._id);
    let tr = document.createElement('tr');
    tr.setAttribute('data-id', `${data._id}`);
    table.appendChild(tr);

    let tdTitle = document.createElement('td');
    tdTitle.innerText = data.title;
    tr.appendChild(tdTitle);

    let tdAuthor = document.createElement('td');
    tdAuthor.innerText = data.author;
    tr.appendChild(tdAuthor);

    let tdBtns = document.createElement('td');
    tr.appendChild(tdBtns);

    let editBtn = document.createElement('button');
    //editBtn.setAttribute('data-id', `${data._id}`);
    editBtn.innerText = 'Edit';
    editBtn.addEventListener('click', editFunctionality);
    tdBtns.appendChild(editBtn);

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    //deleteBtn.setAttribute('data-id', `${data._id}`);
    deleteBtn.addEventListener('click', deleteFunctionality);
    tdBtns.appendChild(deleteBtn);
    //TO DO buttons event
}

async function editFunctionality(e) {
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    console.log(id);
    let url = `http://localhost:3030/jsonstore/collections/books/${id}`;

    let parent = e.target.parentElement.parentElement;
    let children = parent.children;
    let title = children[0].innerText;
    let author = children[1].innerText;

    let formTitle = document.querySelector('form h3');
    formTitle.innerText = 'Edit FORM';

    //let titleField = document.querySelector('input[name="title"]');
    titleField.value = title;

    //let authorField = document.querySelector('input[name="author"]');
    authorField.value = author;

    //let submitBtn = document.querySelector('form button');

    let sendBtn = document.createElement('button');
    sendBtn.innerText = 'Send';
    sendBtn.addEventListener('click', sendFunction);

    submitBtn.remove();
    form.appendChild(sendBtn);

    async function sendFunction(e) {
        e.preventDefault();
        console.log(url);

        let newTitle = titleField.value;
        let newAuthor = authorField.value;
        let newData = {
            title: newTitle,
            author: newAuthor
        }
        let res = fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => {
                console.log(res.status);
            })



        //console.log(await res.json());
        sendBtn.remove();
        form.appendChild(submitBtn);
        formTitle.innerText = 'FORM';
        titleField.innerText = '';
        authorField.innerText = '';
    }

};

async function deleteFunctionality(e) {
    let id = e.target.parentElement.parentElement.getAttribute('data-id');
    let url = ` http://localhost:3030/jsonstore/collections/books/${id}`;

    let res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let tr = e.target.parentElement.parentElement;
    tr.remove();
}