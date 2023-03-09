export function validate(data) {
    let res = true;
//debugger
    for (let el of Object.values(data)) {
        if (el == "") {
            res = false;
        }
    }

    return res;
}