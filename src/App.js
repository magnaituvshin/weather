import React, { useState } from 'react';
import { useGetWeatherQuery } from './services/openWeatherApi';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useGetWeatherQuery(searchCity, {
    skip: !searchCity,
  });

  const handleSearch = () => {
    setSearchCity(city);
  };
  
  return (
    <div className="container">
        <div className='searchBut'>
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city name" 
            />
            <button onClick={handleSearch}>
                <div className='gg-search'></div>
            </button>
        </div>
        {weatherLoading && <p>Loading...</p>}
        {weatherError && (
            <p style={{ color: 'red' }}>No result found for "{searchCity}". Please enter a valid city name.</p>
        )}
        {weatherData && weatherData.weather && weatherData.weather[0] && (
            <div className='result'>
                <div className='grid1'>
                    <div className='center'>
                        <h2 className="title">{weatherData.name}</h2>
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                    </div>
                    <div className='smaller-grid'>
                        <div className='small'>
                            <p className='text'>{((weatherData.main.temp - 32) * 5 / 9).toFixed(2)}°C</p>
                            <p className='text'>{weatherData.weather[0].description}</p>
                        </div>
                        <div className='small'>
                            <p className='text'>Feels Like: {((weatherData.main.feels_like-32)*5/9).toFixed(2)}°C</p>
                            <p className='text'>Max Temp: {((weatherData.main.temp_max-32)*5/9).toFixed(2)}°C</p>
                        </div>
                    </div>
                </div>
                <div className='grid2'>
                    <p className='text'>Humidity: {weatherData.main.humidity}%</p>
                    <p className='text'>Pressure: {weatherData.main.pressure}kPa</p>
                    <p className='wind'>Wind Speed: {weatherData.wind.speed}m/s</p>
                </div>
            </div>
        )}
    </div>
  );
};

export default App;
