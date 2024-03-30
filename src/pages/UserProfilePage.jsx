import React, { useState, useEffect, useContext } from "react";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function UserProfilePage() {
  const { logOutUser } = useContext(AuthContext);
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

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

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
      className="flex flex-col items-left glass-effect"
      style={{ display: "flex" }}
    >
      <div className="h-5"></div>{" "}
      {/* This div creates a gap between sections */}
      <h2 className="text-center">Profile</h2>
      <div className="my-2 pl-12">
        <p>Name: {userProfile.name}</p>
      </div>
      <div className="my-2 pl-12">
        <p>Email: {userProfile.email}</p>
      </div>
      <div className="my-2 pl-12">
        <p>Current Weight: {userProfile.currentWeight} kg</p>
      </div>
      <div className="my-2 pl-12">
        <p>Weight Goal: {userProfile.weightGoal} kg</p>
      </div>
      <div className="my-2 pl-12">
        <p>Daily Calorie Goal: {userProfile.dailyCalorieGoal} kcal</p>
      </div>
      <div className="my-2 pl-12">
        <p>Daily Protein Goal: {userProfile.dailyProteinGoal} g</p>
      </div>
      <div className="my-2 pl-12">
        <p>Daily Carb Goal: {userProfile.dailyCarbGoal} g</p>
      </div>
      <div className="my-2 pl-12">
        <p>Daily Fat Goal: {userProfile.dailyFatGoal} g</p>
      </div>
      <div className="flex flex-col items-center justify-center">
  <button
    className="btn btn-base-100 my-2 w-20"
    onClick={() => navigate("/edit-profile")}
  >
    Edit
  </button>
  <button className="btn btn-ghost my-2 w-20 mb-5" onClick={handleLogout}>
    Logout
  </button>
</div>
    </div>
  );
}

export default UserProfilePage;
