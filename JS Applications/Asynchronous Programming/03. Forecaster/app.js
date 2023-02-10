function attachEvents() {
    let getWeatherBtn = document.getElementById('submit');
    let locationField = document.getElementById('location');
    let currentInfoField = document.getElementById('current');
    let upcomingField = document.getElementById('upcoming');
    let symbols = {
        'Sunny': "&#x2600",
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': "&#x2614",
        'Degrees': '&#176'
    }

    getWeatherBtn.addEventListener('click', async () => {
        try {
            let location = locationField.value;
            let url_locations = 'http://localhost:3030/jsonstore/forecaster/locations';
            let res = await fetch(url_locations);

            if (res.status != 200) {
                throw new Error;
            }
            let locationsList = await res.json();

            let isTheSityOnServer = false;
            for (let el of locationsList) {
                if (location == el.name) {
                    isTheSityOnServer = true;
                    currentInfoField.innerHTML = '';
                    upcomingField.innerHTML = '';
                    let code = el.code;
                    let url_current = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
                    res = await fetch(url_current);

                    if (res.status != 200) {
                        throw new Error;
                    }
                    let currentInfo = await res.json();
                    console.log(currentInfo);

                    let url_3Days = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
                    res = await fetch(url_3Days);

                    if (res.status != 200) {
                        throw new Error;
                    }
                    let threeDays = await res.json();
                    console.log(threeDays);


                    document.getElementById('forecast').style = 'display:block;';

                    //Current conditions
                    let div = document.createElement('div');
                    div.setAttribute('class', 'forecasts');
                    currentInfoField.appendChild(div);

                    let firstSpan = document.createElement('span');
                    firstSpan.setAttribute('class', 'condition symbol');
                    firstSpan.innerHTML = symbols[currentInfo.forecast.condition];
                    div.appendChild(firstSpan);

                    let secondSpan = document.createElement('span');
                    secondSpan.setAttribute('class', 'condition');
                    div.appendChild(secondSpan);

                    let span_1 = document.createElement('span');
                    span_1.setAttribute('class', 'forecast-data');
                    span_1.innerText = currentInfo.name;
                    secondSpan.appendChild(span_1);

                    let span_2 = document.createElement('span');
                    span_2.setAttribute('class', 'forecast-data');
                    span_2.innerHTML = `${currentInfo.forecast.low}${symbols.Degrees}/${currentInfo.forecast.high}${symbols.Degrees}`;
                    secondSpan.appendChild(span_2);

                    let span_3 = document.createElement('span');
                    span_3.setAttribute('class', 'forecast-data');
                    span_3.innerText = currentInfo.forecast.condition;
                    secondSpan.appendChild(span_3);

                    //Three-day forecast
                    let secondDiv = document.createElement('div');
                    secondDiv.setAttribute('class', 'forecast-info');
                    upcomingField.appendChild(secondDiv);

                    for (let day of threeDays.forecast) {
                        let upcomingSpan = document.createElement('span');
                        upcomingSpan.setAttribute('class', 'upcoming');
                        secondDiv.appendChild(upcomingSpan);

                        let symbolSpan = document.createElement('span');
                        symbolSpan.setAttribute('class', 'symbol')
                        symbolSpan.innerHTML = symbols[day.condition];
                        upcomingSpan.appendChild(symbolSpan);

                        let degreeceSpan = document.createElement('span');
                        degreeceSpan.setAttribute('class', 'forecast-info');
                        degreeceSpan.innerHTML = `${day.low}${symbols.Degrees}/${day.high}${symbols.Degrees}`;
                        upcomingSpan.appendChild(degreeceSpan);

                        let conditionSpan = document.createElement('span');
                        conditionSpan.setAttribute('class', 'forecast-info');
                        conditionSpan.innerText = day.condition;
                        upcomingSpan.appendChild(conditionSpan);

                    }

                }

            }

            if (!isTheSityOnServer) {
                throw new Error;
            }
        } catch (error) {
            document.getElementById('forecast').style = 'display:block;'
            currentInfoField.innerText = 'Error';
            upcomingField.remove();

        }



    })
}

attachEvents();