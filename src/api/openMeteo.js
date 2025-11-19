export async function getWeather() {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=-16.4675&longitude=-54.637&current=temperature_2m,relative_humidity_2m,uv_index,precipitation,weather_code&hourly=precipitation_probability&timezone=auto";

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Erro ao buscar dados da API Open-Meteo");
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Erro em getWeather():", error);
    return null;
  }
}
