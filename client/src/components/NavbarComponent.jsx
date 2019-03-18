import React from 'react'; 
import {Link} from 'react-router-dom';
import './styles/navbar-style.css';

export default function Navbar() {
    return (
        <div className="navbar-container">
            <h1>Your Move</h1>
        <Link to="/logout" style={{ textDecoration: 'none' }}>
        <div className="button-container">
            
          <p>Logout</p>
          </div>
        </Link>
        

        </div>
    );
}