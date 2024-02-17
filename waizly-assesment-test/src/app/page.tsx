import HomePage from '@/features/home/HomePage';
import { Weather } from '@/types/types';


export async function getWeatherApi() {
  const res = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Palu&units=metric&appid=800fd005579d27a234b5ea3722aeb935'
  );
  const data = await res.json();
  return data
}

export default async function Home() {
  const dataWeather: Weather = await getWeatherApi()
  return <HomePage dataWeather={dataWeather} />;
}
