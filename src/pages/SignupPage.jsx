import React, { useState, useContext } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center my-5">
      <h3 className="text-center">Signup</h3>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
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
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
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
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
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
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="btn btn-success my-5">
          Signup
        </button>
      </form>
      <p>
        Already a user?{" "}
        <button onClick={() => navigate("/login")} className="btn btn-ghost">
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
