import React from 'react'
import Image from 'next/image'
import { WeatherForecast } from '../types/Weather'

interface Props {
  forecast: WeatherForecast[]
}

const WeatherForecastDisplay: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
      {forecast.map((entry, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-white bg-opacity-10 p-4 rounded-lg shadow-md"
        >
          <p className="text-sm">{new Date(entry.dt_txt).toLocaleDateString()}</p>
          <Image
            src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
            alt={entry.weather[0].description}
            className="h-12 w-12"
            width={48}
            height={48}
          />
          <p className="text-sm">{entry.weather[0].description}</p>
          <p className="text-lg font-bold">{Math.round(entry.main.temp)}°C</p>
        </div>
      ))}
    </div>
  )
}

export default WeatherForecastDisplay