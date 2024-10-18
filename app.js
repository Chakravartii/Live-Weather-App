const api_key='e0fda9fb3bb2ecda8ac8457110cc5d60';
const userTab=document.querySelector('[userWeather]');
const searchTab=document.querySelector('[searchWeather]');
const weather_container=document.querySelector('.weather-container');
const grantLocation=document.querySelector('.grantLocation');
const form_container=document.querySelector('.form-container');
const loading=document.querySelector('[loading]');
const weatherInfo=document.querySelector('.weather-info-container');


let currentTab=userTab;
currentTab.classList.add('current-tab')

userTab.addEventListener('click',()=>{switchTab(userTab)});
searchTab.addEventListener('click',()=>{switchTab(searchTab)});

//function 
function switchTab(click_tab){
    if(click_tab!=currentTab){
        currentTab.classList.remove('current-tab');
        currentTab=click_tab;
        currentTab.classList.add('current-tab');
    }
    if(!form_container.classList.contains('active')){
        console.log('true');
    }else{
        console.log('false');
    }
    // console.log(currentTab);
    // console.log('Switch method');
}

//location fetch
const grantAccess=document.querySelector('[grantAccess]');
grantAccess.addEventListener('click',fetchLocation);
let Position;
function fetchLocation(){
    try{
        navigator.geolocation.getCurrentPosition(storePos,ErrorHandel);
    }catch(err){
        alert('Some Technical Issue ');
    }
}
function storePos(pos){
    Position={
        latitude:pos.coords.latitude,
        longitude:pos.coords.longitude
    }
    // weatherUpdate();
    weatherData(Position);
}
function ErrorHandel(err){
    console.log("Error....!");
}

// update Weather
function weatherUpdate(response){
    document.querySelector('[cityName]').textContent = response.name;
    const country = response.sys.country.toLowerCase();
    document.querySelector('[countryIcon]').src=`https://flagcdn.com/144x108/${country}.png`;
    document.querySelector('[weatherDescription]').textContent = response.weather[0].description;
    const weatherIcon=response.weather[0].icon;
    document.querySelector('[weatherIcon]').src = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    document.querySelector('[tempData]').textContent = (parseFloat(response.main.temp) - 273.15).toFixed(2)+"°C";
    document.querySelector('[windData]').textContent = response.wind.speed+"m/s";
    document.querySelector('[humidityData]').textContent = response.main.humidity+"%";
    document.querySelector('[cloudData]').textContent = response.clouds.all+"%";
    console.log("Weather Updated SuccessFully");
// console.log(`https://flagcdn.com/144x108/${country}.png`);
// console.log(`http://openweathermap.org/img/w/${weatherIcon}.png`);
// console.log(`City: ${cityName}`);
// console.log(`Country: ${country}`);
// console.log(`Weather Description: ${weatherDescription}`);
// console.log(`Weather Icon Code: ${weatherIcon}`);
// console.log(`Temperature: ${temperature}°C`);
// console.log(`Wind Speed: ${windSpeed} m/s`);
// console.log(`Humidity: ${humidity}%`);
// console.log(`Cloud Coverage: ${clouds}%`);
}

//api call
async function weatherData(Position){
    const lat=Position.latitude;
    const lon=Position.longitude;
    const data= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`);
    let response = await data.json();
    weatherUpdate(response);
    // console.log("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key);
    // console.log('Data Fetched SuccessFully',response);
}

//weather data city
async function WeatherDataCity(city) {
    try{
    let data= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
    if (!data.ok) {
        throw new Error('City not found');
    }
    const response=await data.json();
    weatherUpdate(response);
    console.log(`${city} found and update successfully`);
    }catch(err){
        console.log("city Not Find"+err);
    }
}


function search(){
    const input=document.getElementById('city-input').value;
    // console.log(input);
    if(input.length>0)
    WeatherDataCity(input);
}





// const api_key='e0fda9fb3bb2ecda8ac8457110cc5d60';
// async function weatherData(){
//     let city='kanpur';
//     let data= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
//     let obj= await data.json();
//     console.log('api fetched successfully',obj);
//     //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// }
// weatherData();