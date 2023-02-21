import { showDetails } from "./details";

let homeSection = document.getElementById('homeView');
let formElement = homeSection.querySelector('form');

//console.log('INFO',formData.get('topicName'));

export function showHomePage(e) {
    //Задава да се визуализира в main home page-a
    document.getElementById('main').replaceChildren(homeSection);
    //Взима от формата бутоните и им задава евенти
    let cancelBtn = formElement.querySelector('button.cancel');
    cancelBtn.addEventListener('click', cancelFunc);

    let postBtn = formElement.querySelector('button.public');
    postBtn.addEventListener('click', postFunc);


}

async function postFunc(e) {
    e.preventDefault();
    let url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    let formData = new FormData(formElement);

    let info = {
        topicName: formData.get('topicName'),
        username: formData.get('username'),
        postText: formData.get('postText')
    }

    if (validate(info)) {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        let data = await res.json();
        render(data);
    }

}

function validate(info) {
    let result = true;

    for (let el of Object.values(info)) {
        if (el == '') {
            result = false;
        }
    }
    return result;
}

function cancelFunc(e) {
    e.preventDefault();
    document.getElementById('topicName').value = '';
    document.getElementById('username').value = '';
    document.getElementById('postText').value = '';
}

function render(data) {
    let newArticle = document.createElement('div');
    newArticle.setAttribute('class', 'topic-conteiner');
    newArticle.innerHTML = ` 
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal">
                <h2>${data.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>


            </div>
        </div>
    </div>`;
//newArticle.addEventListener('click', showDetails);
    document.querySelector('div.topic-container').appendChild(newArticle);
}