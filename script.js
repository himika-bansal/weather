const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector(".location-not-found");
const weather_box = document.querySelector(".weather-box");
const weather_details = document.querySelector(".weather-details");


async function checkWeather(city){
    const api_key = "0d8a009348d3cee443a9a165484ac82b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod==404){
        location_not_found.style.display = "flex";
        weather_box.style.display = "none";
        weather_details.style.display = "none";
        weather_img.style.display = "none";
        return;
    }

    location_not_found.style.display = "none";
    weather_box.style.display = "block";
    weather_details.style.display = "flex";

    console.log(weather_data);

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`
    description.innerHTML = `${weather_data.weather[0].description}`
    humidity.innerHTML = `${weather_data.main.humidity}%`
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`

    switch(weather_data.weather[0].main){
        case "Clouds":
            weather_img.src = "assets/clouds.png";
            break;
        case "Clear":
            weather_img.src = "assets/clear.png";
            break;
        case "Mist":
            weather_img.src = "assets/mist.png";
            break;
        case "Rain":
            weather_img.src = "assets/rain.png";
            break;
        case "Snow":
            weather_img.src = "assets/snow.png";
            break;
        case "Haze":
            weather_img.src = "assets/haze.png";
            break;
    }
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});
