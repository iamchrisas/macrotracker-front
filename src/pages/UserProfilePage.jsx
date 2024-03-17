import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import { Link } from "react-router-dom";

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    username: "",
    dailyCalorieGoal: 0,
    dailyProteinGoal: 0,
    dailyCarbGoal: 0,
    dailyFatGoal: 0,
    weight: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    userService
      .getUserProfile()
      .then((response) => {
        setUserProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Username: {userProfile.username}</p>
      <p>Daily Calorie Goal: {userProfile.dailyCalorieGoal}</p>
      <p>Daily Protein Goal: {userProfile.dailyProteinGoal}g</p>
      <p>Daily Carb Goal: {userProfile.dailyCarbGoal}g</p>
      <p>Daily Fat Goal: {userProfile.dailyFatGoal}g</p>
      <p>Weight: {userProfile.weight} kg</p>
      <Link to="/edit-profile">Edit Profile</Link>
    </div>
  );
}

export default UserProfilePage;
