import React from 'react'
import { WeatherData } from '../WeatherData'

const WeatherDisplay = ({ weather }: { weather: WeatherData | null | undefined }) => {
  if (!weather) return <p>No data available</p>

  return (
    <div>
      <h1>Weather in {weather.name}</h1>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  )
}

export default WeatherDisplay
