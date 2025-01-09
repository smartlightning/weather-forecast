'use client'

import { useState } from 'react'
import WeatherDisplay from './WeatherDisplay'
import useWeather from '../hooks/useWeather'
import useCitySuggestions from '../hooks/useCitySuggestions'

const Page = () => {
  const [city, setCity] = useState('')
  const [inputCity, setInputCity] = useState(city)
  const [showDropdown, setShowDropdown] = useState(false)
  const { weather, loading: weatherLoading } = useWeather(city)
  const { suggestions, loading: suggestionsLoading } = useCitySuggestions(inputCity)

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value)
    setShowDropdown(true)
  }

  const updateCity = (newCity: string) => {
    setCity(newCity)
    setInputCity(newCity)
    setShowDropdown(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateCity(inputCity)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Weather in {city}</h1>
      <div className="relative flex flex-col items-center w-full max-w-md">
        {/* Input Field */}
        <input
          className="w-full p-3 text-black rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter city"
        />

        {/* Dropdown Suggestions */}
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute top-14 w-full bg-white rounded-lg shadow-lg text-black z-10">
            {suggestionsLoading ? (
              <li className="p-2 text-center text-gray-500">Loading...</li>
            ) : (
              suggestions.map((suggestion) => (
                <li
                  key={suggestion.id} // TypeScript now knows `id` exists
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => updateCity(suggestion.name)}
                >
                  {suggestion.name}, {suggestion.sys?.country}
                </li>
              ))
            )}
          </ul>
        )}

        {/* Weather Display */}
        <div className="w-full mt-6 text-center">
          {weatherLoading ? (
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