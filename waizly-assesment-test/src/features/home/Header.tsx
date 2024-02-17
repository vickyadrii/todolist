/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { Weather } from '@/types/types';

interface HeaderProps {
  dataWeather: Weather;
}

const Header = ({ dataWeather }: HeaderProps) => {
  const icon = dataWeather?.weather?.[0]?.icon;
  const weatherDesc = dataWeather?.weather?.[0]?.description;
  
  return (
    <div className="flex justify-between items-center border-b p-5">
      <h1 className="text-2xl font-medium">To-Do List</h1>
      <div className="flex flex-col-reverse">
        <h2 className="font-semibold text-lg">Weather in {dataWeather.name}</h2>
        <h1 className="text-4xl font-semibold">{dataWeather?.main?.temp}°C</h1>
        <div>
          <div className="flex items-center gap-2">
            <Image src={`https://openweathermap.org/img/wn/${icon}.png`} alt="icon" width={48} height={48} />
            <p className="font-medium text-gray-700">{weatherDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
