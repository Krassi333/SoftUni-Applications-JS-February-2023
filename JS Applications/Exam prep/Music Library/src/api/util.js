export async function getUser() {
    let user = localStorage.getItem('user');
    
    if(user){
        return JSON.parse(user);
    }
}

export async function setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export async function clearUser() {
    localStorage.removeItem('user');
}