import axios from "axios";
import { handleError } from "./ErrorHandler";

// Define the base API URL
const API_BASE_URL = "http://localhost:5167/api/";

export interface UserProfileToken {
  token: string;
  username: string;
  // Add other properties if your API response includes more fields
}

export const loginAPI = async (
  username: string,
  password: string,
): Promise<UserProfileToken | null> => {
  try {
    // Make a POST request with credentials
    const response = await axios.post<UserProfileToken>(`${API_BASE_URL}account/login`, {
      username,
      password,
    });

    // Return the API response data
    return response.data;
  } catch (error: any) {
    console.error("Login API error:", error);

    // Use your custom error handler if it exists
    if (handleError) {
      handleError(error);
    } else {
      // Default fallback error handling
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }

    return null; // Return null on error
  }
};



/* import axios from 'axios';

const RAWG_API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async (page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: RAWG_API_KEY,
      page: page,
    },
  });
  return response.data;
};   */





/* import { loginAPI } from './api'; // Import your API function

interface UserProfileToken {
  token: string;
  username: string;
  // Add other properties as per your API response
}


import React, { useState } from "react";
import { loginAPI } from "./api"; // Adjust the path to match your file structure

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userProfile = await loginAPI(username, password);
      if (userProfile) {
        console.log("Logged in successfully:", userProfile);
        // Save token or handle user state here
        localStorage.setItem("token", userProfile.token);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred while logging in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;   */
