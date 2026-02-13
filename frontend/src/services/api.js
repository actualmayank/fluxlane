import axios from "axios";

const BASE_URL = "https://fluxlane.onrender.com";

export const getTrafficPrediction = async (hour, day, zone) => {
  const res = await axios.get(
    `${BASE_URL}/predict?hour=${hour}&day=${day}&zone=${zone}`
  );
  return res.data.traffic_level;
};