import React, { useState } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const existingUser = localStorage.getItem(`user_${username}`);
    if (existingUser) {
      setError("User already exists. Please log in.");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = JSON.stringify({ username, email, password: hashedPassword });
      localStorage.setItem(`user_${username}`, userData);

      alert("Registration successful! Please log in.");
      setIsRegistering(false); // Switch to login form
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedUser = localStorage.getItem(`user_${username}`);
    if (!storedUser) {
      setError("User not found. Please register.");
      return;
    }

    const { password: storedPassword } = JSON.parse(storedUser);
    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (passwordMatch) {
      const mockToken = `mock_token_${Date.now()}`;
      setToken(mockToken);
      localStorage.setItem("rawg_token", mockToken);
      alert("Login successful!");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h1>RAWG API {isRegistering ? "Register" : "Login"}</h1>
      {token ? (
        <div>
          <p>Welcome To Four Tet RAWG API! You are logged in.</p>
          <button
            onClick={() => {
              setToken(null);
              localStorage.removeItem("rawg_token");
              alert("Logged out successfully.");
            }}
          >
            Log Out
          </button>
        </div>
      ) : (
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isRegistering ? "Register" : "Log In"}</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
      {!token && (
        <p>
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button onClick={() => setIsRegistering(false)}>Log In</button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button onClick={() => setIsRegistering(true)}>Register</button>
            </>
          )}
        </p>
      )}
      <button className="home-button" onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default Login;
