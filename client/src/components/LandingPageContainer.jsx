import React from "react";
import LandingNavbar from "./LandingNavbarContainer";
import LandingDescription from "./LandingDescriptionContainer";
import "./styles/landing-page.css";

export default function LandingPage() {

  return (
    <div className="main" >

      <LandingNavbar />

      <div className="description">
        <LandingDescription />
      </div>
      
    </div>
  );
}
