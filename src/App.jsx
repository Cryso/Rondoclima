import { useEffect, useState } from "react";
import { getWeather } from "./api/openMeteo";
import { getAirQuality } from "./api/airQuality";

import WeatherCard from "./components/WeatherCard";
import AirQualityCard from "./components/AirQualityCard";
import Loading from "./components/Loading";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { getWeatherBackgroundClass } from "./utils/getWeatherBackground";

import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  // Detecta tema e aplica classe no <body>
  function detectTheme() {
    const hour = new Date().getHours();
    setTheme(hour >= 6 && hour < 18 ? "light" : "dark");
  }

  useEffect(() => {
    async function load() {
      const w = await getWeather();
      const a = await getAirQuality();
      setWeather(w);
      setAir(a);
      setLoading(false);
    }
    detectTheme();
    load();
  }, []);

  // Escolhe classe de background com base no weather_code (se disponível)
  const bgClass = weather?.current ? getWeatherBackgroundClass(weather.current.weather_code) : "bg-default";

  // aplica tema como classe no body (para ser lido pelo CSS)
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme === "light" ? "theme-light" : "theme-dark");
  }, [theme]);

  return (
    <div className={bgClass} style={{ transition: "all 0.8s ease-in-out" }}>
      <Header />

      <div className="rc-container">
        {loading && <Loading />}

        {!loading && (
          <>
            <WeatherCard data={weather} />
            <AirQualityCard data={air} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
