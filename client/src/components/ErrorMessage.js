import { useWeather } from '../context/WeatherContext';

const ErrorMessage = () => {
  const { error } = useWeather();
  return error ? <div className="error-message">{error}</div> : null;
};

export default ErrorMessage;