export interface WeatherData {
    name: string
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      humidity: number
    }
    weather: {
      description: string
      main: string
    }[]
    sys: {
      country: string
    }
  }

  export interface CitySuggestion {
    id: string
    name: string
    sys: {
      country: string
    }
  }