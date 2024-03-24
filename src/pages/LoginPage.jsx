import React, { useState, useContext } from "react";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(formData);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/user-profile");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Failed to login. Please check your email and password.");
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Not a user? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;