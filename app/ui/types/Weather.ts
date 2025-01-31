// types/Weather.ts
export interface WeatherForecast {
  dt_txt: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  weather: {
    main: string
    description: string
    icon: string
  }[]
}

export interface WeatherData {
  forecast: WeatherForecast[]
  name: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  weather: {
    main: string
    description: string
  }[]
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
}

export interface CitySuggestion {
  id: number
  name: string
sys: {

  id: number
  name: string
  country: string
  coord: {
    lat: number
    lon: number
  }
}
}