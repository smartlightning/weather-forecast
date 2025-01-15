export const CurrentWeatherCard = () => {
  return (
    <div className="flex flex-col items-center bg-white bg-opacity-10 p-6 rounded-lg shadow-md animate-pulse">
      <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
      <h2 className="h-6 w-2/3 bg-gray-300 rounded mt-4"></h2>
      <p className="h-6 w-1/2 bg-gray-300 rounded"></p>
      <p className="h-8 w-1/3 bg-gray-300 rounded font-semibold"></p>
    </div>
  )
}
