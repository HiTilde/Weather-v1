const apiKey = 'bd043c8adbde6775ab61679575b44740'; // Замените на свой реальный API ключ
const city = 'Nitra'; 

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
        return response.json();
    }) 
    .then(data => {
        console.log(data);

        if (data.main && data.main.temp) {
            const temperature = Math.round(data.main.temp); // Температура
            const precipitation = data.weather[0].description.toLowerCase(); // Описание погоды
            const cityName = data.name; // Название города
            const wind = data.wind.speed; 

            const formattedDescription = precipitation.charAt(0).toUpperCase() + precipitation.slice(1);
            
            var photo = document.getElementById('currentPhoto');
            var tempEl = document.getElementById('temperature').textContent = `${temperature}°`;
            var windSpeed = document.getElementById('wind').textContent = `Wind speed: ${wind}m/s`;
            var desc = document.getElementById('precipitation').textContent = `Precipitation: ${formattedDescription}`;

            var block = document.getElementById('main__block');
            var bottomText = document.getElementById('bottom__text');
            var topCityName = document.getElementById('city');  
            topCityName.textContent = city.toUpperCase();
            
            if(precipitation.includes('rain')) {
                photo.src = 'img/Rain.png';
                block.style.background = '#B0D0D7';
                bottomText.textContent = 'Today is rainy';
            } else if(precipitation.includes('clouds')) {
                photo.src = 'img/Clouds.png';
                block.style.background = '#8AB9C3';
                bottomText.textContent = 'Today is cloudy';
            } else if(precipitation.includes('snow')) {
                photo.src = 'img/Snow.png';
                block.style.background = '#D2D2D2';
                bottomText.textContent = 'Today is snowy';
            } else if(precipitation.includes('thunderstorm')) {
                photo.src = 'img/Thunder.png';
                block.style.background = '#8FA9AF';
                bottomText.textContent = 'Today is stormy';
            } else if(precipitation.includes('clear')) {
                photo.src = 'img/Clear.png';
                block.style.background = '#D7D5B0';
                bottomText.textContent = 'Today is clear';
            }
        } else {
            console.error("Данные о температуре отсутствуют.");
        }
        topCityName.style.border = `3px solid ${block.style.background}`;
        topCityName.style.color = block.style.background;
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
