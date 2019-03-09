import React from 'react'; 
import {Link} from 'react-router-dom';
import './styles/navbar-style.css';

export default function Navbar() {
    return (
        <div className="navbar-container">
        <div className="navbar">
            <h1>Your Move</h1>
        </div>
        <Link to="/logout"><button>
          Logout
        </button>
        </Link>
        </div>
    );
}