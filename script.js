const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function extractForecastDays(forecastsArray) {
    const todayForecast = new Date(forecastsArray[0].dt_txt);

    return forecastsArray.filter((forecast) => new Date(forecast.dt_txt).getHours() === todayForecast.getHours());
}

function GetInfo() {
    const inputNameValue = document.querySelector("#cityInput").value;
    document.querySelector("#cityName").textContent = inputNameValue;


    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputNameValue}&appid=108a71d2be1836483c36f675b099eae4`)
        .then(response => response.json())
        .then(data => {

            const currentForecastsArray = extractForecastDays(data.list);

            currentForecastsArray.map((el, idx) => {
                document.getElementById("day" + (idx + 1)).textContent = weekday[normalizeDay(idx)];
                document.getElementById("day" + (idx + 1) + "Min").textContent = "Min: " + Number(el.main.temp_min - 273.15).toFixed(1) + "°";
                document.getElementById("day" + (idx + 1) + "Max").textContent = "Max: " + Number(el.main.temp_max - 273.15).toFixed(2) + "°";
                document.getElementById("day" + (idx + 1) + "Humidity").textContent = "Humidity: " + Number(el.main.humidity) + "%";
                document.getElementById("day" + (idx + 1) + "WindSpeed").textContent = "Wind Speed: " + Number(el.wind.speed) + "Km/h";
                document.getElementById("img" + (idx + 1)).src = "http://openweathermap.org/img/wn/" + el.weather[0].icon + ".png";
            });
        })
        .catch(() => alert("Something Went Wrong: Try Checking Your Internet Coneciton"));

}

function normalizeDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }

    return day + d.getDay();
}

const button = document.querySelector('#button');
button.addEventListener('click', () => GetInfo());

const d = new Date();