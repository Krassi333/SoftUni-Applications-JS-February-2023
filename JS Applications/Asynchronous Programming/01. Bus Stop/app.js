function getInfo() {
    let checkBtn = document.getElementById('submit');
    checkBtn.addEventListener('click', async () => {
        let id = document.getElementById('stopId').value;
        let stopName = document.getElementById('stopName');
        let busesList = document.getElementById('buses');

        let url = `http://localhost:3030/jsonstore/bus/businfo/${id}`;

        try {
            busesList.replaceChildren();
            let res = await fetch(url);

            if (res.status != 200) {
                throw new Error;
            }

            let data = await res.json();
            stopName.innerText = `${data.name}`;

            let busesInfo = data.buses;
            console.log(busesInfo);

            for (let [key, value] of Object.entries(busesInfo)) {
                let li = document.createElement('li');
                li.innerText = `Bus ${key} arrives in ${value} minutes`;
                busesList.appendChild(li);
            }
        } catch (error) {
            stopName.innerText = 'Error';
        }

    })
}