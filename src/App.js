import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = null;

  // Add persitence to user login
  // (remember that they are signed in)
  useEffect(() => {
    // onAuthStateChanged: Listens to any changes in the authentication.
    // Even if i'm logged in and refresh, Firebase will store my auth in my local memory (my browser)
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // if userAuth true/exists
        // => Logged in
        console.log(userAuth);
      } else {
        // => Logged out
      }
    });
    // Cleanup function:
    return unsubscribe;
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ? (
          // If we dont have a valid user, render the Login Screen
          <LoginScreen />
        ) : (
          // Otherwise, render the project
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
