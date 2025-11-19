function WeatherCard({ data }) {
    if (!data || !data.current) return <p>Erro ao carregar clima.</p>;

    const t = data.current.temperature_2m;
    const h = data.current.relative_humidity_2m;
    const uv = data.current.uv_index;

    // Chuva (hora atual)
    let rainChance = null;
    if (data.hourly?.precipitation_probability) {
        const now = new Date().getHours();
        rainChance = data.hourly.precipitation_probability[now];
    }

    // Sensação térmica (Heat Index)
    function calculateHeatIndex(tempC, humidity) {
        const tempF = (tempC * 9) / 5 + 32;
        const HI =
            -42.379 +
            2.04901523 * tempF +
            10.14333127 * humidity -
            0.22475541 * tempF * humidity -
            0.00683783 * tempF * tempF -
            0.05481717 * humidity * humidity +
            0.00122874 * tempF * tempF * humidity +
            0.00085282 * tempF * humidity * humidity -
            0.00000199 * tempF * tempF * humidity * humidity;

        return Math.round(((HI - 32) * 5) / 9);
    }

    const heatIndex = calculateHeatIndex(t, h);

    // UV helpers
    function getUVCategory(uv) {
        if (uv < 3) return "Baixo";
        if (uv < 6) return "Moderado";
        if (uv < 8) return "Alto";
        if (uv < 11) return "Muito alto";
        return "Extremo";
    }

    function getUVAdvice(uv) {
        if (uv < 3) return "Seguro para atividades ao ar livre.";
        if (uv < 6) return "Use óculos de sol e protetor solar.";
        if (uv < 8) return "Evite sol das 10h às 16h.";
        if (uv < 11) return "Use proteção máxima! Risco alto.";
        return "Evite exposição ao sol. Perigo extremo!";
    }

    const uvCategory = getUVCategory(uv);
    const uvAdvice = getUVAdvice(uv);

    // Cores dinâmicas
    const getTempColor = () => {
        if (t <= 20) return "#007bff";
        if (t <= 26) return "#e6b800";
        if (t <= 36) return "#ff8800";
        return "#ff0000";
    };

    const getHumidityColor = () => (h >= 60 ? "#4db8ff" : "#ffb347");
    const getUVColor = () => "#8e44ad";
    const getRainColor = () => "#004c99";

    // Emojis
    const emojiTemp = "🌡️";
    const emojiHumidity = h >= 60 ? "💧" : "🔥";
    const emojiUV = "☀️";
    const emojiRain = "🌧️";
    const emojiHeat = "🥵";

    return (
        <div className="fade-in" style={styles.card}>
            <div style={styles.header}>🌤️ Clima Atual</div>

            {t > 36 && (
                <div style={styles.alert}>
                    🔥 <b>Temperatura muito elevada!</b> Beba água e evite o sol.
                </div>
            )}

            <div style={styles.grid}>
                <div style={styles.box}>
                    <div style={styles.boxHeader}>{emojiTemp} Temperatura</div>
                    <p style={{ ...styles.value, color: getTempColor() }}>{t}°C</p>
                </div>

                <div style={styles.box}>
                    <div style={styles.boxHeader}>{emojiHeat} Sensação Térmica</div>
                    <p style={{ ...styles.value, color: getTempColor() }}>
                        {heatIndex}°C
                    </p>
                </div>

                <div style={styles.box}>
                    <div style={styles.boxHeader}>{emojiHumidity} Umidade</div>
                    <p style={{ ...styles.value, color: getHumidityColor() }}>{h}%</p>
                </div>

                <div style={styles.box}>
                    <div style={styles.boxHeader}>{emojiUV} Índice UV</div>
                    <p style={{ ...styles.value, color: getUVColor() }}>
                        {uv} — {uvCategory}
                    </p>
                    <div style={{ fontSize: "13px", opacity: 0.8 }}>{uvAdvice}</div>
                </div>

                <div style={styles.box}>
                    <div style={styles.boxHeader}>{emojiRain} Chance de chuva</div>
                    <p style={{ ...styles.value, color: getRainColor() }}>
                        {rainChance !== null ? `${rainChance}%` : "—"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;

const styles = {
    card: {
        background: "#ffffff",
        padding: "25px",
        borderRadius: "20px",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
        marginBottom: "25px",
        color: "#0f5132",
    },

    alert: {
        background: "#ffdddd",
        color: "#b30000",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "15px",
        textAlign: "center",
        fontWeight: "bold",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
    },

    box: {
        background: "linear-gradient(145deg, #e8fff5, #c5f7df)",
        padding: "20px",
        borderRadius: "16px",
        textAlign: "center",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    },

    boxHeader: {
        background: "rgba(255,255,255,0.6)",
        padding: "6px 10px",
        borderRadius: "10px",
        fontSize: "14px",
        fontWeight: "bold",
        marginBottom: "10px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
    },

    value: {
        marginTop: "5px",
        fontSize: "26px",
        fontWeight: "bold",
    },

    header: {
        textAlign: "center",
        background: "rgba(0, 0, 0, 0.05)",
        padding: "12px",
        borderRadius: "12px",
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "20px",
        boxShadow: "0px 3px 6px rgba(0,0,0,0.15)",
    },
};
