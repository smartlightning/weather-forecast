import { useState, useEffect } from 'react'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const useWeather = (city: string) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null) // Reset error state on new fetch
      try {
        const response = await fetch(
          `${API_URL}?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        )
        const data = await response.json()
        if (response.ok) {
          setWeather(data)
        } else {
          setError(data.message || 'City not found')
          setWeather(null) // Clear weather on error
        }
      } catch (error) {
        console.log(error)
        setError('Failed to fetch weather data')
      } finally {
        setLoading(false)
      }
    }

    if (city.trim()) fetchWeather()
  }, [city])

  return { weather, loading, error }
}

export default useWeather