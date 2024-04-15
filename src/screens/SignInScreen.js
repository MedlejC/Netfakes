import React, { useRef } from "react";
import "./SignInScreen.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function SignInScreen({ setScreen }) {
  // Reference to a field: it's like a finger pointing to an HTML element
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    // Any time a button is inside a form, it typically refreshes.
    // To prevent that:
    e.preventDefault();
    setScreen("register");
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="signInScreen">
      <form>
        <h1>Sign In</h1>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signInScreen__gray">New to Netfakes? </span>
          <span className="signInScreen__register" onClick={register}>
            Register now!
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
