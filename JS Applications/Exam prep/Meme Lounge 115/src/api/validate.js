let messageField = document.querySelector('#errorBox span');
let notification=document.getElementById('errorBox');

export function validateRegisterData(data) {
    debugger
    if (data.email == '') {
        setErrorMessage('Please, enter email addres!');
        return false;
    }

    if (data.password == '') {
        setErrorMessage('Please, enter password!');
        return false;
    }

    if (data.username == '') {
        setErrorMessage('Please, enter username!');
        return false;
    }

    if (data.gender == '') {
        setErrorMessage('Please, select gender!');
        return false;
    }

    if (data.rePass == '') {
        setErrorMessage('Please, repeate your password!');
        return false;
    }

    if (data.password != data.rePass) {
        setErrorMessage('Password and repeated passsword does not match !');
        return false;
    }

    return true;
}

export function validateLoginData(data) {
debugger
    if (data.email == '') {
        setErrorMessage('Please, enter email addres !');
        return false;
    }

    if (data.password == '') {
        setErrorMessage('Please, enter your password!');
        return false;
    }

    return true;
}

export function validate(data) {
    let res = true;
    for (let el of Object.values(data)) {
        if (el == '') {
            res = false;
        }
    }

    if (!res) {
        setErrorMessage('Please, fill all fields!');
    } else {
        return res
    }
}

export function setErrorMessage(message) {
    debugger
    messageField.textContent = message;
    notification.style.display = 'inline-block';
    setTimeout(hideErrorMessage, 3000);
}

function hideErrorMessage() {
    notification.style.display = 'none';

}