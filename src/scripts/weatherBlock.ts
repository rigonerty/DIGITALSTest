
interface IRes{
current:{ 
  cloud_cover: number;
  interval: number;
  rain: number;
  snowfall: number;
  temperature_2m: number;
  time: string;
};
current_units:{
  cloud_cover: string;
  interval: string;
  rain: string;
  snowfall: string;
  temperature_2m: string;
  time: string;  
} ;
elevation: number;
generationtime_ms: number;
latitude: number;
longitude: number;
timezone: string;
timezone_abbreviation: string ;
utc_offset_seconds: number
}

const cityElement = document.querySelector("#WeatherBlockCity")
const weatherTempElement = document.querySelector("#WeatherBlockWeatherTemp")
const weatherInfoElement = document.querySelector("#WeatherBlockWeatherInfo")

const city = "Краснодар"
let lon = 38.987221;
let lat = 45.039268;



if(cityElement) cityElement.textContent = city

// У меня эта дичь вообще не работает, и я даже не знаю почему. Короче, мы все с Краснодара.
navigator.geolocation.getCurrentPosition(successHandler, errorHandler)


requestToWeather()
setInterval(()=>{requestToWeather()},3600000)


function requestToWeather(){
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,cloud_cover,snowfall,rain`)
  .then(res=>{
    return res.json()
  }).then((res:IRes)=>{
    if(weatherTempElement) weatherTempElement.textContent = `${res.current.temperature_2m} ${res.current_units.temperature_2m}`
    if(weatherInfoElement){
      if(res.current.rain>0) weatherInfoElement.textContent = "Дождь"
      else if(res.current.snowfall>0) weatherInfoElement.textContent = "Снег"
      else if(res.current.cloud_cover>=95) weatherInfoElement.textContent = "Пасмурно"
      else weatherInfoElement.textContent = "Солнечно"
    }
  })
}
function errorHandler(error:GeolocationPositionError){
  console.error(error)
}
function successHandler(position: GeolocationPosition){
  lat = position.coords.latitude;
  lon = position.coords.longitude
  console.log(lat,lon)
}