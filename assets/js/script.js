const userInput = document.querySelector('#cityName');
const searchBtn = document.querySelector('#searchBtn');
const recentlySearchedList = document.querySelector('#recently-searched');
const searchResult = document.querySelector('#result-container');

async function fetchData(query) {
  const apiKey = '157499d21dd495e0a8fe984869b7e994'
  const apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=imperial&appid=${apiKey}`;
  const response = await fetch(apiURL);
  const data = await response.json();
  return data;
}

async function handleSearchClick(event) {  
  event.preventDefault();
  const data = await fetchData(userInput.value)
  console.log(data);
}

searchBtn.addEventListener('click', handleSearchClick);

// When the search button is clicked capture the user input
// function handleSearchClick(event) {  
//   event.preventDefault();

//   while (searchResult.firstChild) {
//   searchResult.removeChild(searchResult.firstChild);
//   }

//   function apiCall(city) {
//     const apiKey = '157499d21dd495e0a8fe984869b7e994'
//     const apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

//     fetch(apiURL)
//       .then(function (response) {
//         if (response.status !== 200) {
//           alert('Try again. Make sure the city name is correct.')
//         }
//         return response.json();
//         })
//       .then(function (data) {
//         function recentlySearched() {
//           const cityBtnArr = [];
//           const cityName = data.city.name;
//           const cityBtn = document.createElement('button')
//           cityBtn.classList.add('w-full', 'bg-gray-500/80', 'font-semibold', 'py-1', 'rounded', 'city');
//           cityBtn.dataset.city = cityName.replaceAll(' ','');
//           cityBtn.textContent = cityName;
//           cityBtnArr.push(cityBtn.textContent)

//           recentlySearchedList.appendChild(cityBtn);

//           localStorage.setItem(cityBtn.dataset.city, cityName);
//         }

//         function buildCurrentWeatherHTML() {
//           const cityName = data.city.name;
//           const temp = data.list[0].main.temp;
//           const wind = data.list[0].wind.speed;
//           const humidity = data.list[0].main.humidity;
//           const date = data.list[0].dt_txt.split(' ').shift();
//           const icon = data.list[0].weather[0].icon;
//           const iconDesc = data.list[0].weather[0].description;

//           const currentWeatherDiv = document.createElement('div');
//           currentWeatherDiv.classList.add('flex', 'flex-col', 'border', 'border-black', 'py-2', 'px-1');
//           currentWeatherDiv.setAttribute('id', 'current-weather')
//           const cityNameEl = document.createElement('h2');
//           cityNameEl.classList.add('h-12', 'text-3xl', 'font-bold');
//           const iconEl = document.createElement('img');
//           iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
//           iconEl.setAttribute('alt', iconDesc);
//           iconEl.classList.add('inline');
//           const tempEl = document.createElement('p');
//           tempEl.classList.add('font-medium', 'my-2');
//           const windEl = document.createElement('p');
//           windEl.classList.add('font-medium', 'my-2');
//           const humidityEl = document.createElement('p');
//           humidityEl.classList.add('font-medium', 'my-2');

//           cityNameEl.textContent = `${cityName} ${date}`;
//           tempEl.textContent = `Temp: ${temp} °F`;
//           windEl.textContent = `Wind: ${wind} MPH`;
//           humidityEl.textContent = `Humidity: ${humidity} %`;

//           cityNameEl.appendChild(iconEl);
//           currentWeatherDiv.appendChild(cityNameEl);
//           currentWeatherDiv.appendChild(tempEl);
//           currentWeatherDiv.appendChild(windEl);
//           currentWeatherDiv.appendChild(humidityEl);

//           searchResult.appendChild(currentWeatherDiv);
//         }

//         function buildFiveDayHTML() {
//           const headerEl = document.createElement('h3');
//           headerEl.classList.add('h-8', 'mt-2', 'text-xl', 'font-bold');
//           headerEl.setAttribute('id', 'five-day-header');
//           headerEl.textContent = '5-Day Forecast:';
//           const fiveDayDiv = document.createElement('div');
//           fiveDayDiv.classList.add('flex', 'flex-wrap', 'justify-between');
//           fiveDayDiv.setAttribute('id', 'five-day-weather');
  
//           const listArrIndex = [0, 8, 16, 24, 32];
//           for (let i = 0; i < listArrIndex.length; i++) {
//             const temp = data.list[listArrIndex[i]].main.temp;
//             const wind = data.list[listArrIndex[i]].wind.speed;
//             const humidity = data.list[listArrIndex[i]].main.humidity;
//             const date = data.list[listArrIndex[i]].dt_txt.split(' ').shift();
//             const icon = data.list[listArrIndex[i]].weather[0].icon;
//             const iconDesc = data.list[listArrIndex[i]].weather[0].description;

//             const oneDayDiv = document.createElement('div');
//             oneDayDiv.classList.add('min-w-fit', 'min-h-fit', 'bg-blue-900/80', 'px-1', 'text-white/90');
//             oneDayDiv.setAttribute('id', `day${i}`)
//             const dateEl = document.createElement('h4');
//             dateEl.classList.add('font-bold');
//             const iconEl = document.createElement('img');
//             iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`);
//             iconEl.setAttribute('alt', iconDesc);
//             const tempEl = document.createElement('p');
//             tempEl.classList.add('font-medium', 'my-1');
//             const windEl = document.createElement('p');
//             windEl.classList.add('font-medium', 'my-1');
//             const humidityEl = document.createElement('p');
//             humidityEl.classList.add('font-medium', 'my-1');

//             dateEl.textContent = date;
//             tempEl.textContent = `Temp: ${temp} °F`;
//             windEl.textContent = `Wind: ${wind} MPH`;
//             humidityEl.textContent = `Humidity: ${humidity} %`;

//             oneDayDiv.appendChild(dateEl);
//             oneDayDiv.appendChild(iconEl);
//             oneDayDiv.appendChild(tempEl);
//             oneDayDiv.appendChild(windEl);
//             oneDayDiv.appendChild(humidityEl);
//             fiveDayDiv.appendChild(oneDayDiv);
//           }

//           searchResult.appendChild(headerEl);
//           searchResult.appendChild(fiveDayDiv);
//         }
//     recentlySearched();

//     buildCurrentWeatherHTML();

//     buildFiveDayHTML();
//   });
// }
//   apiCall(userInput.value);
  
// }

// // make fetch request from API and sort data






// // listen for click on search button
// searchBtn.addEventListener('click', handleSearchClick);