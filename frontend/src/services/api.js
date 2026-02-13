import axios from "axios";

const BASE_URL = "https://fluxlane.onrender.com";

export const getTrafficPrediction = async (hour, day, zone = 1) => {
  const res = await axios.get(
    `${BASE_URL}/predict?hour=${hour}&day=${day}&zone=${zone}`
  );
  return res.data.traffic_level;
};