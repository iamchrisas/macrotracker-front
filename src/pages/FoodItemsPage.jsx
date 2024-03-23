import React, { useState, useEffect } from "react";
import foodService from "../services/food.service";
import { Link } from "react-router-dom";

function FoodItemsPage() {
  const [foodItems, setFoodItems] = useState([]);
  const [dailyStats, setDailyStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part to compare dates only

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // Set to yesterday

    if (date.setHours(0, 0, 0, 0) === today.getTime()) {
      return "Today";
    } else if (date.setHours(0, 0, 0, 0) === yesterday.getTime()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-EN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    const formattedDate = currentDate.toISOString().split("T")[0];
    const fetchFoodItems = foodService.getAllFoodItems();
    const fetchDailyStats = foodService.getDailyStats(formattedDate);

    Promise.all([fetchFoodItems, fetchDailyStats])
      .then(([foodResponse, statsResponse]) => {
        setFoodItems(foodResponse.data);
        setDailyStats(statsResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [currentDate]);

  const goToPreviousDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const filteredItems = foodItems.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate.toDateString() === currentDate.toDateString();
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>{formatDate(currentDate)}</h2>
        <div style={{ display: "flex", gap: "15px" }}>
          {" "}
          <button onClick={goToPreviousDay}>Previous day</button>
          <button onClick={goToToday}>Today</button>
          <Link to="/add-food">
            <button>Log meal</button>
          </Link>
        </div>
      </div>
      {/* STATS */}
      {dailyStats ? (
        <div style={{ display: "flex", textAlign: "center", gap: "0px" }}>
          <p>
            {dailyStats.totals.calories} / {dailyStats.goals.calories} (
            {dailyStats.remaining.calories}) 🔥
          </p>
          <p>
            {dailyStats.totals.protein} / {dailyStats.goals.protein} (
            {dailyStats.remaining.protein}) P
          </p>
          <p>
            {dailyStats.totals.carbs} / {dailyStats.goals.carbs} (
            {dailyStats.remaining.carbs}) C
          </p>
          <p>
            {dailyStats.totals.fat} / {dailyStats.goals.fat} F (
            {dailyStats.remaining.fat}) F
          </p>
        </div>
      ) : (
        <p>No stats available for this day.</p>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul style={{ listStyle: "none", padding: 10 }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item._id}
                style={{ textAlign: "center", marginBottom: "20px" }}
              >
                {" "}
                {/* Adjusted line */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <h3 style={{ margin: 0 }}>{item.name}</h3>
                  <p style={{ margin: 0 }}>
                    {new Date(item.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <span>{item.calories} 🔥</span>
                  <span>{item.protein} P</span>
                  <span>{item.carbs} C</span>
                  <span>{item.fat} F</span>
                </div>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      maxWidth: "300px",
                      maxHeight: "300px",
                      marginTop: "15px",
                    }}
                  />
                )}
                {/* BUTTONS */}
                <button style={{ marginLeft: "10px" }}>
                  <Link to={`/foods/${item._id}`}>Details</Link>
                </button>
                <button style={{ marginLeft: "10px" }}>
                  <Link to={`/foods/edit-food/${item._id}`}>Edit</Link>
                </button>
              </li>
            ))
          ) : (
            <p>Click on "log meal" to track today's meals.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FoodItemsPage;
