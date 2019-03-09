import React from 'react'; 
import './styles/navbar-style.css';

export default function Navbar() {
    return (
        <div className="navbar-container">
        <div className="navbar">
            <h1>Some Site Name in component</h1>
        </div>
        <button>
          Logout
        </button>
        </div>
    );
}