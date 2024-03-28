import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "10vh" }}
      >
        <span className="loading loading-ring loading-md"></span>
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="flex flex-col items-left"
      style={{ display: "flex", paddingLeft: "50px" }}
    >
      <div className="h-5"></div>{" "}
      {/* This div creates a gap between sections */}
      <h2 className="text-center">Profile</h2>
      <div className="my-5">
        <p>Name: {userProfile.name}</p>
      </div>
      <div className="my-5">
        <p>Email: {userProfile.email}</p>
      </div>
      <div className="my-5">
        <p>Current Weight: {userProfile.currentWeight} kg</p>
      </div>
      <div className="my-5">
        <p>Weight Goal: {userProfile.weightGoal} kg</p>
      </div>
      <div className="my-5">
        <p>Daily Calorie Goal: {userProfile.dailyCalorieGoal} kcal</p>
      </div>
      <div className="my-5">
        <p>Daily Protein Goal: {userProfile.dailyProteinGoal} g</p>
      </div>
      <div className="my-5">
        <p>Daily Carb Goal: {userProfile.dailyCarbGoal} g</p>
      </div>
      <div className="my-5">
        <p>Daily Fat Goal: {userProfile.dailyFatGoal} g</p>
      </div>
      <button
        className="btn btn-ghost my-5"
        onClick={() => navigate("/edit-profile")}
      >
        Edit
      </button>
    </div>
  );
}

export default UserProfilePage;
