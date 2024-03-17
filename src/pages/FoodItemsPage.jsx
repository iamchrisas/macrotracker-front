import React, { useState, useEffect } from "react";
import foodService from "../services/food.service";
import { Link } from "react-router-dom";

function FoodItemsPage() {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    foodService
      .getAllFoodItems()
      .then((response) => {
        setFoodItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
        setError("Failed to fetch food items.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Food Items</h2>
      <ul>
        {foodItems.map((item) => (
          <li key={item._id}>{item.name}</li> // Extend this as needed to include more details
        ))}
      </ul>
    </div>
  );
}

export default FoodItemsPage;
