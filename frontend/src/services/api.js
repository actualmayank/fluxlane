import axios from "axios";

const BASE_URL = "https://fluxlane.onrender.com";

export const getTrafficPrediction = async (hour, day, zone) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/predict`,
      {
        params: { hour, day, zone },
        timeout: 60000
      }
    );

    return response.data.traffic_level;

  } catch (error) {

    if (error.code === "ECONNABORTED") {
      throw new Error("Server is waking up. Please try again in a few seconds.");
    }

    if (error.response) {
      throw new Error("Server error. Please try again.");
    }

    throw new Error("Network error. Check your connection.");
  }
};