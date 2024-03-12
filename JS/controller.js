import { firstWeather } from "./model.js";
import { searchWeather } from "./model.js";
import todayView from "./todayView.js";
import forecastView from "./forecastView.js";


const controlFirstWeather = async function() {
    const data = await firstWeather();
    todayView.renderHTML(data);
    forecastView.renderHTML(data[2]);
}

const controlSearchWeather = function() {
    try{
        const btn = document.querySelector('.search-city');

        btn.addEventListener('click', async function() {
            setOpacity();

            todayView.renderSpinner();
            forecastView.renderSpinner();
            
            const city = document.querySelector('.input-city').value;

            if(city !== ''){
                const searchedData = await searchWeather(city.toLowerCase());
                document.querySelector('.input-city').value = '';
                todayView.renderHTML(searchedData);
                forecastView.renderHTML(searchedData[2]);
                
            }else{
                throw new Error('Enter city!');
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

const setOpacity = function() {
    document.querySelector('.weather--today-data').style.opacity = 0;
    document.querySelector('.weather--today-day').style.opacity = 0;
    document.querySelector('.data-display').style.opacity = 0;
    document.querySelector('.days').style.opacity = 0;
    document.querySelector('.header').style.opacity = 0;
}


setOpacity();
controlFirstWeather();
controlSearchWeather();
console.log('Welcome to the Weather Vibes Application!');