function solve() {
    let stopID = 'depo';
    let stopName = '';
    let infoBox = document.querySelector('#info span');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    async function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stopID}`;
        try {
            let res = await fetch(url);

            if (res.status != 200) {
                throw new Error;
            }
            let data = await res.json();
            console.log(data);
            stopID = data.next;
            stopName = data.name;
            infoBox.innerText = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (error) {
            infoBox.innerText = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }



    }

    function arrive() {
        infoBox.innerText = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();