import axios from "axios";

// Create axios instance with default config
const API = axios.create({
  baseURL: "https://impact-reporting-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Generates sustainability impact report
 * @param {Object} data - Payload matching backend schema
 * @returns {Promise} Axios response
 */
export const generateImpactReport = async (data) => {
  try {
    const response = await API.post("/impact/generate", data);
    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
