import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const axiosClient = axios.create({
  baseURL: BASE_URL + "api",
  timeout: 10000,
});

export { axiosClient };
