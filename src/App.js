import React, { useState, useEffect } from "react";
import { openDB } from "idb"; // A library to interact with IndexedDB more easily
import "./App.css";

function App() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [db, setDb] = useState(null);

  useEffect(() => {
    // Initialize IndexedDB
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

    const formData = { emailOrUsername, password };

    if (db) {
      try {
        // Save to IndexedDB
        await db.put("users", formData);
        alert("Data saved to IndexedDB!");

        // Optionally, redirect or show a message after saving
      } catch (error) {
        console.error("Error saving to IndexedDB:", error);
        alert("Failed to save data.");
      }
    } else {
      alert("Database not initialized.");
    }
  };

  const handleShowData = async () => {
    if (db) {
      const storedData = await db.getAll("users"); // Get all users from IndexedDB
      if (storedData.length > 0) {
        alert("Saved Users: \n" + JSON.stringify(storedData, null, 2));
      } else {
        alert("No users found in IndexedDB.");
      }
    } else {
      alert("Database not initialized.");
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

        {/* Button to show saved data */}
        <button onClick={handleShowData} className="show-data-button">
          Show Saved Data
        </button>
      </div>
    </div>
  );
}

export default App;
