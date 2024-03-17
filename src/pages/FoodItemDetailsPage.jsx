import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import foodService from "../services/food.service";

function FoodItemDetailsPage() {
  const { id } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    foodService
      .getFoodItem(id)
      .then((response) => {
        setFoodItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food item:", error);
        setError("Failed to fetch food item.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{foodItem.name}</h2>
      <p>Protein: {foodItem.protein}g</p>
      <p>Carbs: {foodItem.carbs}g</p>
      <p>Fat: {foodItem.fat}g</p>
      <p>Calories: {foodItem.calories}</p>
      {foodItem.image && <img src={foodItem.image} alt={foodItem.name} />}
    </div>
  );
}

export default FoodItemDetailsPage;
