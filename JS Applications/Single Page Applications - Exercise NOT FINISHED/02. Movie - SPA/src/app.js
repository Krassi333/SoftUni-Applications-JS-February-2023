
document.querySelector('nav').addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        let url = new URL(e.target.href);
        let path = url.pathname;
        
    }
})
