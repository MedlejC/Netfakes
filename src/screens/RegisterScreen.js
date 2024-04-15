import React, { useRef } from "react";
import "./RegisterScreen.css";

function RegisterScreen({ email }) {
  // Reference to a field: it's like a finger pointing to an HTML element
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    // Any time a button is inside a form, it typically refreshes.
    // To prevent that:
    e.preventDefault();
  };

  return (
    <div className="registerScreen">
      <form>
        <h1>Create Your Account</h1>
        <input placeholder="Email" type="email" value={email} />
        <input placeholder="Password" type="password" />
        <button type="submit" onClick={register}>Register</button>
      </form>
    </div>
  );
}

export default RegisterScreen;
