export function initialize(links) {
    let main = document.getElementById('main');
    document.querySelector('nav').addEventListener('click', onNavigate);

    let context = {
        showSection,
        goTo
    }

    function showSection(section) {
        main.replaceChildren(section);
    }

    return context;

    function onNavigate(e) {
        e.preventDefault();

        let target = e.target;

        if (target.tagName == 'IMG') {
            target = target.parentElement;
        }

        if (target.tagName == 'A') {
            let url = new URL(target.href);
            goTo(url.pathname);
        }

    }

    function goTo(path) {
        let linkToLoad = links[path];

        if (typeof linkToLoad === 'function') {
            linkToLoad(context);
        }
    }
}