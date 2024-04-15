import React, { useRef, useState } from "react";
import "./RegisterScreen.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterScreen({ email }) {
  const [emailValue, setEmailValue] = useState(email);

  // Reference to a field: it's like a finger pointing to an HTML element
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    // Any time a button is inside a form, it typically refreshes.
    // To prevent that:
    e.preventDefault();

    // Pass in the email and password entered in the form
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="registerScreen">
      <form>
        <h1>Create Your Account</h1>
        <input
          placeholder="Email"
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          ref={emailRef}
        />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterScreen;
