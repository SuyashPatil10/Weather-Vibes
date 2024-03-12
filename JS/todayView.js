import { View } from "./view.js";

class TodayView extends View {
    _parentElement = document.querySelector('.weather-today');
    // #data;

    renderHTML(data) {
        this._data = data;

        const markup = `
            ${this._renderHead()}

            ${this._renderMiddle()}

            ${this._renderBottom()}
        `;

        this._renderElements(markup);
    }


    _renderHead() {
        return `
        <div class="weather--today-data">
        <div class="text-data">
            <div class="city">
                <h1>${this._data[0].name} &nbsp;&nbsp;<span>${this._getWeekDay()}</span></h1>
            </div>
            <div class="temp">
                <h1>${+this._data[0].main.temp.toFixed(1)}&deg;C <span> &nbsp;&nbsp;${this._data[0].weather[0].main}</span></h1>
            </div>
        </div>
        <div class="image-data">
            <img src="images/${this._getTime(this._data[3])}-${this._checkWeather(this._data[0].weather[0].main.toLowerCase())}.png" alt="">
        </div>
        <div class="min-max-temp">
            <h4>min temp :&nbsp;&nbsp; ${+this._data[0].main.temp_min.toFixed(1)}&deg;C</h4>
            <h4>max temp :&nbsp;&nbsp; ${+this._data[0].main.temp_max.toFixed(1)}&deg;C</h4>
        </div>

    </div>
        `;
    }

    _renderMiddle() {
        const hoursData = this._getHourData(this._data[1]);
        return `
            <div class="weather--today-day">
                <div class="day-time">
                    <p>6:00 AM</p>
                    <img src="images/day-${this._checkWeather(hoursData[0].condition.text.toLowerCase().trim())}.png" alt="">
                    <p>${hoursData[0].temp_c}&deg;C</p>
                </div>
                <div class="day-time">
                    <p>9:00 AM</p>
                    <img src="images/day-${this._checkWeather(hoursData[1].condition.text.toLowerCase().trim())}.png" alt="">
                    <p>${hoursData[1].temp_c}&deg;C</p>
                </div>
                <div class="day-time">
                    <p>12:00 PM</p>
                    <img src="images/day-${this._checkWeather(hoursData[2].condition.text.toLowerCase().trim())}.png" alt="">
                    <p>${hoursData[2].temp_c}&deg;C</p>
                </div>
                <div class="day-time">
                    <p>3:00 PM</p>
                    <img src="images/day-${this._checkWeather(hoursData[3].condition.text.toLowerCase().trim())}.png" alt="">
                    <p>${hoursData[3].temp_c}&deg;C</p>
                </div>
                <div class="day-time">
                    <p>6:00 PM</p>
                    <img src="images/night-${this._checkWeather(hoursData[4].condition.text.toLowerCase().trim())}.png" alt="">
                    <p>${hoursData[4].temp_c}&deg;C</p>
                </div>
                <div class="day-time">
                    <p>9:00 PM</p>
                    <img src="images/night-${this._checkWeather(hoursData[5].condition.text.toLowerCase().trim())}.png" alt="">
                    <p>${hoursData[5].temp_c}&deg;C</p>
                </div>
            </div>
        `;
    }

    _renderBottom() {
        return `
            <div class="data-display">
                <div class="condition">
                    <div class="air-conditions">
                        <div class="head">
                            <img src="images/temperature.png" alt="">
                            <p>&nbsp;&nbsp;Real Feel</p>
                        </div>
                        <h3>${+this._data[0].main.feels_like.toFixed(1)}&deg;C</h3>
                    </div>

                    <div class="air-conditions">
                        <div class="head">
                            <img src="images/humidity.png" alt="">
                            <p>&nbsp;&nbsp;Humidity</p>
                        </div>
                        <h3>${this._data[0].main.humidity}</h3>
                    </div>
                </div>
                <div class="condition">
                    <div class="air-conditions">
                        <div class="head">
                            <img src="images/sunrise.png" alt="">
                            <p>&nbsp;&nbsp;Sunrise</p>
                        </div>
                        <h3>${this._getSunStatus(this._data[0].sys.sunrise)} AM</h3>
                    </div>

                    <div class="air-conditions">
                        <div class="head">
                            <img src="images/sunset-.png" alt="">
                            <p>&nbsp;&nbsp;Sunset</p>
                        </div>
                        <h3>${this._getSunStatus(this._data[0].sys.sunset)} PM</h3>
                    </div>
                </div>
                <div class="condition">
                    <div class="air-conditions">
                        <div class="head">
                            <img src="images/wind.png" alt="">
                            <p>&nbsp;&nbsp;Wind</p>
                        </div>
                        <h3>${this._data[0].wind.speed} km/h</h3>
                    </div>
                </div>
            </div>
        `;
    }

    _getSunStatus(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours}:${minutes}`;
    }

    _getTime(date) {
        const currentDate = new Date(date);
        const hours = +currentDate.getHours();
        if((hours >=6 && hours < 19)) return 'day';
        else return 'night';
    }

    _getWeekDay() {
        const weeksDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const date = new Date();
        const weekDayIndex = date.getDay();
        return weeksDays[weekDayIndex];
    }

    _getHourData(hourlydata) {
        const hoursArray = [];
        hourlydata.forEach(hourData => {
            const currentDate = new Date(hourData.time);
            const hours = +currentDate.getHours();
            if(hours === 6 || hours === 9 || hours === 12 || hours === 15 || hours === 18 || hours === 21){
                hoursArray.push(hourData);
            }
        });

        return hoursArray;
    }
}

export default new TodayView();