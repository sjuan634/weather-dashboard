const userInput = document.querySelector('#cityName');
const searchBtn = document.querySelector('#searchBtn');
const recentlySearchedList = document.querySelector('#recently-searched');
const searchResult = document.querySelector('#result-container');

// When the search button is clicked save the input into cityName variable
function handleSearchClick() {  
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
    
    recentlySearched(cityName);

    buildCurrentWeatherHTML(cityName, temp, wind, humidity);
    // function printForcast(city) {

    // }
  });
}

function recentlySearched(city) {
  const cityBtn = document.createElement('button')
  cityBtn.classList.add('w-full', 'bg-gray-500/80', 'font-semibold', 'py-1', 'rounded');
  cityBtn.setAttribute('id', 'cityBtn')
  cityBtn.textContent = city;

  recentlySearchedList.appendChild(cityBtn);
}

function buildCurrentWeatherHTML(city, date, temp, wind, humidity) {
  const currentWeatherDiv = document.createElement('div');
  currentWeatherDiv.classList.add('flex', 'flex-col', 'border', 'border-black', 'py-2', 'px-1');
  const cityNameEl = document.createElement('h2');
  cityNameEl.classList.add('h-12', 'block', 'text-3xl', 'font-bold');
  const tempEl = document.createElement('p');
  tempEl.classList.add('font-medium', 'my-2');
  const windEl = document.createElement('p');
  windEl.classList.add('font-medium', 'my-2');
  const humidityEl = document.createElement('p');
  humidityEl.classList.add('font-medium', 'my-2');

  cityNameEl.textContent = city;
  tempEl.textContent = temp;
  windEl.textContent = wind;
  humidityEl.textContent = humidity;

  currentWeatherDiv.appendChild(cityNameEl);
  currentWeatherDiv.appendChild(tempEl);
  currentWeatherDiv.appendChild(windEl);
  currentWeatherDiv.appendChild(humidityEl);

  searchResult.appendChild(currentWeatherDiv);
}

function buildFiveDayHTML(date, temp, wind, humidity) {
  const headerEl = document.createElement('h3');
  headerEl.classList.add('h-8', 'mt-2', 'block', 'text-xl', 'font-bold');
  headerEl.textContent = '5-Day Forecast:';
   
}

// listen for click on search button
searchBtn.addEventListener('click', handleSearchClick);