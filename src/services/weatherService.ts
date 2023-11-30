import axios from 'axios';

const getWeatherData = async (city: string) => {
  try {
	const response = await axios.get(
	  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
	);

	if (response.data.cod !== 200) {
	  return { error: response.data.message, data: null };
	}

	return {
	  error: null,
	  data: {
		city: response.data.name,
		temperature: response.data.main.temp,
		temperatureMax: response.data.main.temp_max,
		temperatureMin: response.data.main.temp_min,
		windSpeed: response.data.wind.speed,
		humidity: response.data.main.humidity,
		description: response.data.weather[0].description,
		iconCode: response.data.weather[0].icon,
	  },
	};
  } catch (error) {
	return { error: 'Unrecognized city', data: null };
  }
};

export default getWeatherData;