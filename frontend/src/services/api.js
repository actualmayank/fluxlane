import axios from "axios";

const BASE_URL = "https://fluxlane.onrender.com";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTrafficPrediction = async (hour, day, zone = 1) => {
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

    // Retry once after 5 seconds (handles cold start)
    await wait(5000);

    const retryResponse = await axios.get(
      `${BASE_URL}/predict`,
      {
        params: { hour, day, zone },
        timeout: 60000
      }
    );

    return retryResponse.data.traffic_level;
  }
};