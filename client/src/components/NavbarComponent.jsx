import React from 'react'; 
import './styles/navbar-style.css';

export default function Navbar() {
    return (
        <div className="navbar-container">
        <banner className="navbar">
            <h1>Some Site Name in component</h1>
        </banner>
        <button>
          Logout
        </button>
        </div>
    );
}