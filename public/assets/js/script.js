const userInput = document.querySelector('#cityName');
const searchBtn = document.querySelector('#searchBtn');
const recentlySearchedList = document.querySelector('#recently-searched');
const searchResult = document.querySelector('#result-container');

// When the search button is clicked capture the user input
function handleSearchClick(event) {  
  event.preventDefault();
  apiCall(userInput.value);
}

// make fetch request from API and sort data
function apiCall(city) {
  const apiKey = '157499d21dd495e0a8fe984869b7e994'
  const apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL)
  .then(function (response) {
    if (response.status !== 200) {
      alert('Try again. Make sure the city name is correct.')
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    const cityName = data.city.name;
    const temp = data.list[0].main.temp;
    const wind = data.list[0].wind.speed;
    const humidity = data.list[0].main.humidity;
    const date = data.list[0].dt_txt.split(' ').shift();
    const icon = data.list[0].weather[0].icon;
    const iconDesc = data.list[0].weather[0].description;

    console.log(date);

    recentlySearched(cityName);

    buildCurrentWeatherHTML(cityName, date, icon, iconDesc, temp, wind, humidity);

    buildFiveDayHTML(date, icon, iconDesc, temp, wind, humidity);
  });
}

function recentlySearched(city) {
  const cityBtn = document.createElement('button')
  cityBtn.classList.add('w-full', 'bg-gray-500/80', 'font-semibold', 'py-1', 'rounded');
  cityBtn.setAttribute('id', 'cityBtn')
  cityBtn.textContent = city;

  recentlySearchedList.appendChild(cityBtn);
}

function buildCurrentWeatherHTML(city, date, icon, iconDesc, temp, wind, humidity) {
  const currentWeatherDiv = document.createElement('div');
  currentWeatherDiv.classList.add('flex', 'flex-col', 'border', 'border-black', 'py-2', 'px-1');
  const cityNameEl = document.createElement('h2');
  cityNameEl.classList.add('h-12', 'text-3xl', 'font-bold');
  const iconEl = document.createElement('img');
  iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
  iconEl.setAttribute('alt', iconDesc);
  iconEl.classList.add('inline');
  const tempEl = document.createElement('p');
  tempEl.classList.add('font-medium', 'my-2');
  const windEl = document.createElement('p');
  windEl.classList.add('font-medium', 'my-2');
  const humidityEl = document.createElement('p');
  humidityEl.classList.add('font-medium', 'my-2');

  cityNameEl.textContent = `${city} ${date}`;
  tempEl.textContent = `Temp: ${temp} °F`;
  windEl.textContent = `Wind: ${wind} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  cityNameEl.appendChild(iconEl);
  currentWeatherDiv.appendChild(cityNameEl);
  currentWeatherDiv.appendChild(tempEl);
  currentWeatherDiv.appendChild(windEl);
  currentWeatherDiv.appendChild(humidityEl);

  searchResult.appendChild(currentWeatherDiv);
}

function buildFiveDayHTML(date, icon, iconDesc, temp, wind, humidity) {
  const headerEl = document.createElement('h3');
  headerEl.classList.add('h-8', 'mt-2', 'text-xl', 'font-bold');
  headerEl.textContent = '5-Day Forecast:';
  const fiveDayDiv = document.createElement('div');
  fiveDayDiv.classList.add('flex', 'flex-wrap', 'justify-between');
  for (let i = 0; i < 5; i++) {
    const oneDayDiv = document.createElement('div');
    oneDayDiv.classList.add('w-1/6', 'h-40', 'bg-blue-900/90', 'px-1', 'text-white/90');
    oneDayDiv.setAttribute('id', `day${i}`)
    const dateEl = document.createElement('h4');
    dateEl.classList.add('font-bold');
    const iconEl = document.createElement('img');
    iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
    iconEl.setAttribute('alt', iconDesc);
    const tempEl = document.createElement('p');
    tempEl.classList.add('font-medium', 'my-1');
    const windEl = document.createElement('p');
    windEl.classList.add('font-medium', 'my-1');
    const humidityEl = document.createElement('p');
    humidityEl.classList.add('font-medium', 'my-1');

    dateEl.textContent = date;
    tempEl.textContent = temp;
    windEl.textContent = wind;
    humidityEl.textContent = humidity;

    oneDayDiv.appendChild(dateEl);
    oneDayDiv.appendChild(iconEl);
    oneDayDiv.appendChild(tempEl);
    oneDayDiv.appendChild(windEl);
    oneDayDiv.appendChild(humidityEl);
    fiveDayDiv.appendChild(oneDayDiv);
  }

  searchResult.appendChild(fiveDayDiv);
}

// listen for click on search button
searchBtn.addEventListener('click', handleSearchClick);