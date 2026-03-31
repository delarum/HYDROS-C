import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

export async function loginUser(email) {
  const response = await axios.post(`${BASE_URL}/login`, { email });
  return response.data;
}