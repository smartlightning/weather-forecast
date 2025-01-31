// WeatherForecastDisplay.tsx
import React from 'react'
import { WeatherForecast } from '../types/Weather'
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi'

interface Props {
  forecast: WeatherForecast[]
}

const WeatherForecastDisplay: React.FC<Props> = ({ forecast }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
      {forecast.map((entry, index) => {
        const date = new Date(entry.dt_txt)
        const day = date.toLocaleDateString('en-US', { weekday: 'short' })
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })

        return (
          <div
            key={index}
            className="bg-white/5 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer border border-white/10"
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-sm font-medium text-white/80">
                {index === 0 ? 'Now' : `${day} ${time}`}
              </p>
              <div className="text-4xl transition-transform duration-300 hover:scale-125">
                {(() => {
                  switch (entry.weather[0].main.toLowerCase()) {
                    case 'clear': return <WiDaySunny className="text-yellow-400" />
                    case 'clouds': return <WiCloud className="text-slate-100" />
                    case 'rain': return <WiRain className="text-blue-300" />
                    case 'snow': return <WiSnow className="text-cyan-100" />
                    case 'thunderstorm': return <WiThunderstorm className="text-purple-300" />
                    case 'mist':
                    case 'fog': return <WiFog className="text-gray-300" />
                    default: return <WiDaySunny className="text-yellow-400" />
                  }
                })()}
              </div>
              <p className="text-sm text-white/80 capitalize">
                {entry.weather[0].description}
              </p>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold text-white">
                  {Math.round(entry.main.temp)}°C
                </span>
                <div className="flex justify-center gap-2 text-xs">
                  <span className="text-white/60">
                    ↑{Math.round(entry.main.temp_max)}°
                  </span>
                  <span className="text-white/60">
                    ↓{Math.round(entry.main.temp_min)}°
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeatherForecastDisplay