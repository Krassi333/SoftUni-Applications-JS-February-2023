let url = 'http://localhost:3030/jsonstore/collections/students';
let tableBody = document.querySelector('#results tbody');
let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', createNewRecord);

takeDataFromServer();

async function takeDataFromServer() {
    let res = await fetch(url);
    let data = await res.json();
    for (let el in data) {
        renderData(data[el])
    }
    console.log(data);
}

function renderData(data) {
    let info = {
        firstName: data.firstName,
        lastName: data.lastName,
        facultyNumber: data.facultyNumber,
        grade: data.grade
    }

    let tr = document.createElement('tr');
    tableBody.appendChild(tr);

    for (let el in info) {
        let td = document.createElement('td');
        td.innerText = info[el];
        tr.appendChild(td);
    }
}

async function createNewRecord() {
    let firstNameField = document.querySelector('input[name="firstName"]');
    let lastNameField = document.querySelector('input[name="lastName"]');
    let facultyField = document.querySelector('input[name="facultyNumber"]');
    let gradeField = document.querySelector('input[name="grade"]');

    let info = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        facultyNumber: facultyField.value,
        grade: gradeField.value
    }

    firstNameField.value = '';
    lastNameField.value = '';
    facultyField.value = '';
    gradeField.value = '';

    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'aplication/json',
        },
        body: JSON.stringify(info)
    });

    console.log(await res.json());
}