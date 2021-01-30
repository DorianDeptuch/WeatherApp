const innerDiv = document.querySelector('#innerDiv');
const search = document.querySelector('#search');
const searchBTN = document.querySelector('#searchBTN');
const mainInfo = document.querySelector('#mainInfo');
const today = document.querySelector('#today');
const date = document.querySelector('#date');
const city = document.querySelector('#city');
const currentTemp = document.querySelector('#currentTemp');
const lowTemp = document.querySelector('#lowTemp');
const highTemp = document.querySelector('#highTemp');
const wind = document.querySelector('#wind');
const description = document.querySelector('#description');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const feelsLike = document.querySelector('#feelsLike');
const humidity = document.querySelector('#humidity');
const visibility = document.querySelector('#visibility');
const cloudiness = document.querySelector('#cloudiness');
const pressure = document.querySelector('#pressure');
const currentTime = document.querySelector('#currentTime');
const weatherImg = document.querySelector('#weatherImg');
const celcFahr  = document.querySelector('#celcFahr');
let imperial = true;

let getWeatherData = async function(city) {
  try {
    if (imperial){
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1862f7bf1981e2ef8ab89f1ede57b6b1`);
      let data =  await response.json()
      await updateDOM(data);
      return data;
    } else {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1862f7bf1981e2ef8ab89f1ede57b6b1`);
      let data =  await response.json()
      await updateDOM(data);
      return data;
    }
  }
  catch(err) {
    console.log(err);
      alert(`"${city}" was not found. Check for misspellings or search a different city.`);
  }
}


function submitSearch(){
  let val = search.value;
  if (val !== ''){
    if (val.includes(' ')){
      search.classList.remove('empty');
      val.replace(' ', '%20');
      getWeatherData(val);
      search.value = '';
    } else {
      search.classList.remove('empty');
      getWeatherData(val);
      search.value = '';
    }
  } else {
    search.classList.add('empty');
  }
}


async function updateDOM(input){

  let dateObject = new Date();
  let now = Date.now();

  date.textContent = `${dateObject.toLocaleString('default', { month: 'long' })} ${dateObject.getDate()}`;
  city.textContent = `${input.name}`;
  currentTemp.textContent = `${(input.main.temp).toFixed(1)}`;
  lowTemp.textContent = `${(input.main.temp_min).toFixed(1)}`;
  highTemp.textContent = `${(input.main.temp_max).toFixed(1)}`;
  wind.innerHTML = `Wind: ${(input.wind.speed).toFixed(1)}mph ${windDirection(input.wind.deg)}<div class="arrow" style="transform: rotate(${input.wind.deg+45}deg)">&nbsp;&#8598;</div>`
  description.textContent = `${input.weather[0].description}`
  sunrise.textContent = `${convertMS(input.sys.sunrise)}`;
  sunset.textContent = `${convertMS(input.sys.sunset)}`;
  feelsLike.textContent = `${(input.main.feels_like).toFixed(1)}`;
  humidity.textContent = `${input.main.humidity}%`;
  visibility.textContent = `${visibilityFunc(input.visibility)}Km`;
  cloudiness.textContent = `${input.weather[0].main}`;
  pressure.textContent = `${input.main.pressure}mm/Hg`;
  celcFahr.disabled = false;
  // currentTime.textContent = `Local Time: ${msToTime((now - input.timezone))}`
  console.log(input);

  backgroundImage();
  mainImage();
}

function mainImage(){
  if (description.textContent.match(/light snow/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1524690785235-c58c8de27e2b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjN8fHNub3dpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/snow/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1542601098-8fc114e148e2';
  } else if (description.textContent.match(/heavy snow/i)){
      weatherImg.src = 'https://images.unsplash.com/photo-1444384851176-6e23071c6127?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjJ8fGhlYXZ5JTIwcmFpbnxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/few clouds/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1517758478390-c89333af4642';
  } else if (description.textContent.match(/scattered clouds/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1592210454359-9043f067919b';
  } else if (description.textContent.match(/broken clouds/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1469365556835-3da3db4c253b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjl8fGNsb3Vkc3xlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/overcast clouds/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTV8fG92ZXJjYXN0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/mist/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1524252500348-1bb07b83f3be?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fGZvZ3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/light rain/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1486016006115-74a41448aea2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTl8fGxpZ2h0JTIwcmFpbnxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/heavy rain/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1591430706809-a4936334a714?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8aGVhdnklMjByYWlufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/clear sky/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1518717202715-9fa9d099f58a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGJsdWUlMjBza3l8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/light wind/i)){
    weatherImg.src = 'https://images.unsplash.com/12/barley.jpg?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzN8fHdpbmR8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60';
  } else if (description.textContent.match(/heavy wind/i)){
    weatherImg.src = 'https://images.unsplash.com/photo-1470176519524-3c2f481c8c9c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8d2luZHl8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60';
  }
}

function backgroundImage(){
  if (description.textContent.match(/snow/i)){
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1547754980-3df97fed72a8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzR8fHNub3d8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")';
  } else if (description.textContent.match(/clouds/i)){
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1527708676371-14f9a9503c95?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdWR5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")';
  } else if (description.textContent.match(/rain/i)){
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8cmFpbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")';
  } else if (description.textContent.match(/clear/i)){
    document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1504386106331-3e4e71712b38?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")';
  }
}

let visibilityFunc = function(number){
  let kilometers = number / 1000;
  let miles = kilometers * 1.609;

  return kilometers;
}

let windDirection = function(deg) {
  
    if (deg >= 346 || deg <= 15){ 
      return 'N';
    } else if (deg >= 16 && deg <= 35){ 
        return 'NNE';
    } else if (deg >= 36 && deg <= 55){ 
        return 'NE';
    } else if (deg >= 56 && deg <= 75){ 
        return 'ENE';
    } else if (deg >= 76 && deg <= 105){ 
        return 'E';
    } else if (deg >= 106 && deg <= 125){ 
        return 'ESE';
    } else if (deg >= 126 && deg <= 145){ 
        return 'SE';
    } else if (deg >= 146 && deg <= 165){ 
        return 'SSE';
    } else if (deg >= 166 && deg <= 195){ 
        return 'S';
    } else if (deg >= 196 && deg <= 215){ 
        return 'SSW';
    } else if (deg >= 216 && deg <= 235){ 
        return 'SW';
    } else if (deg >= 236 && deg <= 255){ 
        return 'WSW';
    } else if (deg >= 256 && deg <= 285){ 
        return 'W';
    } else if (deg >= 286 && deg <= 305){ 
        return 'WNW';
    } else if (deg >= 306 && deg <= 325){ 
        return 'NW';
    } else if (deg >= 326 && deg <= 345){ 
        return 'NNW';
  }
}

function convertMS(unixTime) {
  const dateObject = new Date((unixTime * 1000));
  return dateObject.toLocaleString('en-US', {timeZoneName: "short"}).slice(11); //.slice(11, -4) for removing PST
}

let convertTime = function(data){
  let dateObject = new Date();
  let seconds = dateObject.getSeconds();
  let minutes = dateObject.getMinutes();
  let hours = dateObject.getHours();
  let ampm;

  if (seconds < 10){
    seconds = '0'+ seconds.toString();
  }

  if (minutes < 10){
    minutes = '0'+ minutes.toString();
  }

  if (hours === 0){
    hours = 12;
    ampm = 'AM';
  }
  if (hours >= 13){
    hours = hours - 12;
    ampm = 'PM';
  } else {
    hours = hours;
    ampm = 'AM';
  }

  currentTime.textContent = `Local time: ${hours}:${minutes}:${seconds}${ampm}`;

}

function conversion(){
  if (imperial){
    currentTemp.textContent = ((parseInt(currentTemp.textContent) - 32) * (5/9)).toFixed(1);
    lowTemp.textContent = ((parseInt(lowTemp.textContent) - 32) * (5/9)).toFixed(1);
    highTemp.textContent = ((parseInt(highTemp.textContent) - 32) * (5/9)).toFixed(1);
    feelsLike.textContent = ((parseInt(feelsLike.textContent) - 32) * (5/9)).toFixed(1);
    celcFahr.textContent = 'Viewing in Celcius';
    imperial = false;
  } else {
    currentTemp.textContent = ((parseInt(currentTemp.textContent) * (9/5)) + 32).toFixed(1);
    lowTemp.textContent = ((parseInt(lowTemp.textContent) * (9/5)) + 32).toFixed(1);
    highTemp.textContent = ((parseInt(highTemp.textContent) * (9/5)) + 32).toFixed(1);
    feelsLike.textContent = ((parseInt(feelsLike.textContent) * (9/5)) + 32).toFixed(1);
    celcFahr.textContent = 'Viewing in Fahrenheit';
    imperial = true;
  }
}

search.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') submitSearch();
});
searchBTN.onclick = submitSearch;
searchBTN.ontouch = submitSearch;
celcFahr.onclick = conversion;
setInterval(convertTime,1000);

/* TO DO

add carousel (optional)
get local time to work correctly (use UTC and convertTime() take a parameter of timezone from object.json),
then cancel the setinterval and run a new setinterval of convertTime(-timezone);

for convertMS, possibly take a second parameter as the timezone, then subtract the timezone from unix time???
error handling for wrong city names
add more images for different types of weather
*/