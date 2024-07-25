// App/Context/AuthContext.js
import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn as apiSignIn, register as apiRegister } from "../services/api"; // Adjust the import path as necessary

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiSignIn(credentials);
      await AsyncStorage.setItem("token", data.token); // Storing the token
      setUser({
        email: credentials.email,
        userName: data.userName,
        profileImage: data.profileImage,
      });

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRegister(credentials);
      await AsyncStorage.setItem("token", data.token); // Storing the token
      setUser({
        email: credentials.email,
        userName: data.userName,
        profileImage: data.profileImage,
      });

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, register, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
