// WAQI – API sem necessidade de chave (token demo)
const TOKEN = "demo";
const LAT = -16.47;
const LON = -54.64;

const FALLBACK_RESPONSE = {
  fallback: true,
  aqi: "-",
  pm25: 0,
  pm10: 0,
  co: null,
  o3: null,
  no2: null,
  so2: null,
};

export async function getAirQuality() {
  const url = `https://api.waqi.info/feed/geo:${LAT};${LON}/?token=${TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("WAQI:", data);

    // Dados ausentes ou API retornou erro
    if (data.status !== "ok" || !data.data?.iaqi) {
      return FALLBACK_RESPONSE;
    }

    const iaqi = data.data.iaqi;

    return {
      fallback: false,
      aqi: data.data.aqi ?? "-",
      pm25: iaqi.pm25?.v ?? null,
      pm10: iaqi.pm10?.v ?? null,
      co: iaqi.co?.v ?? null,
      o3: iaqi.o3?.v ?? null,
      no2: iaqi.no2?.v ?? null,
      so2: iaqi.so2?.v ?? null,
    };

  } catch (err) {
    console.error("Erro WAQI:", err);
    return FALLBACK_RESPONSE;
  }
}
