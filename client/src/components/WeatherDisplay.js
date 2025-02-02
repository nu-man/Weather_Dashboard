import { useWeather } from "../context/WeatherContext";

const WeatherDisplay = () => {
  const { weather, forecast, unit, setUnit } = useWeather();

  if (!weather) return null; // If weather data is not available

  // Define units for temperature and wind
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  // Extract icon code from weather data
  const iconCode = weather.weather[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : ""; // Icon URL

  const temperature =
    unit === "metric" ? weather.main.temp : (weather.main.temp * 9) / 5 + 32; // Convert to farenheit

  // Wind speed conversion (from m/s to mph if unit is 'imperial')
  const windSpeed =
    unit === "metric"
      ? weather.wind.speed
      : (weather.wind.speed * 2.23694).toFixed(2); // Convert m/s to mph and round to two decimal places

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="weather-title">{weather.name}</h2>
        <button
          className="unit-toggle"
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        >
          Switch to {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>
      <div className="weather-info">
        {/* Conditionally render the weather icon */}
        {iconUrl ? (
          <img
            className="weather-icon"
            src={iconUrl}
            alt={weather.weather[0]?.description || "Weather Icon"}
          />
        ) : (
          <img
            className="weather-icon"
            src="https://via.placeholder.com/100" // Fallback image
            alt="No icon available"
          />
        )}
        <p className="weather-temp">
          {Math.round(temperature)} {tempUnit}{" "}
          {/* Display temperature with unit */}
        </p>
        <p className="weather-detail">
          Date: {new Date(weather.dt * 1000).toLocaleDateString()}{" "}
          {/*timestamp */}
        </p>
        <p className="weather-detail">Humidity: {weather.main.humidity}%</p>
        <p className="weather-detail">
          Wind: {windSpeed} {windUnit}
        </p>{" "}
        {/* Display wind speed with unit */}
        <p className="weather-detail">{weather.weather[0]?.description}</p>
      </div>

      {/* Display 5-Day Forecast */}

      {forecast && (
        <div className="forecast">
          <center>
            {" "}
            <h3 style={{ margin: "30px", alignItems: "center" }}>
              5-Day Forecast
            </h3>
          </center>
          <div className="forecast-list">
            {forecast.list.slice(0, 5).map((item, index) => (
              <div className="forecast-item" key={index}>
                <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                />
                <p>
                  {Math.round(
                    unit === "metric"
                      ? item.main.temp
                      : (item.main.temp * 9) / 5 + 32
                  )}{" "}
                  {tempUnit}
                </p>
                <p>{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
