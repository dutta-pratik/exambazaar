/*******************IMPORTING FILES AND PACKAGES**********************/
import React from "react";
import "../App.css";
import logo from "../logo.svg"

/*******************NAVBAR FUNCTIONAL COMPONENT**********************/
function NavBar () {
    return (
        /*******************RETURNING COMPONENT**********************/
        <div className="navbar">
            <img src={logo} alt="home" className="logo"></img>
        
        </div>
    );
}

 /*******************EXPORTING NAVBAR COMPONENT**********************/
export default NavBar;