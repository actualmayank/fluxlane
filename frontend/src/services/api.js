import axios from "axios";

export const getTrafficPrediction = async (hour, day, lat, lon) => {
  const res = await axios.get(`https://fluxlane.onrender.com`);
  return res.data.traffic_level;
};
