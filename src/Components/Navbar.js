import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/profile">
        <button className="profile-button">Profile</button>
      </Link>
      <Link to="/login">
        <button className="login-button">Login</button>
      </Link>
    </nav>
  );
};

export default Navbar;
