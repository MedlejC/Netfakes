import React, { useState } from "react";
import "./LoginScreen.css";
import RegisterScreen from "./RegisterScreen";
import SignInScreen from "./SignInScreen";
import logo from "../assets/logo.png";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [screen, setScreen] = useState('base') // base, signIn, register

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src={logo} />
        <button className="loginScreen__button" onClick={() => setScreen('signIn') /*setSignIn(true)*/ }>
          Sign In
        </button>
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {screen === 'register' ? (
          // If signIn is true, render the Sign In Screen
          <RegisterScreen email = {email}/>
        ) : screen === 'signIn' ? (
          <SignInScreen setScreen={setScreen}/>
        ) : (
          // Otherwise, render the Sign Up page
          <>
            <h1>Unlimited films, TV series & more!</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create your account.</h3>

            <div className="loginScreen__input">
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  value={email} // Bind input to state
                  onChange={(e) => setEmail(e.target.value)} // Update state on change
                />
                <button
                  className="loginScreen__getStarted"
                  onClick={() => setScreen('register')}
                >
                  Get Started!
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
