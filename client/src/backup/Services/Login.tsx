import React, { useState } from "react";
import { loginAPI, UserProfileToken } from "./authAPI"; // Adjust path as needed

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setIsLoading(true);

    try {
      const userProfile: UserProfileToken | null = await loginAPI(username, password);

      if (userProfile) {
        console.log("Login successful:", userProfile);
        localStorage.setItem("token", userProfile.token); // Store token in localStorage
        // Redirect user or update app state as needed
      } else {
        setError("Invalid username or password.");
      }
    } catch (error: any) {
      setError(error.message); // Display API or network error
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

export default Login;