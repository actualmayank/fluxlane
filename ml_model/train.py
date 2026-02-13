import pandas as pd
import numpy as np
import joblib
from xgboost import XGBRegressor

np.random.seed(42)

rows = 5000

hours = np.random.randint(0, 24, rows)
days = np.random.randint(1, 8, rows)
zones = np.random.randint(1, 6, rows)
weather = np.random.choice([0, 1], rows)
is_weekend = np.where(days >= 6, 1, 0)

traffic = []

for i in range(rows):
    base = 20
    
    if 7 <= hours[i] <= 10:
        base += 40
    if 17 <= hours[i] <= 20:
        base += 45
    if weather[i] == 1:
        base += 15
    if is_weekend[i] == 1:
        base -= 10
    
    noise = np.random.normal(0, 5)
    traffic.append(min(100, max(5, base + noise)))

data = pd.DataFrame({
    "hour": hours,
    "day_of_week": days,
    "zone": zones,
    "weather": weather,
    "is_weekend": is_weekend,
    "traffic_level": traffic
})

X = data[["hour", "day_of_week", "zone", "weather", "is_weekend"]]
y = data["traffic_level"]

model = XGBRegressor(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    objective="reg:squarederror"
)

model.fit(X, y)

joblib.dump(model, "traffic_model.pkl")

print("XGBoost model trained and saved.")