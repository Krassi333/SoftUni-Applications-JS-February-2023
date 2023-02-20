let formElement = document.querySelector(form);

formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);

    let email = formData.get('email');
    let pass = formData.get('password');
})