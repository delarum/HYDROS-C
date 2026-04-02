import axios from "axios";

const BASE_URL = "http://localhost:5000/api/reports";

export async function submitReport(reportData) {
  const response = await axios.post(BASE_URL, reportData);
  return response.data;
}