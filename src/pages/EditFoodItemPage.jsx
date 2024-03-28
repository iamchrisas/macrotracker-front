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
          date: response.data.foodItem.date.slice(0, 16),
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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "20px" }}></div>{" "}
      {/* This div creates a gap between sections */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h2 style={{ textAlign: "center" }}>Edit Meal</h2>
        <div style={{ height: "20px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <label className="input input-bordered flex items-center gap-2">
          Name:
          <input
            type="text"
            className="grow"
            name="name"
            value={foodItem.name}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Protein (g):
          <input
            type="number"
            name="protein"
            value={foodItem.protein}
            onChange={handleChange}
          />
        </label>
        {validationMsg.protein && (
          <div style={{ color: "red" }}>{validationMsg.protein}</div>
        )}
        <label className="input input-bordered flex items-center gap-2">
          Carbs (g):
          <input
            type="number"
            name="carbs"
            value={foodItem.carbs}
            onChange={handleChange}
          />
        </label>
        {validationMsg.carbs && (
          <div style={{ color: "red" }}>{validationMsg.carbs}</div>
        )}
        <label className="input input-bordered flex items-center gap-2">
          Fat (g):
          <input
            type="number"
            name="fat"
            value={foodItem.fat}
            onChange={handleChange}
          />
        </label>
        {validationMsg.fat && (
          <div style={{ color: "red" }}>{validationMsg.fat}</div>
        )}
        <div style={{ height: "20px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <div>
          <label>Calories: </label>
          <span>{foodItem.calories}</span>
        </div>
        <div style={{ height: "20px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <label className="input input-bordered flex items-center gap-2">
          Date and Time:
          <input
            type="datetime-local"
            name="date"
            value={foodItem.date.slice(0, 16)}
            onChange={handleChange}
          />
        </label>
        <div style={{ height: "20px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <label
          htmlFor="image"
          className="input input-bordered flex items-center gap-2"
        >
          Photo
          <input
            id="image"
            type="file"
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
        <div style={{ height: "30px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
      <button className="btn btn-ghost" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
}
export default EditFoodItemPage;
