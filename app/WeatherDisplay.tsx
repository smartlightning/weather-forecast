import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WeatherDisplay = ({ weather }: { weather: any }) => {
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
