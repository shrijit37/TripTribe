import React from "react";
import "./navbar.css";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom"


const Navbar = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  return (
    <>
      <div className="row2">
        <h1 className="logo" cairo-play-logo><a href="/">Trip Tribe</a></h1>
        <div className="header-btn-container">
          <button className="header-btn"><a href="/">Home</a></button>
          <button className="header-btn" href="/review"><a href="/review">Reviews</a></button>
          <button className="header-btn">Contact Us</button>
        </div>
        <div className="login-btn-container">
          {/* google sign in  */}
          {userInfo ? (
            <a href="/profile">
              <Chip
              avatar={<Avatar>{`${userInfo.fname[0]}`}</Avatar>}
              label={`${userInfo.fname}`}
              clickable
              sx={{ fontSize: "1rem", height: "50px", width: "150px", backgroundColor: "blue", color: "white" }}
              onClick={() => console.log("User profile clicked")}
            />
            </a>)
             : (
            <button className="login-btn">Sign-up</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;


/**
 * 
 * home : /
 * review : /review
 * chip:/profile
**/ 