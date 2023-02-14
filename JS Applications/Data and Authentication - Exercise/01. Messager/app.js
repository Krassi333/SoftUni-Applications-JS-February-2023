function attachEvents() {
    let textarea = document.getElementById('messages');
    let nameField = document.querySelector('input[name="author"]');
    let messageField = document.querySelector('input[name="content"]');
    let sendBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');
    let url = 'http://localhost:3030/jsonstore/messenger';

    refreshBtn.addEventListener('click', async () => {

        let res = await fetch(url);
        let data = await res.json();
        let info = [];

        for (let el in data) {
            info.push(`${data[el].author}: ${data[el].content}`);
        }
        textarea.textContent = info.join('\n');
    });

    sendBtn.addEventListener('click', async () => {
        let author = nameField.value;
        let content = messageField.value;

        nameField.value = '';
        messageField.value = '';

        let info = {
            author: author,
            content: content
        };

        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        });

        let data = await res.json();
        console.log(data);
    });

}

attachEvents();