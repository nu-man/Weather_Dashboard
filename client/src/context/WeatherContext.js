import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

const API_KEY = 'API KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(localStorage.getItem('lastCity') || 'London');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // State for 5-day forecast
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');

  const fetchWeather = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setWeather(data);
      setError('');
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError('City not found. Please try again.');
      console.error(err);
    }
  };

  const fetchForecast = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setForecast(data); // Store forecast data
    } catch (err) {
      console.error('Error fetching forecast data:', err);
    }
  };

  useEffect(() => {
    if (!city) return; // Prevent API call if city is empty
    
    fetchWeather();
    fetchForecast(); // Fetch the 5-day forecast data
  }, [city]);

  return (
    <WeatherContext.Provider value={{ city, setCity, weather, forecast, error, unit, setUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
