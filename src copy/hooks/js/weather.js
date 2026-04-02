
const locations = [

    { name: "Westlands", lat: -1.2676, lon: 36.8108 },
    { name: "Kamkunji", lat: -1.2816, lon: 36.8422 },
    { name: "Embakasi", lat: -1.3190, lon: 36.9278 },
    { name: "Starehe", lat: -1.2833, lon: 36.8167 },
    { name: "Kasarani", lat: -1.2210, lon: 36.8970 }

];



async function loadWeather() {

    const container = document.getElementById("weatherGrid");

    container.innerHTML = "";

    for (const loc of locations) {

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&hourly=relativehumidity_2m,cloudcover,windspeed_10m`;

        const res = await fetch(url);

        const data = await res.json();

        const weather = data.current_weather;

        // convert time to EAT
        const eatTime = new Date(weather.time).toLocaleString("en-KE", { //converts date into a human readable format afterfoemating and manipulating time
            timeZone: "Africa/Nairobi",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        const card = document.createElement("div");

        card.classList.add("weather-card");

        card.innerHTML = `

<div class="weather-location">${loc.name}</div>

<div class="weather-icon">🌤️</div>

<div class="weather-temp">${weather.temperature}°C</div>

<div class="weather-data">
<span>Wind</span>
<span>${weather.windspeed} km/h</span>
</div>

<div class="weather-data">
<span>Direction</span>
<span>${weather.winddirection}°</span>
</div>

 

 <div class="weather-data">
<span>Time</span>
<span>${eatTime} EAT</span>
</div>

`;

        container.appendChild(card);

    }

}

loadWeather();

setInterval(loadWeather, 600000);