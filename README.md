# RondoClima

RondoClima — Monitoramento Ambiental de Rondonópolis (MT).  
Projeto de extensão universitária que exibe clima, índice UV, previsões e qualidade do ar usando APIs públicas (Open-Meteo, WAQI e OpenAQ).

---

## Demo
> Local: rode `npm run dev` e abra `http://localhost:5173/`.

(Adicionar link do deploy quando disponível)

---

## Funcionalidades
- Clima atual: temperatura, umidade, sensação térmica (Heat Index), índice UV e chance de chuva.
- Qualidade do ar: PM2.5 / PM10 e gases adicionais (quando disponíveis) com AQI estimado.
- Tema automático (light/dark) e background visual conforme condições do tempo.
- Código aberto no GitHub.

---

## Tech stack
- React + Vite
- APIs: Open-Meteo, WAQI (token demo), OpenAQ
- Estilos: CSS (planilha de estilos centralizada)

---

## Estrutura do projeto
Veja a estrutura relevante:

src/
api/
components/
utils/
App.jsx
App.css


---

## Instalação e execução (desenvolvimento)
```bash
# instalar dependências (node >= 16)
npm install

# rodar em dev server
npm run dev