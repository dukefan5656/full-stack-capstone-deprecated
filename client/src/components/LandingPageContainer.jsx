import React from 'react';
import history from '../history';
import LandingNavbar from './LandingNavbarContainer';
import LandingDescription from './LandingDescriptionContainer';

export default function LandingPage(){
  return (
    <div>
    <LandingNavbar />

    <div className="description">
      <LandingDescription />
      <button className="signup" onClick={() => {
          history.push('/signup');}}>
        register
      </button>
      <button className="login" onClick={() => {
          history.push('/login');
      }}>
        login
      </button>
    </div>
    </div>
  )
}

