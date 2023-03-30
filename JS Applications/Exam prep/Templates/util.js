export  function getUser() {
    let user = localStorage.getItem('user');
    
    if (user) {
        return JSON.parse(user);
    }
}


export  function setUser(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export  function clearUser() {
    localStorage.removeItem('user');
}