import axios from "axios";
import { useState } from "react";
import getWeatherData from "../utils/getWeatherData";

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    setLoading(true);
    setError(null);
    try {
      setWeather(null);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_TOKEN}&q=${location}&days=1&aqi=yes&alerts=yes&lang=es`
      );
      setWeather(getWeatherData(response.data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
};

export default useWeather;
