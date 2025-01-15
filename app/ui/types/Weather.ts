export interface WeatherForecast {
  dt_txt: string // Forecast timestamp
  main: {
    temp: number
  }
  weather: {
    description: string
    icon: string
  }[]
}

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
  forecast: WeatherForecast[] // Array of forecast data
}