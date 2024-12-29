import React, { createContext, useContext, useState,useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userExist,setUserExist] = useState(false)
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle login
  const login = async (mobileNumber, password) => {
    setLoading(true); // Start loading
    setError(""); // Clear previous error
    try {
      const response = await fetch(
        "https://bank-backend-a00q.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileNumber, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      await AsyncStorage.setItem("authToken", JSON.stringify(data)); // Save token to AsyncStorage
      setUser(data); // Set user data
      setIsLogged(true); // Set logged in status
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to handle logout
  const logout = async () => {
    await AsyncStorage.removeItem("authToken"); // Clear token
    setUser(null); // Clear user data
    setIsLogged(false); // Set logged out status
    setError(""); // Clear error messages (optional)
  };
  // On app launch, check if a user is already logged in
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setUserExist(true)
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setLoading(false);
    }
  };
  // Call checkAuthStatus on app initialization
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        error,
        userExist,
        login, // Expose the login function
        logout, // Expose the logout function
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
