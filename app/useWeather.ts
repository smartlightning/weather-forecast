import { useState, useEffect } from 'react'

const API_URL = 'https://api.openweathermap.org/data/2.5/weather'

const useWeather = (city: string) => {
  const [weather, setWeather] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!city) return

    const fetchWeather = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${API_URL}?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        )
        const data = await response.json()
        setWeather(data)
      } catch (error) {
        console.error('Error fetching weather:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, loading }
}

export default useWeather