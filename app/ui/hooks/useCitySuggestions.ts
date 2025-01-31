import { useState, useEffect } from 'react'
import { CitySuggestion } from '../types/Weather'

const API_URL = 'https://api.openweathermap.org/data/2.5/find'

type UseCitySuggestionsProps = {
  suggestions: CitySuggestion[],
  loading: boolean
}

const useCitySuggestions = (query: string): UseCitySuggestionsProps => {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        console.log("api key", process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY)
        const response = await fetch(
          `${API_URL}?q=${query}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        )
        const data = await response.json()

        if (response.ok) {
          setSuggestions(data.list || [])
        } else {
          setSuggestions([])
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimeout = setTimeout(fetchSuggestions, 500) // 200ms debounce
    return () => clearTimeout(debounceTimeout)
  }, [query])

  return { suggestions, loading }
}

export default useCitySuggestions