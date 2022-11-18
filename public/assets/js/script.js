const userInput = document.querySelector('#cityName');
const searchBtn = document.querySelector('#searchBtn');
const recentlySearchedList = document.querySelector('#recently-searched');

// When the search button is clicked save the input into cityName variable
function handleSearchClick() {  
  apiCall(userInput.value)
  // recentlySearched(cityName);
}

// make fetch request from API and sort data
function apiCall(city) {
  const apiKey = '157499d21dd495e0a8fe984869b7e994'
  const apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL)
  .then(function (response) {
    console.log(response);
    if (response.status !== 200) {
      return;
    }

    return response.json();
  })
  .then(function (data) {
    cityName = data.city.name;
  });
}

function recentlySearched(city) {
  const cityBtn = document.createElement('button')
  cityBtn.classList.add('w-full', 'bg-gray-500/80', 'font-semibold', 'py-1', 'rounded');
  cityBtn.setAttribute('id', 'cityBtn')
  cityBtn.textContent = city;

  recentlySearchedList.appendChild(cityBtn);
}

// listen for click on search button
searchBtn.addEventListener('click', handleSearchClick);