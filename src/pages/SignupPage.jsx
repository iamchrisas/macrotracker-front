import React, { useState, useContext } from "react";
import authService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must have at least 6 characters and contain one number, one lowercase and one uppercase letter."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(formData);
      navigate("/login");
    } catch (err) {
      console.error("Sign Up Error:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. john@domain.com"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
          {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Signup</button>
      </form>
      <p>
        Already a user? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
