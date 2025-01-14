import { FC, JSX } from 'react'
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'
import { WeatherData } from '../types/Weather'


type WeatherDisplayProps = {
  weather: WeatherData | null | undefined
}

const getWeatherIcon = (condition: string): JSX.Element => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <WiDaySunny className="text-yellow-400 text-6xl" />
    case 'clouds':
      return <WiCloud className="text-gray-300 text-6xl" />
    case 'rain':
      return <WiRain className="text-blue-500 text-6xl" />
    case 'snow':
      return <WiSnow className="text-white text-6xl" />
    case 'thunderstorm':
      return <WiThunderstorm className="text-purple-500 text-6xl" />
    case 'mist':
    case 'fog':
      return <WiFog className="text-gray-500 text-6xl" />
    default:
      return <WiDaySunny className="text-yellow-400 text-6xl" />
  }
}
const roundTemperatureValue = (value: number): number => {
  return Math.round(value)
}

const WeatherDisplay: FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) {
    return <p className="text-lg font-medium">Enter a city to see the weather!</p>
  }

  const { main, weather: weatherDetails, name } = weather
  const condition = weatherDetails[0]?.main || 'Clear'

  return (
    <div className="flex flex-col items-center bg-white bg-opacity-10 p-6 rounded-lg shadow-md">
      {getWeatherIcon(condition)}
      <h2 className="text-2xl font-bold mt-4">{name}</h2>
      <p className="text-lg">{condition}</p>
      <p className="text-lg font-semibold">{roundTemperatureValue(main.temp)}°C</p>
    </div>
  )
}

export default WeatherDisplay