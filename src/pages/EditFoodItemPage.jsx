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
  const [file, setFile] = useState(null);
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
        setFoodData(response.data); // Assuming response.data has the structure { name, protein, carbs, fat }
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
    if (["protein", "carbs", "fat"].includes(name) && value < 0) {
      msg = `${name} must be a positive number.`;
    }
    setValidationMsg((prevMsg) => ({ ...prevMsg, [name]: msg }));
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      calories: calculateCalories(),
    };

    foodService
      .editFoodItem(id, updatedFoodData)
      .then(() => {
        alert("Food item updated successfully");
        navigate(-1); // Navigate back
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
      <h2>Edit Meal</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Protein (g):</label>
          <input
            type="number"
            name="protein"
            value={foodData.protein}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Carbs (g):</label>
          <input
            type="number"
            name="carbs"
            value={foodData.carbs}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fat (g):</label>
          <input
            type="number"
            name="fat"
            value={foodData.fat}
            onChange={handleChange}
          />
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
        <button type="submit" style={{ marginTop: "20px" }}>
          Save
        </button>
        <button onClick={() => navigate(-1)} style={{ marginTop: "10px" }}>
          Go back
        </button>
      </form>
    </div>
  );
}

export default EditFoodItemPage;
