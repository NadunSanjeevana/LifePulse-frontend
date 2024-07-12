import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await api.post("/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Add more API functions as needed
