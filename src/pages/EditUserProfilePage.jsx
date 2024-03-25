import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";


function EditUserProfilePage() {
  const [formData, setFormData] = useState({
    currentWeight: "",
    weightGoal: "",
    dailyCalorieGoal: "",
    dailyProteinGoal: "",
    dailyCarbGoal: "",
    dailyFatGoal: "",
  });
  const navigate = useNavigate();


  useEffect(() => {
    userService
      .getUserProfile()
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user profile.");
      });
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    userService
      .editUserProfile(formData)
      .then(() => {
        alert("Profile updated successfully!");
        navigate("/user-profile");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <h2>Profile</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        {" "}
        <div style={{ marginBottom: "20px" }}>
          <label>Current Weight (kg):</label>
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Weight Goal (kg):</label>
          <input
            type="number"
            name="weightGoal"
            value={formData.weightGoal}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Daily Calorie Goal (kcal):</label>
          <input
            type="number"
            name="dailyCalorieGoal"
            value={formData.dailyCalorieGoal}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Daily Protein Goal (g):</label>
          <input
            type="number"
            name="dailyProteinGoal"
            value={formData.dailyProteinGoal}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Daily Carb Goal (g):</label>
          <input
            type="number"
            name="dailyCarbGoal"
            value={formData.dailyCarbGoal}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Daily Fat Goal (g):</label>
          <input
            type="number"
            name="dailyFatGoal"
            value={formData.dailyFatGoal}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>
          Update Profile
        </button>
      </form>
      <button
        onClick={() => navigate("/user-profile")}
        style={{ marginTop: "10px" }}
      >
        Go back
      </button>
    </div>
  );
}

export default EditUserProfilePage;
