import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

export async function getUserStats(userId) {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
}