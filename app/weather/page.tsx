'use client'
import { useState } from 'react'
import useWeather from '../useWeather'
import WeatherDisplay from './WeatherDisplay'

const Page = () => {
  const [city, setCity] = useState('London')
  const [inputCity, setInputCity] = useState(city) // Local state for input field
  const { weather, loading } = useWeather(city)

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value)
  }

  const updateCity = () => {
    setCity(inputCity) // Trigger weather fetch
  }

  const handleBlur = () => {
    updateCity()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateCity()
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Weather in {inputCity}</h1>
      <div
        className="flex flex-col min-h-52 gap-4 items-center w-full max-w-md"
      >
        <input
          className="w-full p-3 text-black rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          onBlur={handleBlur} // Update city state on blur
          onKeyDown={handleKeyDown} // Update city state on Enter key
          placeholder="Enter city"
        />
        <div className="w-full">
          {loading ? (
            <p className="text-lg font-medium animate-pulse">Loading...</p>
          ) : (
            <WeatherDisplay weather={weather} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page