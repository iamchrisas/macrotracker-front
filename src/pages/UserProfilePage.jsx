import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import { Link } from "react-router-dom";

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    currentWeight: "",
    weightGoal: "",
    dailyCalorieGoal: "",
    dailyProteinGoal: "",
    dailyCarbGoal: "",
    dailyFatGoal: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userService.getUserProfile();
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h2>Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Current Weight: {userProfile.currentWeight} kg</p>
      <p>Weight Goal: {userProfile.weightGoal} kg</p>
      <p>Daily Calorie Goal: {userProfile.dailyCalorieGoal} kcal</p>
      <p>Daily Protein Goal: {userProfile.dailyProteinGoal} g</p>
      <p>Daily Carb Goal: {userProfile.dailyCarbGoal} g</p>
      <p>Daily Fat Goal: {userProfile.dailyFatGoal} g</p>
      <button style={{ marginTop: "20px" }}>
        <Link to="/edit-profile">Edit Profile</Link>
      </button>
    </div>
  );
}

export default UserProfilePage;