import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native"; // Import Platform from react-native

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

export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

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

// Register function
export const register = async ({ username, email, password }) => {
  try {
    const response = await api.post("/users/register", {
      username,
      email,
      password,
    });
    const { token } = response.data;

    // Store the token in AsyncStorage
    await AsyncStorage.setItem("token", token);

    return response.data; // Return data from the response if needed
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Update user details function
export const updateUserDetails = async (updatedUser) => {
  try {
    console.log(updatedUser);
    const response = await api.post("/users/update", updatedUser);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user details:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

// Task-related functions
export const getTasksForDate = async (date) => {
  try {
    const response = await api.get(`/tasks?date=${date}`);
    // Format the data to match the frontend expectations
    const formattedData = response.data.map((task) => ({
      task: task.description,
      timeFrom: new Date(task.timeFrom).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timeTo: new Date(task.timeTo).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: date, // Assuming all tasks are for the requested date
    }));
    return formattedData;
  } catch (error) {
    console.error(
      "Error fetching tasks for date:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

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

export const getWeeklyWorkLeisureSummary = async (startDate, endDate) => {
  try {
    const response = await api.get(
      `/tasks/weekly-summary?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weekly summary:",
      error.response?.data || error.message
    );
    throw error.response?.data || error;
  }
};

export const importCalendarEvents = async (uri) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
      name: "calendar.ics",
      type: "text/calendar",
    });

    const response = await api.post("tasks/import-calendar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to import calendar events:", error);
    throw error;
  }
};
