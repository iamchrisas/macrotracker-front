import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; // Ensure this path matches your project structure

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <img id="home-icon" src="./src/assets/home-icon.png" alt="Home" />
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink
            to="/user-profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            User Profile
          </NavLink>
          <button onClick={logOutUser} className="nav-link">
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Signup
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
