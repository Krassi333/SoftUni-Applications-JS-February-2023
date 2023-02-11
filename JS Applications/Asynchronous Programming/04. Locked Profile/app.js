async function lockedProfile() {
    let url = 'http://localhost:3030/jsonstore/advanced/profiles';
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    let mainField = document.getElementById('main');

    for (let el in data) {
        let info = data[el];
        console.log(info);
        let mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'profile');
        mainField.appendChild(mainDiv);

        let img = document.createElement('img');
        img.src = `./iconProfile2.png`;
        img.setAttribute('class', 'userIcon');
        mainDiv.appendChild(img);

        let lockLabel = document.createElement('label');
        lockLabel.innerText = 'Lock';
        mainDiv.appendChild(lockLabel);

        let lockInput = document.createElement('input');
        lockInput.type = 'radio';
        lockInput.name = 'user1Locked';
        lockInput.value = 'lock';
        lockInput.checked = true;
        mainDiv.appendChild(lockInput);

        let unlockLabel = document.createElement('label');
        unlockLabel.innerText = 'Unlock';
        mainDiv.appendChild(unlockLabel);

        let unlockInput = document.createElement('input');
        unlockInput.type = 'radio';
        unlockInput.name = 'user1Locked';
        unlockInput.value = 'unlock';
        mainDiv.appendChild(unlockInput);

        mainDiv.appendChild(document.createElement('br'));
        mainDiv.appendChild(document.createElement('hr'));

        let usernameLabel = document.createElement('label');
        usernameLabel.innerText = 'Username';
        mainDiv.appendChild(usernameLabel);

        let usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.name = 'user1Username';
        usernameInput.value = `${info.username}`;
        usernameInput.disabled = true;
        usernameInput.readOnly = true;
        mainDiv.appendChild(usernameInput);

        let div = document.createElement('div');
        div.setAttribute('class', 'user1Username');
        mainDiv.appendChild(div);

        div.appendChild(document.createElement('hr'));

        let emailLabel = document.createElement('label');
        emailLabel.innerText = 'Email:';
        emailLabel.style.display = 'none';
        div.appendChild(emailLabel);

        let emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'user1Email';
        emailInput.value = `${info.email}`;
        emailInput.disabled = true;
        emailInput.readOnly = true;
        emailInput.style.display = 'none';
        div.appendChild(emailInput);

        let ageLabel = document.createElement('label');
        ageLabel.innerText = 'Age:';
        ageLabel.style.display = 'none';
        div.appendChild(ageLabel);

        let ageInput = document.createElement('input');
        ageInput.type = 'text';
        ageInput.name = 'user1Age';
        ageInput.style.display = 'none';
        console.log(info.age);
        ageInput.value = `${info.age}`;
        ageInput.disabled = true;
        ageInput.readOnly = true;
        div.appendChild(ageInput);

        let btn = document.createElement('button');
        btn.innerText = 'Show more';
        div.appendChild(btn);
    }

    let profils = document.getElementsByClassName('profile');
    profils[0].remove();

    let btns = document.getElementsByTagName('button');
    for (let el of btns) {
        el.addEventListener('click', (event) => {
            let btn = event.target;
            let parentDiv = btn.parentElement;
            let grandparentDiv = btn.parentElement.parentElement;
            let isLocked = false;

            let divChildren = grandparentDiv.children;

            if (divChildren[2].checked == true) {
                isLocked = true;
            }

            if (isLocked == false) {
                let childs = parentDiv.children;
                childs[1].style.display = 'block';
                childs[2].style.display = 'block';
                childs[3].style.display = 'block';
                childs[4].style.display = 'block';

                btn.remove();
                let newBtn = document.createElement('button');
                newBtn.innerText = 'Hide it';
                parentDiv.appendChild(newBtn);
                newBtn.addEventListener('click', () => {
                    isLocked=false;
                    
                    if (divChildren[2].checked == true) {
                        isLocked = true;
                    }

                    if (isLocked==false) {
                        childs[1].style.display = 'none';
                        childs[2].style.display = 'none';
                        childs[3].style.display = 'none';
                        childs[4].style.display = 'none';
                        newBtn.remove();
                        parentDiv.appendChild(btn);
                    }

                })
            }
        })
    }


}