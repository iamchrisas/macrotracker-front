import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; // Ensure this path matches your project structure

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
        marginTop: "20px",
      }}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink
            to="/user-profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/foods"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Meals History
          </NavLink>

          <NavLink to="/" onClick={logOutUser} className="nav-link">
            Logout
          </NavLink>
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
