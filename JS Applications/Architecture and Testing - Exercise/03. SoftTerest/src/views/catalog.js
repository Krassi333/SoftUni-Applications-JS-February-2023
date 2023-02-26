import { loadAllIdeas } from "../api/data.js";

let section = document.getElementById('dashboard-holder');

export async function showCatalog(context) {
    context.showSection(section);

    let ideas = await loadAllIdeas();

    if (ideas.length == 0) {
        section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    } else {
        section.replaceChildren(...ideas.map(renderIdea))
    }
}

function renderIdea(idea) {
    let div = document.createElement('div');
    div.setAttribute('class', 'card overflow-hidden current-card details');
    div.setAttribute('style', 'width: 20rem; height: 18rem;');

    div.innerHTML = `
     <div class="card-body">
       <p class="card-text">${idea.title}</p>
    </div>
    <img class="card-image" src="${idea.img}" alt="Card image cap">
    <a class="btn" href="/details">Details</a>`;

    return div
}
