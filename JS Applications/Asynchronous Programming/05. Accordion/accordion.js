async function solution() {
    let main = document.getElementById('main');

    let url = 'http://localhost:3030/jsonstore/advanced/articles/list  ';
    let res = await fetch(url);
    let articles = await res.json();

    for (let el of articles) {
        let title = el.title;
        let id = el._id;

        let article_url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        let responce = await fetch(article_url);
        let info = await responce.json();
        //console.log(info.content);

        let accordionDiv = document.createElement('div');
        accordionDiv.setAttribute('class', 'accordion');
        main.appendChild(accordionDiv);

        let headDiv = document.createElement('div');
        headDiv.setAttribute('class', 'head');
        accordionDiv.appendChild(headDiv);

        let span = document.createElement('span');
        span.innerText = `${title}`;
        headDiv.appendChild(span);

        let moreBtn = document.createElement('button');
        moreBtn.setAttribute('class', 'button');
        moreBtn.setAttribute('id', `${id}`);
        moreBtn.innerText = 'MORE';
        moreBtn.addEventListener('click', reveal);
        headDiv.appendChild(moreBtn);

        let extraDiv = document.createElement('div');
        extraDiv.setAttribute('class', 'extra');
        accordionDiv.appendChild(extraDiv);

        let p = document.createElement('p');
        p.innerText = info.content;
        extraDiv.appendChild(p);
    }

    function reveal(event){
        let btn=event.target;
        let grandParent=btn.parentElement.parentElement;
        let children=grandParent.children ;
        let extraDiv=children[1];
        extraDiv.style.display='block';
        btn.innerText='LESS';
        btn.removeEventListener('click', reveal);
        btn.addEventListener('click', hide);

    }

    function hide(event){
        let btn=event.target;
        let grandParent=btn.parentElement.parentElement;
        let children=grandParent.children ;
        let extraDiv=children[1];
        extraDiv.style.display='none';
        btn.innerText='MORE';
        btn.removeEventListener('click', hide);
        btn.addEventListener('click', reveal);
    }



}

solution();