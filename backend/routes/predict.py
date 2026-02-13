from fastapi import APIRouter
import pandas as pd
import joblib
import os

router = APIRouter()

model_path = os.path.join(
    os.path.dirname(__file__),
    "../../ml_model/traffic_model.pkl"
)

model = joblib.load(model_path)


@router.get("/predict")
def predict(hour: int, day: int, zone: int = 1):

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