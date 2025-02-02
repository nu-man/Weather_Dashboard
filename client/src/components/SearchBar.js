import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';

const SearchBar = () => {
  const { setCity } = useWeather();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert("Please enter a city name");
      return;
    }
    setCity(input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        className="search-input"
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};
export default SearchBar;