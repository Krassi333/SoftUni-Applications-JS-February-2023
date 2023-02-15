function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/phonebook';
    let phonebook = document.getElementById('phonebook');
    let loadBtn = document.getElementById('btnLoad');
    let nameField = document.getElementById('person');
    let phoneField = document.getElementById('phone');
    let createBtn = document.getElementById('btnCreate');


    loadBtn.addEventListener('click', async () => {
        phonebook.innerText = '';
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);

        for (let el in data) {
            renderInfo(data[el]);
            console.log(data[el]);
        }
    });

    function renderInfo(data) {
        let li = document.createElement('li');
        li.setAttribute('data-id', `${data._id}`);
        li.innerText = `${data.person}: ${data.phone}`;

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', deleteRecord);
        li.appendChild(deleteBtn);

        phonebook.appendChild(li);
    }

    async function deleteRecord(e) {

        let li = e.target.parentElement;
        console.log(li);
        let id = li.getAttribute('data-id');
        console.log(id);
        let url = `http://localhost:3030/jsonstore/phonebook/${id}`;

        let res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        li.remove();
    }

    createBtn.addEventListener('click', createRecord);

    async function createRecord() {

        let info = {
            person: nameField.value,
            phone: phoneField.value
        }

        nameField.value = '';
        phoneField.value = '';

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        let data = await res.json();

        renderInfo(data);
    };


}

attachEvents();