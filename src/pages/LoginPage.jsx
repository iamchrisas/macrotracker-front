import React, { useState, useContext } from "react";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

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
    authService
      .login(formData)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/user-profile");
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setError("Failed to login. Please check your email and password.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center my-5 glass-effect py-4">
      <h3 className="text-center">Login</h3>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Email:
            <input
              type="email"
              name="email"
              placeholder="e.g. john@domain.com"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Password:
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn btn-primary w-full my-5">
          Login
        </button>
      </form>
      <p>
        Not a user?{" "}
        <button onClick={() => navigate("/signup")} className="btn btn-ghost">
          Signup
        </button>
      </p>
    </div>
  );
}

export default Login;
