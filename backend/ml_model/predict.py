from fastapi import APIRouter, HTTPException
import pandas as pd
import joblib
import os

router = APIRouter()

model_path = os.path.join(
    os.path.dirname(__file__),
    "../traffic_model.pkl"
)

model = joblib.load(model_path)


@router.get("/predict")
def predict(hour: int, day: int, zone: int = 1):

    # Basic validation
    if hour < 0 or hour > 23:
        raise HTTPException(status_code=400, detail="Hour must be between 0 and 23")

    if day < 1 or day > 7:
        raise HTTPException(status_code=400, detail="Day must be between 1 and 7")

    if zone < 1 or zone > 5:
        zone = 1

    is_weekend = 1 if day >= 6 else 0
    weather = 0

    data = pd.DataFrame(
        [[hour, day, zone, weather, is_weekend]],
        columns=["hour", "day_of_week", "zone", "weather", "is_weekend"]
    )

    prediction = model.predict(data)[0]

    prediction = max(5, min(100, prediction))

    return {
        "traffic_level": round(float(prediction), 2)
    }