import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import foodService from "../services/food.service";

function EditFoodItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    name: "",
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [validationMsg, setValidationMsg] = useState({
    protein: "",
    carbs: "",
    fat: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    foodService
      .getFoodItem(id)
      .then((response) => {
        setFoodData({
          name: response.data.name,
          protein: response.data.protein,
          carbs: response.data.carbs,
          fat: response.data.fat,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food item:", error);
        setError("Failed to fetch food item");
        setLoading(false);
      });
  }, [id]);

  const validateField = (name, value) => {
    let msg = "";
    if (value < 0) {
      msg = `${name} must be a positive number.`;
    }
    setValidationMsg({ ...validationMsg, [name]: msg });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
    validateField(name, parseFloat(value));
  };

  const calculateCalories = () => {
    return foodData.protein * 4 + foodData.carbs * 4 + foodData.fat * 9;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = Object.values(validationMsg).some((msg) => msg !== "");
    if (hasError) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const updatedFoodData = {
      ...foodData,
      calories: calculateCalories(), // Calculate calories based on macros
    };

    foodService
      .editFoodItem(id, updatedFoodData)
      .then(() => {
        alert("Food item updated successfully");
        navigate("/foods"); // Adjust the path as needed
      })
      .catch((error) => {
        console.error("Error updating food item:", error);
        alert("Failed to update food item.");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Food Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for name, protein, carbs, and fat */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Protein (g):</label>
          <input
            type="number"
            name="protein"
            value={foodData.protein}
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
            value={foodData.carbs}
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
            value={foodData.fat}
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
        <button type="submit">Update Food Item</button>
      </form>
    </div>
  );
}

export default EditFoodItemPage;
