'use client'

import { useState, useCallback } from 'react'
import WeatherDisplay from './ui/weather/WeatherDisplay'
import useWeather from './ui/hooks/useWeather'
import useCitySuggestions from './ui/hooks/useCitySuggestions'

const Page: React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [inputCity, setInputCity] = useState<string>(city)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const { weather, loading: weatherLoading } = useWeather(city)
  const { suggestions, loading: suggestionsLoading } = useCitySuggestions(inputCity)

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setInputCity(e.target.value)
      setShowDropdown(true)
      setHighlightedIndex(-1)
    },
    []
  )

  const updateCity = useCallback(
    (newCity: string): void => {
      if (city !== newCity) {
        setCity(newCity)
      }
      setInputCity(newCity)
      setShowDropdown(false)
      setHighlightedIndex(-1)
    },
    [city]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          updateCity(suggestions[highlightedIndex].name)
        } else {
          updateCity(inputCity)
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightedIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        )
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setShowDropdown(false)
      }
    },
    [highlightedIndex, suggestions, inputCity, updateCity]
  )

  const handleSuggestionClick = useCallback(
    (index: number): void => {
      updateCity(suggestions[index].name)
    },
    [updateCity, suggestions]
  )

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <h1 className="text-4xl font-bold mb-6">Weather in {city || '...'}</h1>
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
              suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${
                    highlightedIndex === index ? 'bg-gray-300' : ''
                  }`}
                  onClick={() => handleSuggestionClick(index)}
                >
                  {suggestion.name}, {suggestion.sys?.country}
                </li>
              ))
            )}
          </ul>
        )}

        {/* Conditional Rendering for Weather */}
        <div className="w-full mt-6">
          {weatherLoading ? (
             // Skeleton loader for weather display
             <div className="flex flex-col items-center bg-white bg-opacity-10 p-6 rounded-lg shadow-md animate-pulse">
             <div className="h-16 w-16 bg-gray-300 rounded-full"></div> {/* Weather Icon Skeleton */}
             <h2 className="h-6 w-2/3 bg-gray-300 rounded mt-4"></h2> {/* City Name Skeleton */}
             <p className="h-6 w-1/2 bg-gray-300 rounded"></p> {/* Condition Skeleton */}
             <p className="h-8 w-1/3 bg-gray-300 rounded font-semibold"></p> {/* Temperature Skeleton */}
           </div>
          ) : (
            // Show weather display when loaded
            <WeatherDisplay weather={weather} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page