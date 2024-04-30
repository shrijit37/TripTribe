import { useState } from "react";
import "./navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";


const Navbar = () => {
  const login = true;
  const user = "Shrijit";

  return (
    <>
      <div className="row2">
          <h1 className="logo" cairo-play-logo>Trip Tribe</h1>
          <div className="header-btn-container">
            <button className="header-btn" >HOME</button>
            <button className="header-btn">Reviews</button>
            <button className="header-btn">Contact Us</button>
          </div>
          <div className="login-btn-container">
            {/* google sign in  */}
            {login ? (
              <>
                <Chip
                  avatar={<Avatar>{`${user[0]}`}</Avatar>}
                  label={`${user}`}
                  clickable
                  sx={{ fontSize: "1rem", height: "50px", width: "150px",backgroundColor: "blue",color:"white"}}
                  onClick={() => console.log("shrijit")}
                />
              </>
            ) : (
              <button className="login-btn">Sign-up</button>
            )}
          </div>
      </div>
    </>
  );
};

export default Navbar;
