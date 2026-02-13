import joblib
import pandas as pd

model = joblib.load("traffic_model.pkl")

input_data = pd.DataFrame([[18, 1, 1]], columns=["hour", "day_of_week", "zone"])
prediction = model.predict(input_data)

print(round(prediction[0], 2))