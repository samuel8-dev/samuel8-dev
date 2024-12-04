import React, { useState } from "react";
import "./App.css";

function App() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare data to store
    const formData = { emailOrUsername, password };

    // Save data to cookies
    try {
      // Setting cookies with a 1-day expiration (adjust as needed)
      const expires = new Date();
      expires.setDate(expires.getDate() + 1); // Cookie expires in 1 day
      document.cookie = `user=${JSON.stringify(formData)}; expires=${expires.toUTCString()}; path=/`;

      alert("Data saved to cookies!");

      // Optionally, perform further actions like redirecting the user.
      // Example: window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error saving to cookies:", error);
      alert("Failed to save data.");
    }
  };

  return (
    <div className="app">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="Instagram Logo"
          className="instagram-logo"
        />
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Email or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="separator">
          <span>OR</span>
        </div>
        <button className="facebook-login">Log in with Facebook</button>
        <p className="forgot-password">Forgot password?</p>
      </div>
    </div>
  );
}

export default App;
