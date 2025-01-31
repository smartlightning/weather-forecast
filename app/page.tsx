'use client'

import { useState, useCallback, Suspense, useRef, useEffect } from 'react'
import WeatherDisplay from './ui/weather/WeatherDisplay'
import useWeather from './ui/hooks/useWeather'
import useCitySuggestions from './ui/hooks/useCitySuggestions'
import WeatherForecastDisplay from './ui/weather/WeatherForecastDisplay'
import { CurrentWeatherCard } from './ui/skeletons'

const Page: React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [inputCity, setInputCity] = useState<string>(city)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const { weather } = useWeather(city)
  const { suggestions, loading: suggestionsLoading } =
    useCitySuggestions(inputCity)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      // Clear previous timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      // Update input immediately for display
      setInputCity(value)

      // Set new timeout for suggestions
      timeoutRef.current = setTimeout(() => {
        setShowDropdown(true)
        setHighlightedIndex(-1)
      }, 2000)
    },
    []
  )

  const updateCity = useCallback(
    (newCity: string): void => {
      if (city !== newCity) setCity(newCity)
      setInputCity(newCity)
      setShowDropdown(false)
      setHighlightedIndex(-1)
      // Clear any pending timeouts when city is selected
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [city]
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white px-4 md:px-8 py-12">
      <div className="container mx-auto max-w-4xl">
        {/* Search Section */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            {city ? `Weather in ${city}` : 'Global Weather Explorer'}
          </h1>

          <div className="relative max-w-xl mx-auto">
            <input
              className="w-full p-4 text-lg bg-white/90 text-gray-800 rounded-xl shadow-xl
                       outline-none focus:ring-4 focus:ring-indigo-300 transition-all
                       placeholder:text-gray-400"
              type="text"
              value={inputCity}
              onChange={handleCityChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for a city..."
              aria-label="City search input"
            />

            {/* Suggestions Dropdown */}
            {showDropdown && (
              <ul
                className="absolute top-16 w-full bg-white rounded-xl shadow-2xl z-20
                           overflow-hidden animate-fadeIn"
              >
                {suggestionsLoading ? (
                  <li className="p-4 text-gray-500 text-center animate-pulse">
                    Loading suggestions...
                  </li>
                ) : suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.id}
                      className={`p-3 cursor-pointer transition-colors ${
                        highlightedIndex === index
                          ? 'bg-indigo-100'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSuggestionClick(index)}
                    >
                      <span className="font-medium text-gray-800">
                        {suggestion.name}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">
                        {suggestion.sys.country}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-gray-500 text-center">
                    No cities found
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Weather Content */}
        <div className="space-y-8">
          <Suspense fallback={<CurrentWeatherCard />}>
            {weather ? (
              <>
                <WeatherDisplay weather={weather} />
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
                    5-Day Forecast
                  </h2>
                  <WeatherForecastDisplay forecast={weather.forecast} />
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-lg text-white/80">
                {inputCity
                  ? 'Searching...'
                  : 'Enter a city to view weather data'}
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Page
