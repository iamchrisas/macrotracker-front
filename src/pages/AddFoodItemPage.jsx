import React, { useState, useEffect } from "react";
import foodService from "../services/food.service";
import { Link } from "react-router-dom";

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

  // Function to calculate calories
  const calculateCalories = () => {
    return foodItem.protein * 4 + foodItem.carbs * 4 + foodItem.fat * 9;
  };

  const validateField = (name, value) => {
    let msg = "";
    if (value < 0) {
      msg = `${name} must be a positive number.`;
    }
    setValidationMsg({ ...validationMsg, [name]: msg });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem({
      ...foodItem,
      [name]: name === "name" ? value : parseFloat(value) || 0,
    });
    if (["protein", "carbs", "fat"].includes(name)) {
      validateField(name, parseFloat(value));
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for validation messages
    const hasError = Object.values(validationMsg).some((msg) => msg !== "");
    if (hasError) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", foodItem.name);
    formData.append("protein", foodItem.protein);
    formData.append("carbs", foodItem.carbs);
    formData.append("fat", foodItem.fat);
    formData.append("calories", calculateCalories()); // Calculate and append calories
    if (file) {
      formData.append("image", file);
    }

    // Call your foodService method to handle the form submission
    foodService
      .addFoodItem(formData)
      .then(() => {
        alert("Food item added successfully!");
        // Reset form state
        setFoodItem({ name: "", protein: 0, carbs: 0, fat: 0 });
        setFile(null);
        setValidationMsg({ protein: "", carbs: "", fat: "" }); // Reset validation messages
      })
      .catch((error) => {
        console.error("Error adding food item:", error);
        alert("Failed to add food item.");
      });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add Food Item</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={foodItem.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Protein (g):</label>
        <input
          type="number"
          name="protein"
          value={foodItem.protein}
          onChange={handleChange}
          required
        />
        {validationMsg.protein && (
          <div style={{ color: "red" }}>{validationMsg.protein}</div>
        )}
      </div>
      <div>
        <label>Carbs (g):</label>
        <input
          type="number"
          name="carbs"
          value={foodItem.carbs}
          onChange={handleChange}
          required
        />
        {validationMsg.carbs && (
          <div style={{ color: "red" }}>{validationMsg.carbs}</div>
        )}
      </div>
      <div>
        <label>Fat (g):</label>
        <input
          type="number"
          name="fat"
          value={foodItem.fat}
          onChange={handleChange}
          required
        />
        {validationMsg.fat && (
          <div style={{ color: "red" }}>{validationMsg.fat}</div>
        )}
      </div>
      <div>
        <label>Calculated Calories:</label>
        <span>{calculateCalories()}</span>
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <button type="submit">Add Food Item</button>
    </form>
  );
}

export default AddFoodItemPage;
