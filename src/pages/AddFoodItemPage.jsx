import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import foodService from "../services/food.service";

function AddFoodItemPage() {
  const [foodItem, setFoodItem] = useState({
    name: "",
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [file, setFile] = useState(null);
  const [validationMsg, setValidationMsg] = useState({
    protein: "",
    carbs: "",
    fat: "",
  });

  const navigate = useNavigate();

  const calculateCalories = () => {
    return foodItem.protein * 4 + foodItem.carbs * 4 + foodItem.fat * 9;
  };

  const validateField = (name, value) => {
    const msg = value < 0 ? `${name} must be a positive number.` : "";
    setValidationMsg((prevMsg) => ({ ...prevMsg, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem((prevItem) => ({
      ...prevItem,
      [name]: name === "name" ? value : parseFloat(value) || 0,
    }));
    if (["protein", "carbs", "fat"].includes(name)) {
      validateField(name, parseFloat(value));
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(validationMsg).some((msg) => msg !== "")) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const formData = new FormData();
    Object.entries(foodItem).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("calories", calculateCalories());
    if (file) {
      formData.append("image", file);
    }

    try {
      await foodService.addFoodItem(formData);
      alert("Food item added successfully!");
      setFoodItem({ name: "", protein: 0, carbs: 0, fat: 0 });
      setFile(null);
      setValidationMsg({ protein: "", carbs: "", fat: "" });
    } catch (error) {
      console.error("Error adding food item:", error);
      alert("Failed to add food item.");
    }
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
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h3 style={{ textAlign: "center" }}>Log Meal</h3>
        <div style={{ marginBottom: "20px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={foodItem.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Protein (g):</label>
          <input
            type="number"
            name="protein"
            value={foodItem.protein}
            onChange={handleChange}
          />
          {validationMsg.protein && (
            <div style={{ color: "red" }}>{validationMsg.protein}</div>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Carbs (g):</label>
          <input
            type="number"
            name="carbs"
            value={foodItem.carbs}
            onChange={handleChange}
          />
          {validationMsg.carbs && (
            <div style={{ color: "red" }}>{validationMsg.carbs}</div>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Fat (g):</label>
          <input
            type="number"
            name="fat"
            value={foodItem.fat}
            onChange={handleChange}
          />
          {validationMsg.fat && (
            <div style={{ color: "red" }}>{validationMsg.fat}</div>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>Calories:</label>
          <span>{calculateCalories()}</span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>
          Save
        </button>
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      </form>
    </div>
  );
}

export default AddFoodItemPage;
