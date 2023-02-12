function attachEvents() {
    let url_posts = 'http://localhost:3030/jsonstore/blog/posts';
    let url_comments = 'http://localhost:3030/jsonstore/blog/comments';

    let postsOptions = document.getElementById('posts');
    let loadBtn = document.getElementById('btnLoadPosts');
    let title = document.getElementById('post-title');
    let postText = document.getElementById('post-body');
    let commentsList = document.getElementById('post-comments');

    loadBtn.addEventListener('click', async () => {
        let res = await fetch(url_posts);
        let data = await res.json();

        console.log(data);

        for (let el in data) {
            let value = el;
            let title = data[el].title;

            let option = document.createElement('option');
            option.setAttribute('value', `${value}`);
            option.innerText = title;
            postsOptions.appendChild(option);
        }
    });

    let viewBtn = document.getElementById('btnViewPost');

    viewBtn.addEventListener('click', async () => {
        title.innerText = 'Post Details';
        postText.innerText = '';
        commentsList.innerHTML = '';

        let selected = postsOptions.value;
        let res = await fetch(`${url_posts}/${selected}`);
        let data = await res.json();

        title.innerText = data.title;
        postText.innerText = data.body;

        let getComments = await fetch(url_comments);
        let comments = await getComments.json();

        for (let el in comments) {
        
            if (comments[el].postId == selected) {
                let li = document.createElement('li');
                li.innerText = comments[el].text;
                commentsList.appendChild(li);
            }
        }

    })
}

attachEvents();