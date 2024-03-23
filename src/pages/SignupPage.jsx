import React, { useState, useContext } from "react";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(""); // State to hold sign-up error

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    authService
      .signup(formData)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/users/user-profile");
      })
      .catch((err) => {
        console.error("Sign Up Error:", err);
        setError("Failed to sign up. Please try again."); // Provide user feedback
      });
  };

  return (
    <div>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@domain.com"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </label>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Signup</button>
      </form>
      <p>
        Already a user - <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}

export default Signup;
