export function validateRegisterData(data) {

    if (data.email == '') {
        alert('Please, enter email addres!');
        return false;
    }

    if (data.password == '') {
        alert('Please, enter password!');
        return false;
    }

    if (data.rePass == '') {
        alert('Please, repeate your password!');
        return false;
    }

    if (data.password != data.rePass) {
        alert('Password and repeated passsword does not match !');
        return false;
    }

    return true;
}

export function validateLoginData(data) {

    if (data.email == '') {
        alert('Please, enter email addres !');
        return false;
    }

    if (data.password == '') {
        alert('Please, enter your password!');
        return false;
    }

    return true;
}

export function validate(data) {
    
    for (let el of Object.values(data)) {
        if (el == '') {
            return false;
        }
    }

    return true;
}