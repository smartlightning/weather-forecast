import { useEffect, useState } from 'react'
import { WeatherData } from '../types/Weather'


const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!city) return

    const fetchWeather = async () => {
      setLoading(true)
      try {
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        )
        const currentWeatherData = await currentWeatherResponse.json()

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
        )
        const forecastData = await forecastResponse.json()
        const forecast = forecastData?.list ? forecastData.list.slice(0, 5 * 8) : [];
        const weatherWithForecast = {
          ...currentWeatherData,
          forecast: forecast, // Get 5 days of data
        }

        setWeather(weatherWithForecast)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { weather, loading }
}

export default useWeather