import React, { useRef } from "react";
import "./RegisterScreen.css";
import { auth } from "../firebase";

function RegisterScreen({ email }) {
  // Reference to a field: it's like a finger pointing to an HTML element
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    // Any time a button is inside a form, it typically refreshes.
    // To prevent that:
    e.preventDefault();

    // Pass in the email and password entered in the form
    auth
      .createUserWithEmailAndPassword(
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
        <input placeholder="Email" type="email" value={email} ref={emailRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterScreen;
