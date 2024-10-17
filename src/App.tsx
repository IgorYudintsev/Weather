import React, {useState} from 'react';
import './App.css';
import {Weather} from "./Weather";

function App() {

    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<null | string>(null)
    const [weather, setWeather] = useState<{ temp: number, description: string } | null>(null);



    const fetchWeather = () => {
        // const city='Minsk'
        const apiKey = '1ce2c8f1225f14bf33b893989c1548cf';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found'); // Устанавливаем ошибку, если город не найден
                } else {
                    setWeather({
                            temp: json.main.temp,
                            description: json.weather[0].description
                        }
                    )
                    setError(null); // Сбрасываем ошибку, если запрос успешен
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('An error occurred'); // Общая ошибка на случай других проблем
            });
    }


    return (
        <div className="App">
            <h1>Weather App</h1>
            <div>
                <input type="text" onChange={(e) => setCity(e.currentTarget.value)}/>
                <button onClick={fetchWeather}>Get weather</button>
            </div>

            {weather && <Weather temp={weather.temp} description={weather.description} />}
            {error && <p style={{color: 'red'}}>{error}</p>} {/* Отображаем ошибку */}
        </div>
    );
}

export default App;