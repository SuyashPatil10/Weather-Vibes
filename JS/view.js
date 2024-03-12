
export class View {
    _parentElement;
    _data;
    _dayArray = [];

    _renderElements(markup) {
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        this._setOpacity();
    }

    _setOpacity() {
        const spinners = document.querySelectorAll('.spinner');
        spinners.forEach(spinner => {
            spinner.style.display = 'none';
        });

        document.querySelector('.weather--today-data').style.opacity = 100;
        document.querySelector('.weather--today-day').style.opacity = 100;
        document.querySelector('.data-display').style.opacity = 100;
        document.querySelector('.days').style.opacity = 100;
    }

    renderSpinner() {
        this._parentElement.insertAdjacentHTML('afterbegin', `
            <div class="spinner">
                <div class="spin"></div>
            </div>
        `);

        const spinners = document.querySelectorAll('.spinner');
        spinners.forEach(spinner => {
            spinner.style.display = 'flex';
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    _getDay() {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const date = new Date();
        const currentDay = date.getDay();
        console.log(days[currentDay]);

        for(let i = 1; i < 7; i++) {
            const dayIndex = (currentDay + i) % 7;
            this._dayArray.push(days[dayIndex]);
            // console.log(days[dayIndex]);
        }

        return this._dayArray;
    }

    _checkWeather(weather) {
        if(weather === 'clear'){
            return 'clear';
        }
        else if(weather === 'clouds'){
            return 'clouds';
        }
        else if(weather === 'drizzle'){
            return 'drizzle';
        }
        else if(weather === 'rain'){
            return 'rain';
        }
        else if(weather === 'snow'){
            return 'snow';
        }
        else if(weather === 'storm'){
            return 'storm';
        }
        else{
            return 'wind';
        }
    }
}