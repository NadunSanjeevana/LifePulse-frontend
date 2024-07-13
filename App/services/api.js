import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.8.197:3000/api"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in the headers if it exists
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// Sign in function
export const signIn = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Task-related functions
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await api.post("tasks/addTasks", task);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating task:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Add more API functions as needed
