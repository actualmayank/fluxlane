# 🚦 FluxLane

ML-powered traffic congestion prediction web app.

FluxLane predicts traffic levels (%) based on time, day, and region using a trained XGBoost model, served through a FastAPI backend and visualized with a React + Leaflet frontend.

---

## ⚙️ Tech Stack

- React
- FastAPI
- XGBoost
- REST API

---

## 🚀 Features

- Live & Custom time prediction
- Interactive map interface
- Light/Dark theme toggle
- Production-ready API integration
- Retry handling for cold starts

---

## 🛠 Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
