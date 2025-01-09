import { useState, useEffect } from 'react'

const API_URL = 'https://api.openweathermap.org/data/2.5/find'

type Suggestion = {
  id: number
  name: string
  sys: {
    country: string
  }
}

const useCitySuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
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