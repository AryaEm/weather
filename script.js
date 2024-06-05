document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '85449652fec8f1ec8894f32cd0ae72e6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Lah kok error =>  ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            if (data.cod !== 200) {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
            } else {
                weatherResult.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <h4>${data.main.temp}°C</h4>
                    <p>Condition: ${data.weather[0].description}</p>
                    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const weatherResult = document.getElementById('weatherResult');
            weatherResult.innerHTML = `<p>Gagal ngambil data coba lagi nanti😘.</p>`;
        });
});
