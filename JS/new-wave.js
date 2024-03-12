'strict mode';

const weather_data = async function() {
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=kolhapur&units=metric&appid=b35f25b2e27e2a363dc9ff84831a0e5f`);
    const data = await weatherData.json();

    console.log(data);
}

let city = 'kolhapur';
let api = 'b35f25b2e27e2a363dc9ff84831a0e5f';
const weather_forecast = async function() {
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&appid=${api}`);
    const data = await forecast.json();

    console.log(data);
}

// https://api.openweathermap.org/data/2.5/onecall?lat=-41.211128&lon=174.908081&exclude=daily,minutely,current,alerts&units=metric&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily,alerts&appid=${apiKey}`;


const weather_forecast_hour = async function() {
    const forecast = await fetch(`
    https://api.weatherapi.com/v1/forecast.json?key=1317c7dff8204592949170217240603&q=${city}&days=1&aqi=no&alerts=no`);
    const data = await forecast.json();

    console.log(data);
}


// weather_data();
// weather_forecast();
// weather_forecast_hour();

console.log(`Weather Data is Coming! Please wait....`);

let unix_timestamp = 1709817091;
const date = new Date(unix_timestamp * 1000);
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

console.log(`Sunrise At :${hours} : ${minutes} : ${seconds}`);