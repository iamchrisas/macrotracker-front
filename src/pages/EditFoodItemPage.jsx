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
  });
  const [file, setFile] = useState(null);
  const [validationMsg, setValidationMsg] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    foodService
      .getFoodItem(id)
      .then((response) => {
        setFoodItem({
          ...response.data,
          calories: calculateCalories(response.data),
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food item:", error);
        setError("Failed to fetch food item");
        setLoading(false);
      });
  }, [id]);

  const calculateCalories = (item) => {
    return item.protein * 4 + item.carbs * 4 + item.fat * 9;
  };

  const validateField = (name, value) => {
    if (value < 0) {
      setValidationMsg((prevMsg) => ({
        ...prevMsg,
        [name]: `${name} must be a positive number.`,
      }));
      return false;
    }
    setValidationMsg((prevMsg) => ({ ...prevMsg, [name]: "" }));
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "name" ? value : parseFloat(value) || 0;
    if (!validateField(name, updatedValue)) return;

    setFoodItem((prevState) => ({
      ...prevState,
      [name]: updatedValue,
      ...(name === "protein" || name === "carbs" || name === "fat"
        ? {
            calories: calculateCalories({ ...prevState, [name]: updatedValue }),
          }
        : {}),
    }));
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
    Object.entries(foodItem).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append("image", file);
    }

    try {
      await foodService.editFoodItem(id, formData);
      alert("Food item updated successfully");
      navigate(`/foods/${id}`);
    } catch (error) {
      console.error("Error updating food item:", error);
      alert("Failed to update food item.");
    }
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
          <span>{foodItem.calories}</span>
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
