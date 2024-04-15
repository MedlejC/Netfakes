import React from "react";
import "./SignInScreen.css";

function SignInScreen() {
    const register = (e) => {
        // Any time a button is inside a form, it typically refreshes.
        // To prevent that:
        e.preventDefault(); 
    }

    const signIn = (e) => {
        e.preventDefault();
    }
  return (
    <div className="signInScreen">
      <form>
        <h1>Sign In</h1>
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>Sign In</button>
        <h4>
          <span className="signInScreen__gray">New to Netfakes? </span>
          <span className="signInScreen__register" onClick={register}>Register now!</span>
          
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
