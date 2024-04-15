import React, { useState } from "react";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import logo from "../assets/logo.png";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src={logo} />
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {signUp ? (
          // If signIn is true, render the Sign In Screen
          <SignUpScreen />
        ) : signIn ? (
          <SignInScreen />
        ) : (
          // Otherwise, render the Sign Up page
          <>
            <h1>Unlimited films, TV series & more!</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create your account.</h3>

            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email" />
                <button
                  className="loginScreen__getStarted"
                  onClick={() => setSignUp(true)}
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
