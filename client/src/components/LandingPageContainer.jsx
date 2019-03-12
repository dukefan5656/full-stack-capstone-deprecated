import React from "react";
import { Link } from "react-router-dom";
import LandingNavbar from "./LandingNavbarContainer";
import LandingDescription from "./LandingDescriptionContainer";
import "./styles/landing-page.css";

export default function LandingPage() {

  return (
    <div className="main" >

      <LandingNavbar />

      <div className="description">
        <LandingDescription />
        <Link to="/signup">Sign-up</Link>
        <Link to="login">Login</Link>
      </div>
      
    </div>
  );
}
