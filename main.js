const apikey = "9c158aaf2919302e0116d9b26c7442f0";
const sbox = document.getElementById("searchbox");
const button = document.getElementById("buttonclick");
const container = document.getElementById("describe");

const imgdata = (value) => {
    if (value >= 200 && value < 300)
        return '11d.png';
    if (value >= 300 && value < 400)
        return '09d.png';
    if (value >= 500 && value < 600)
        return '10d.png';
    if (value >= 600 && value < 700)
        return '13d.png';
    if (value >= 700 && value < 800)
        return '50d.png';
    if (value == 800)
        return '01d.png';
    if (value == 801)
        return '02d.png';
    if (value == 802)
        return '03d.png';
    if (value == 803)
        return '04d.png';
    if (value == 804)
        return '04d.png';
};

const getData = async () => {
    let value = sbox.value;
    let url = 'http://openweathermap.org/img/wn/';
    const api = `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apikey}&units=metric`;
    let res = await fetch(api);
    let data = await res.json();
    if (data["cod"] == '404') {
        const cinnerHTMl = `
            <div id="not-found">City Not Found. Enter a valid City name</div>
        `;
        container.innerHTML = cinnerHTMl;
    }
    else {
        const cinnerHTMl = `
            <div id = "name">${data['name']}, ${data['sys']['country']}</div>

            <div>
                <div id= "temp-info">
                    <img style="vertical-align:middle" src =${url + imgdata(data['weather'][0]['id'])}> 
                    <span id= "temp">${data['main']['temp']} °C</span>
                    <br>
                    <span>Feels like ${data['main']['feels_like']} °C</span>
                </div>

                <div id = "min-max">
                    <span>${data['main']['temp_min']} °C | ${data['main']['temp_max']} °C</span>
                    <br>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Min | Max </span>
                </div>
            </div>

            <div id = "bottom">
                <div><b>${data['weather'][0]['description']}</b></div>
                <div>
                    <span>Pressure: ${data['main']['pressure']} hPa</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Humidity: ${data['main']['humidity']} %</span>
                </div>
                <div>
                    <span>Wind Speed: ${data['wind']['speed']} M/s </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Visibility: ${(data['visibility'] / 1000).toFixed(1)} Km </span>
                </div>
            </div>
        `;

        container.innerHTML = cinnerHTMl;

    }
}

button.onclick = function () { getData() };


