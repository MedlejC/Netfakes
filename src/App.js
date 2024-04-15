import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // => Logged out
        dispatch(logout);
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
            <Route exact path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
