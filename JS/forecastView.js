import { View } from "./view.js";

class ForecastView extends View {
    _parentElement = document.querySelector('.weather-forcast');

    renderHTML(data) {
        this._data = data;
        const markup = `
            ${this._renderForeCast()}
        `;

        this._renderElements(markup);
    }

    _renderForeCast() {
        const weekDays = this._getWeekDay();
        return `
            <div class="header">
                <h2>7 Days Forecast</h2>
            </div>
            <div class="days">
                <div class="day">
                    <p>Today</p>
                    <div class="day-icons">
                        <img src="images/day-${this._checkWeather(this._data[0].weather[0].main.toLowerCase())}.png" alt="">
                        <p>${this._data[0].weather[0].main}</p>
                    </div>
                    <p>${Math.round(this._data[0].main.temp)}&deg;</p>
                </div>

                <div class="day">
                    <p>${weekDays[0]}</p>
                    <div class="day-icons">
                        <img src="images/day-${this._checkWeather(this._data[1].weather[0].main.toLowerCase())}.png" alt="">
                        <p>${this._data[1].weather[0].main}</p>
                    </div>
                    <p>${Math.round(this._data[1].main.temp)}&deg;</p>
                </div>

                <div class="day">
                    <p>${weekDays[1]}</p>
                    <div class="day-icons">
                        <img src="images/day-${this._checkWeather(this._data[2].weather[0].main.toLowerCase())}.png" alt="">
                        <p>${this._data[2].weather[0].main}</p>
                    </div>
                    <p>${Math.round(this._data[2].main.temp)}&deg;</p>
                </div>

                <div class="day">
                    <p>${weekDays[2]}</p>
                    <div class="day-icons">
                        <img src="images/day-${this._checkWeather(this._data[3].weather[0].main.toLowerCase())}.png" alt="">
                        <p>${this._data[3].weather[0].main}</p>
                    </div>
                    <p>${Math.round(this._data[3].main.temp)}&deg;</p>
                </div>

                <div class="day">
                    <p>${weekDays[3]}</p>
                    <div class="day-icons">
                        <img src="images/day-${this._checkWeather(this._data[4].weather[0].main.toLowerCase())}.png" alt="">
                        <p>${this._data[4].weather[0].main}</p>
                    </div>
                    <p>${Math.round(this._data[4].main.temp)}&deg;</p>
                </div>

                <div class="day">
                    <p>${weekDays[4]}</p>
                    <div class="day-icons">
                        <img src="images/day-${this._checkWeather(this._data[5].weather[0].main.toLowerCase())}.png" alt="">
                        <p>${this._data[5].weather[0].main}</p>
                    </div>
                    <p>${Math.round(this._data[5].main.temp)}&deg;</p>
                </div>

                <div class="day">
                    <p>${weekDays[5]}</p>
                    <div class="day-icons">
                        <img src="images/day-${this._checkWeather(this._data[6].weather[0].main.toLowerCase())}.png" alt="">
                        <p>${this._data[6].weather[0].main}</p>
                    </div>
                    <p>${Math.round(this._data[6].main.temp)}&deg;</p>
                </div>
            </div>
        `;
    }

    _getWeekDay() {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const date = new Date();
        const currentDay = date.getDay();
        
        const weekDays = [];

        for(let i=1;i<7;i++) {
            const day = (currentDay + i) % 7;
            weekDays.push(days[day]);
        }

        return weekDays;
    }
}

export default new ForecastView();