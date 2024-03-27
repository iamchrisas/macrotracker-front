import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import foodService from "../services/food.service";

function EditFoodItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState({
    name: "",
    protein: 0,
    carbs: 0,
    fat: 0,
    date: "",
  });
  const [file, setFile] = useState(null);
  const [validationMsg, setValidationMsg] = useState({
    protein: "",
    carbs: "",
    fat: "",
  });

  const [changedFields, setChangedFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    foodService
      .getFoodItem(id)
      .then((response) => {
        setFoodItem({
          ...response.data.foodItem,
          calories: calculateCalories(response.data.foodItem),
          date: response.data.foodItem.date.slice(0, 16), // Format the date for datetime-local input if necessary
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food item:", error);
        setError("Failed to fetch food item");
        setLoading(false);
      });
  }, [id]);

  // Function to calculate calories
  const calculateCalories = (item) => {
    return item.protein * 4 + item.carbs * 4 + item.fat * 9;
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
    const updatedValue =
      name === "name"
        ? value
        : name === "date"
        ? value
        : parseFloat(value) || 0;
    const updatedFoodItem = { ...foodItem, [name]: updatedValue };

    if (["protein", "carbs", "fat"].includes(name)) {
      updatedFoodItem.calories = calculateCalories(updatedFoodItem);
      setChangedFields({ ...changedFields, [name]: true, calories: true });
    } else {
      setChangedFields({ ...changedFields, [name]: true });
    }

    setFoodItem(updatedFoodItem);
    validateField(name, updatedValue);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setChangedFields({ ...changedFields, image: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = Object.values(validationMsg).some((msg) => msg !== "");
    if (hasError) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const formData = new FormData();
    Object.keys(changedFields).forEach((field) => {
      if (field === "image" && file) {
        formData.append("image", file);
      } else if (field !== "image") {
        formData.append(field, foodItem[field]);
      }
    });

    foodService
      .editFoodItem(id, formData)
      .then(() => {
        alert("Food item updated successfully");
        navigate(`/foods/${id}`);
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
            value={foodItem.name}
            onChange={handleChange}
          />
        </div>
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label>Calories: </label>
          <span>{foodItem.calories}</span>{" "}
        </div>
        <div>
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="date"
            value={foodItem.date.slice(0, 16)} // Slice to fit the datetime-local format if necessary
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
      </form>
      <button onClick={() => navigate(-1)} style={{ marginTop: "10px" }}>
        Go back
      </button>
    </div>
  );
}
export default EditFoodItemPage;
