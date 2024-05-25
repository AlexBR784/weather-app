const getWeatherData = (weatherData) => {
  const date = new Date(weatherData.location.localtime);

  const dayOfWeek = date.getDay();
  var daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const dayName = daysOfWeek[dayOfWeek];

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {
    name: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
    temp: weatherData.current.temp_c,
    windKm: weatherData.current.wind_kph,
    windDir: weatherData.current.wind_dir,
    humidity: weatherData.current.humidity,
    state: weatherData.current.condition.text, //Conditions.json
    day: dayName,
    hour: hours + ":" + (minutes < 10 ? "0" : "") + minutes,
    icon: weatherData.current.condition.icon,
  };
};

export default getWeatherData;
