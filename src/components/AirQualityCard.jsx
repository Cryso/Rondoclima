import React from "react";

function AirQualityCard({ data }) {

  // 🔍 Normalização dos valores (PMs + gases)
  let pm25 = 0, pm10 = 0;
  let co = null, o3 = null, no2 = null, so2 = null;
  let overall = "-";
  let fallback = false;

  // OpenAQ formato direto
  if (data && (data.pm25 !== undefined || data.pm10 !== undefined)) {
    pm25 = data.pm25 ?? 0;
    pm10 = data.pm10 ?? 0;

    co = data.co ?? null;
    o3 = data.o3 ?? null;
    no2 = data.no2 ?? null;
    so2 = data.so2 ?? null;

    overall = data.aqi ?? Math.round((pm25 + pm10) / 2);
    fallback = !!data.fallback;
  }

  // OpenAQ formato results[]
  else if (data?.results?.length > 0) {
    const m = data.results[0].measurements || [];

    const getVal = (param) => m.find(x => x.parameter === param)?.value ?? null;

    pm25 = getVal("pm25") ?? 0;
    pm10 = getVal("pm10") ?? 0;

    co = getVal("co");
    o3 = getVal("o3");
    no2 = getVal("no2");
    so2 = getVal("so2");

    overall = Math.round((pm25 + pm10) / 2);
    fallback = true;
  }

  // WAQI API
  else if (data?.data) {
    const api = data.data;

    pm25 = api.iaqi?.pm25?.v ?? 0;
    pm10 = api.iaqi?.pm10?.v ?? 0;

    co = api.iaqi?.co?.v ?? null;
    o3 = api.iaqi?.o3?.v ?? null;
    no2 = api.iaqi?.no2?.v ?? null;
    so2 = api.iaqi?.so2?.v ?? null;

    overall = api.aqi ?? Math.round((pm25 + pm10) / 2);
    fallback = data.status !== "ok";
  }

  const getColor = (v) => {
    if (v === "-" || v === null) return "#999";
    if (v <= 25) return "#2ecc71";
    if (v <= 50) return "#f1c40f";
    if (v <= 75) return "#e67e22";
    return "#e74c3c";
  };

  return (
    <div className="fade-in" style={styles.card}>

      {/* Header */}
      <div style={styles.header}>🌬️ Qualidade do Ar</div>

      {/* AQI Geral */}
      <div style={styles.overallContainer}>
        <div style={{
          ...styles.circle,
          background: overall === "-" ? "#888" : getColor(Number(overall))
        }}>
          {overall}
        </div>

        <p style={styles.overallLabel}>
          {fallback
            ? "Dados aproximados / não oficiais"
            : "Índice geral estimado"}
        </p>
      </div>

      {/* PMs */}
      <div style={styles.grid}>
        <div style={styles.box}>
          <div style={styles.boxHeader}>🌫️ PM2.5</div>
          <p style={{ ...styles.value, color: getColor(pm25) }}>
            {pm25} µg/m³
          </p>
        </div>

        <div style={styles.box}>
          <div style={styles.boxHeader}>💨 PM10</div>
          <p style={{ ...styles.value, color: getColor(pm10) }}>
            {pm10} µg/m³
          </p>
        </div>
      </div>

      {/* Gases */}
      {(co || o3 || no2 || so2) && (
        <>
          <div style={styles.divider} />

          <div style={styles.extraHeader}>🌡️ Gases adicionais</div>

          <div style={styles.extraGrid}>
            {co !== null && (
              <div style={styles.extraBox}>
                <span style={styles.extraLabel}>CO</span>
                <span style={styles.extraValue}>{co} µg/m³</span>
              </div>
            )}

            {o3 !== null && (
              <div style={styles.extraBox}>
                <span style={styles.extraLabel}>O₃</span>
                <span style={styles.extraValue}>{o3} µg/m³</span>
              </div>
            )}

            {no2 !== null && (
              <div style={styles.extraBox}>
                <span style={styles.extraLabel}>NO₂</span>
                <span style={styles.extraValue}>{no2} µg/m³</span>
              </div>
            )}

            {so2 !== null && (
              <div style={styles.extraBox}>
                <span style={styles.extraLabel}>SO₂</span>
                <span style={styles.extraValue}>{so2} µg/m³</span>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default AirQualityCard;


// 🎨 Estilos (prontos para migrar para CSS futuramente)
const styles = {
  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
    marginBottom: "25px",
    color: "#0f5132"
  },

  header: {
    textAlign: "center",
    background: "#f0f7ff",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#0f5132",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.15)"
  },

  overallContainer: { textAlign: "center", marginBottom: "15px" },

  circle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    margin: "0 auto",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  },

  overallLabel: { marginTop: "10px", fontSize: "14px", fontWeight: "bold" },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  box: {
    background: "linear-gradient(145deg, #e8f5ff, #d6ecff)",
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
    marginBottom: "8px",
    color: "#0f5132"
  },

  value: { fontSize: "24px", fontWeight: "bold" },

  divider: {
    width: "100%",
    height: "2px",
    background: "#e2e8f0",
    margin: "20px 0",
  },

  extraHeader: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#0f5132",
  },

  extraGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  extraBox: {
    background: "#f6faff",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #dbe7f5",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },

  extraLabel: { fontWeight: "bold", color: "#0f5132" },
  extraValue: { fontWeight: "bold", color: "#0f5132" },
};
