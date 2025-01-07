'use client'
import { useState } from 'react'
import useWeather from '../useWeather'
import WeatherDisplay from '../WeatherDisplay'


const Page = () => {
  const [city, setCity] = useState('London')
  const { weather, loading } = useWeather(city)

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
      />
      {loading ? <p>Loading...</p> : <WeatherDisplay weather={weather} />}
    </div>
  )
}

export default Page