import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";

function EditUserProfilePage() {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userService.getUserProfile();
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user profile.");
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.editUserProfile(formData);
      alert("Profile updated successfully!");
      navigate("/user-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
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
      <h2>Edit Profile</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        {Object.entries(formData).map(
          ([key, value]) =>
            key !== "calories" && (
              <div key={key} style={{ marginBottom: "20px" }}>
                <label>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </label>
                <input
                  type={
                    key.includes("Goal") || key === "currentWeight"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                />
              </div>
            )
        )}
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
