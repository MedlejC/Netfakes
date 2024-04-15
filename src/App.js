import React from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from './screens/LoginScreen'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInScreen from "./screens/SignInScreen";

function App() {
  const user = null;
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
