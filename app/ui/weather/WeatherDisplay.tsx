// WeatherDisplay.tsx
import { FC } from 'react'
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'
import { WeatherData } from '../types/Weather'

type WeatherDisplayProps = {
  weather: WeatherData | null | undefined
}

type WeatherCondition =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Snow'
  | 'Thunderstorm'
  | 'Mist'
  | 'Fog'

const WeatherDisplay: FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) {
    return (
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 rounded-3xl backdrop-blur-lg shadow-xl animate-pulse">
        <p className="text-2xl font-semibold text-white/80 text-center">
          🌍 Search for a city to begin
        </p>
      </div>
    )
  }

  const condition = (weather.weather?.[0]?.main as WeatherCondition) || 'Clear'
  const temperature = Math.round(weather.main?.temp ?? 0)
  const locationName = weather.name ?? 'Unknown Location'

  return (
    <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 p-8 rounded-3xl backdrop-blur-lg shadow-2xl w-full space-y-6 border border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative hover:rotate-12 transition-transform duration-300">
            {(() => {
              const iconClass = "text-6xl lg:text-7xl transition-all duration-500"
              switch (condition) {
                case 'Clear': return <WiDaySunny className={`${iconClass} text-yellow-400 hover:scale-110`} />
                case 'Clouds': return <WiCloud className={`${iconClass} text-slate-100 animate-bounce`} />
                case 'Rain': return <WiRain className={`${iconClass} text-blue-400 hover:scale-110`} />
                case 'Snow': return <WiSnow className={`${iconClass} text-cyan-100 animate-pulse`} />
                case 'Thunderstorm': return <WiThunderstorm className={`${iconClass} text-purple-400 animate-pulse`} />
                case 'Mist':
                case 'Fog': return <WiFog className={`${iconClass} text-gray-300 animate-pulse`} />
                default: return <WiDaySunny className={`${iconClass} text-yellow-400`} />
              }
            })()}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              {locationName}
            </h2>
            <p className="text-xl lg:text-2xl font-medium text-white/80 capitalize">
              {weather.weather?.[0]?.description || 'Clear sky'}
            </p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-6xl lg:text-7xl font-bold text-white">
            {temperature}°C
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Feels Like', value: `${Math.round(weather.main?.feels_like ?? 0)}°C` },
          { label: 'Humidity', value: `${weather.main?.humidity}%` },
          { label: 'Wind', value: `${Math.round(weather.wind?.speed ?? 0)} m/s` },
          { label: 'Pressure', value: `${weather.main?.pressure}hPa` },
        ].map((stat, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-xl backdrop-blur-sm transition-colors hover:bg-white/10">
            <p className="text-sm text-white/60 mb-1">{stat.label}</p>
            <p className="text-lg font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherDisplay