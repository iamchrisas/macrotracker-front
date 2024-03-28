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
      }}
    >
      <div style={{ height: "20px" }}></div>{" "}
      {/* This div creates a gap between sections */}
      <h2 className="text-center">Metrics</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md"
        encType="multipart/form-data"
      >
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Current Weight (kg)
            <input
              type="number"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Weight Goal (kg)
            <input
              type="number"
              name="weightGoal"
              value={formData.weightGoal}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Daily Calorie Goal (kcal)
            <input
              type="number"
              name="dailyCalorieGoal"
              value={formData.dailyCalorieGoal}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Daily Protein Goal (g)
            <input
              type="number"
              name="dailyProteinGoal"
              value={formData.dailyProteinGoal}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Daily Carb Goal (g)
            <input
              type="number"
              name="dailyCarbGoal"
              value={formData.dailyCarbGoal}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            Daily Fat Goal (g)
            <input
              type="number"
              name="dailyFatGoal"
              value={formData.dailyFatGoal}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-success my-5">
          Save
        </button>
      </form>
      <button
        onClick={() => navigate("/user-profile")}
        className="btn btn-ghost my-2"
      >
        Go back
      </button>
    </div>
  );
}

export default EditUserProfilePage;
