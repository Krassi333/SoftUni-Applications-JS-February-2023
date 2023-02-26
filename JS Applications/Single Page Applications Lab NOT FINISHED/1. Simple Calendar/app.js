let body = Array.from(document.querySelector('body'));
let childEl=body.children;
console.log(childEl);
childEl.map(element => {
    element.style.display = 'none';
});

let homePage = document.getElementById('years');
console.log(homePage);
function showHomePage() {

    homePage.style.display = 'block';
}
showHomePage();