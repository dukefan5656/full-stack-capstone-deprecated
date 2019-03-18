import React from 'react';
import Navbar from "./NavbarComponent";
import {Link} from "react-router-dom";

export default function NoListing(){
  return(
    <section>
  <Navbar />
  <h1>Listing does not exist</h1>
   <Link to="/profile"><button>Go Back To Profile</button></Link>
   </section>
  )
}