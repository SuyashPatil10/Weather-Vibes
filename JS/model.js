const APIKEY = `b35f25b2e27e2a363dc9ff84831a0e5f`;
const APIKEY2 = `1317c7dff8204592949170217240603`;
const APIKEY3 = `WYCC5UWBB401`;


export const firstWeather = async function () {
    try{
        const position = await getCurrentPosition();

        const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${APIKEY}`);
        if(!currentWeather.ok) throw new Error('Something went wrong! Please try later');
        const currentWeatherData = await currentWeather.json();

        const [hourlyForecast, dailyForecast, timeAPI] = await Promise.all([
            getJSON(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY2}&q=${currentWeatherData.name.toLowerCase()}&days=1&aqi=no&alerts=no`),
            getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${currentWeatherData.name.toLowerCase()}&units=metric&cnt=7&appid=${APIKEY}`),
            getJSON(`http://api.timezonedb.com/v2.1/get-time-zone?key=${APIKEY3}&format=json&by=position&lat=${currentWeatherData.coord.lat}&lng=${currentWeatherData.coord.lon}`)
        ]);
        
        return [currentWeatherData, hourlyForecast.forecast.forecastday[0].hour, dailyForecast.list, timeAPI.formatted];
    }
    catch(err) {
        throw err;
    }
}

const getJSON = async function(url) {
    return fetch(url).then(response => {
        if(!response.ok) throw new Error('Enter valid city name');

        return response.json();
    });
}

export const searchWeather = async function (city) {
    try{
        const [currentSearch, hourlySearch, dailySearch] = await Promise.all([
            getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`),
            getJSON(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY2}&q=${city}&days=1&aqi=no&alerts=no`),
            getJSON(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&appid=${APIKEY}`)
        ]);

        const searchTimeAPI = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=WYCC5UWBB401&format=json&by=position&lat=${currentSearch.coord.lat}&lng=${currentSearch.coord.lon}`);
        if(!searchTimeAPI.ok) throw new Error('Something went wrong. Please try again!');
        const timeData = await searchTimeAPI.json();

        return [currentSearch, hourlySearch.forecast.forecastday[0].hour, dailySearch.list, timeData.formatted];
    }
    catch(err){
        throw err;
    }
}

const getCurrentPosition = function() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}


// For Recovery
// const timeAPI = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=WYCC5UWBB401&format=json&by=position&lat=${currentWeatherData.coord.lat}&lng=${currentWeatherData.coord.lon}`);
        // if(!timeAPI.ok) throw new Error('Something went wrong! Please try later');
        // const currentTime = await timeAPI.json();

        // const hourlyForecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY2}&q=${currentWeatherData.name.toLowerCase()}&days=1&aqi=no&alerts=no`);
        // if(!hourlyForecast.ok) throw new Error('Something went wrong! Please try later');
        // const hourlyForecastData = await hourlyForecast.json();


        // const dailyForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentWeatherData.name.toLowerCase()}&units=metric&cnt=7&appid=${APIKEY}`);
        // if(!dailyForecast.ok) throw new Error('Something went wrong! Please try later');
        // const dailyForecastData = await dailyForecast.json();