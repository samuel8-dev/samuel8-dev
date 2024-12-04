import React, { useState, useEffect } from "react";
import { openDB } from "idb"; // Import idb for easier IndexedDB interaction
import "./App.css";

function App() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  // Initialize IndexedDB
  const [db, setDb] = useState(null);

  useEffect(() => {
    // Open or create the IndexedDB
    const initializeDB = async () => {
      const dbInstance = await openDB("userDatabase", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("users")) {
            const store = db.createObjectStore("users", { keyPath: "emailOrUsername" });
            store.createIndex("emailOrUsername", "emailOrUsername");
          }
        },
      });
      setDb(dbInstance);
    };
    initializeDB();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data to store
    const formData = { emailOrUsername, password };

    if (db) {
      try {
        // Save the data to IndexedDB
        await db.put("users", formData);
        alert("Data saved to IndexedDB!");

        // Optionally, you could perform further actions like redirecting the user.
        // Example: window.location.href = "/dashboard";
      } catch (error) {
        console.error("Error saving to IndexedDB:", error);
        alert("Failed to save data.");
      }
    } else {
      alert("IndexedDB not initialized.");
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
