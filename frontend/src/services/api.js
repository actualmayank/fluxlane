import axios from "axios";

export const getTrafficPrediction = async (hour, day, lat, lon) => {
  const res = await axios.get(`http://127.0.0.1:8000/predict?hour=${hour}&day=${day}&zone=1`);
  return res.data.traffic_level;
};