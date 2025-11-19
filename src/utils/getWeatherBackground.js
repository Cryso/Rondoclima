// retorna uma classe CSS (string) com base no weather_code
export function getWeatherBackgroundClass(code) {
  if (code === 0) return "bg-sunny"; // ensolarado
  if ([1,2,3].includes(code)) return "bg-partly"; // parcialmente nublado
  if ([51,61,63,80,81].includes(code)) return "bg-rain"; // chuva
  if ([95,96,99].includes(code)) return "bg-storm"; // tempestade
  return "bg-default"; // fallback
}
