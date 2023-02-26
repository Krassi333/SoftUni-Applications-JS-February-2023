let rout = {
    '/': homePage,
    '/logout': logout,
    '/login': loginPage,
    '/register': registerPage

}

function hideAll() {
    document.querySelectorAll('.view-section').forEach(el => el.style.display = 'none');
}

function showSection(section) {
    hideAll();
    section.style.display = 'inline';
}


