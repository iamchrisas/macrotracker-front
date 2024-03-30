import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import foodService from "../services/food.service";

function AddFoodItemPage() {
  const [foodItem, setFoodItem] = useState(() => {
    const now = new Date();
    const localISOTime = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    return {
      name: "",
      protein: 0,
      carbs: 0,
      fat: 0,
      date: localISOTime, // Adjusted to local time
    };
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
      [name]:
        name === "name"
          ? value
          : name === "date"
          ? value
          : parseFloat(value) || 0,
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
      className="glass-effect"
    >
      <div style={{ height: "20px" }}></div>{" "}
      {/* This div creates a gap between sections */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <h3 style={{ textAlign: "center" }}>Log Meal</h3>
        <div style={{ height: "20px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <label className="input input-bordered flex items-center gap-2">
          Meal Name
          <input
            type="text"
            className="grow"
            name="name"
            value={foodItem.name}
            onChange={handleChange}
            required
            placeholder=""
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Protein (g)
          <input
            type="number"
            name="protein"
            value={foodItem.protein}
            onChange={handleChange}
            placeholder="0"
          />
        </label>
        {validationMsg.protein && (
          <div style={{ color: "red" }}>{validationMsg.protein}</div>
        )}
        <label className="input input-bordered flex items-center gap-2">
          Carbs (g)
          <input
            type="number"
            name="carbs"
            value={foodItem.carbs}
            onChange={handleChange}
            placeholder="0"
          />
        </label>
        {validationMsg.carbs && (
          <div style={{ color: "red" }}>{validationMsg.carbs}</div>
        )}
        <label className="input input-bordered flex items-center gap-2">
          Fat (g)
          <input
            type="number"
            name="fat"
            value={foodItem.fat}
            onChange={handleChange}
            placeholder="0"
          />
        </label>
        {validationMsg.fat && (
          <div style={{ color: "red" }}>{validationMsg.fat}</div>
        )}
        <div style={{ height: "20px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <label>Calories: </label>
        <span>{calculateCalories()}</span>
        <div style={{ height: "20px" }}></div>{" "}
        {/* This div creates a gap between sections */}
        <label className="input input-bordered flex items-center gap-2">
          Date
          <input
            type="datetime-local"
            name="date"
            value={foodItem.date}
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
        <button className="btn btn-primary w-full" type="submit">
          Save
        </button>
        <div style={{ height: "30px" }}></div>{" "}
        {/* This div creates a gap between sections */}
      </form>
    </div>
  );
}

export default AddFoodItemPage;
