import axios from "axios";
import { initializeMockInstance } from "../mock/mockAdapterConfig";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

initializeMockInstance(axiosInstance);
