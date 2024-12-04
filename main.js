const apiKey = 'bd043c8adbde6775ab61679575b44740'; // Замените на свой реальный API ключ
const city = 'Nitra'; 

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const photo = document.getElementById('currentPhoto');
const block = document.getElementById('main__block');
const bottomText = document.getElementById('bottom__text');
const topCityName = document.getElementById('city');

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }

        return response.json();
    }) 
    .then(data => {
        console.log(data);

        if (!(data.main && data.main.temp)) {
            console.error("Данные о температуре отсутствуют.");
            return;
        }

        const temperature = Math.round(data.main.temp); // Температура
        const precipitation = data.weather[0].description.toLowerCase(); // Описание погоды
        console.log(data.weather[0].main);
        const cityName = data.name; // Название города
        const wind = data.wind.speed;

        const formattedDescription = precipitation.charAt(0).toUpperCase() + precipitation.slice(1);

        var tempEl = document.getElementById('temperature').textContent = `${temperature}°`;
        var windSpeed = document.getElementById('wind').textContent = `Wind speed: ${wind}m/s`;
        var desc = document.getElementById('precipitation').textContent = `Precipitation: ${formattedDescription}`;

        topCityName.textContent = city.toUpperCase();

        switch (data.weather[0].main) {
            case 'Rain':
                changeContent('img/Rain.png', '#B0D0D7', 'Today is rainy');
                break;
            case 'Clouds':
                changeContent('img/Clouds.png', '#8AB9C3', 'Today is cloudy');
                break;
            case 'Snow':
                changeContent('img/Snow.png', '#D2D2D2', 'Today is snowy');
                break;
            case 'Thunderstorm':
                changeContent('img/Thunder.png', '#8FA9AF', 'Today is stormy');
                break;
            case 'Clear':
                changeContent('img/Clear.png', '#D7D5B0', 'Today is clear');
                break;
            default:
                changeContent('img/Clear.png', '#D7D5B0', 'Unknown weather');
                break;
        }

        topCityName.style.border = `3px solid ${block.style.background}`;
        topCityName.style.color = block.style.background;
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });

/**
 * @param {string} urlToImg
 * @param {string} bgColor
 * @param {string} text
 * @return {void}
 * */
function changeContent(urlToImg, bgColor, text) {
    photo.src = urlToImg;
    block.style.background = bgColor;
    bottomText.textContent = text;
}