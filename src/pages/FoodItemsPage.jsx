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
    today.setHours(0, 0, 0, 0);
    if (date.setHours(0, 0, 0, 0) === today.getTime()) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-EN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    }
  };

  const goToPreviousDay = () =>
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));

  const goToToday = () => setCurrentDate(new Date());

  const goToNextDay = () =>
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));

  const filteredItems = foodItems.filter(
    (item) => new Date(item.date).toDateString() === currentDate.toDateString()
  );

  async function fetchDailyStats(date) {
    try {
      // Get the user's current time zone offset in minutes
      const tzOffset = new Date().getTimezoneOffset();

      // Adjust the date by the time zone offset to ensure it represents the correct day
      // Note: getTimezoneOffset() returns the difference in minutes, so convert it to milliseconds
      const adjustedDate = new Date(date.getTime() - tzOffset * 60000);

      // Now format the adjusted date to an ISO string
      const formattedDate = adjustedDate.toISOString();

      // Include both the date and the time zone offset in the request
      const response = await foodService.getDailyStats(formattedDate, tzOffset);

      setDailyStats(response.data);
    } catch (error) {
      console.error("Failed to fetch daily stats:", error);
    }
  }

  useEffect(() => {
    let isMounted = true; // Flag to track mount status

    const fetchData = async () => {
      try {
        setLoading(true);
        const foodResponse = await foodService.getAllFoodItems();
        if (isMounted) setFoodItems(foodResponse.data);
        await fetchDailyStats(currentDate);
      } catch (error) {
        console.error("Error:", error);
        if (isMounted) setError("Failed to fetch data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [currentDate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <button onClick={goToNextDay}>Next day</button>
          <Link to="/add-food">
            <button>Log meal</button>
          </Link>
        </div>
      </div>
      {/* STATS */}
      {dailyStats && (
        <div style={{ display: "flex", textAlign: "center", gap: "0px" }}>
          <p>
            Calories: {dailyStats.totals.calories} / {dailyStats.goals.calories}{" "}
            (Remaining: {dailyStats.remaining.calories}) 🔥
          </p>
          <p>
            Protein: {dailyStats.totals.protein} / {dailyStats.goals.protein}{" "}
            (Remaining: {dailyStats.remaining.protein}) P
          </p>
          <p>
            Carbs: {dailyStats.totals.carbs} / {dailyStats.goals.carbs}{" "}
            (Remaining: {dailyStats.remaining.carbs}) C
          </p>
          <p>
            Fat: {dailyStats.totals.fat} / {dailyStats.goals.fat} (Remaining:{" "}
            {dailyStats.remaining.fat}) F
          </p>
        </div>
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
