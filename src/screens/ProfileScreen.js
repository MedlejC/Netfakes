import React from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import avatar from "../assets/avatar.png";
import stripe from "../assets/Stripe-logo.png";
import PlansScreen from "./PlansScreen";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <div className="profileScreen__nav">
        <Nav />
      </div>
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img src={avatar} />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <div className="profileScreen__plansTitle">
                <h3>Plans</h3>
                <div className="profileScreen__plansLogo">
                  <h4>Powered By</h4>
                  <img src={stripe} />
                </div>
              </div>

              <PlansScreen />
              <button
                className="profileScreen__signOut"
                onClick={() => signOut(auth)}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
