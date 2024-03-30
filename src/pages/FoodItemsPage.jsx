import React, { useState, useEffect } from "react";
import foodService from "../services/food.service";
import { useNavigate } from "react-router-dom";

function FoodItemsPage() {
  const [foodItems, setFoodItems] = useState([]);
  const [dailyStats, setDailyStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

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
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - 1
      )
    );

  const goToToday = () => setCurrentDate(new Date());

  const goToNextDay = () =>
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1
      )
    );

  const filteredItems = foodItems
    .filter(
      (item) =>
        new Date(item.date).toDateString() === currentDate.toDateString()
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

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
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="grid h-10 card bg-base-300 rounded-box place-items-center">
          <div style={{ display: "flex", gap: "50px" }}>
            <button onClick={goToPreviousDay}>
              {" "}
              <kbd className="kbd">◀︎</kbd>{" "}
            </button>
            <button onClick={goToToday} style={{ textAlign: "center" }}>
              {formatDate(currentDate)}
            </button>
            <button onClick={goToNextDay}>
              <kbd className="kbd">▶︎</kbd>
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: "35px" }}></div>{" "}
      {/* This div creates a gap between sections */}
      {/* STATS */}
      {dailyStats && (
        <div
          className="stats shadow p-2 sm:p-4 mx-auto"
          style={{
            maxWidth: "500px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="stat flex flex-col gap-1 sm:gap-2 sm:flex-row">
            <div className="w-full">
              <div className="stat-title mb-1">Calories</div>
              <div className="flex flex-col">
                <div className="stat-value text-xs sm:text-base mb-2">
                  {dailyStats.totals.calories} / {dailyStats.goals.calories}
                </div>
                <div className="stat-desc badge badge-warning ">
                  {dailyStats.remaining.calories}
                </div>
              </div>
            </div>
          </div>

          <div className="stat flex flex-col gap-1 sm:gap-2 sm:flex-row">
            <div className="w-full">
              <div className="stat-title mb-1">Protein</div>
              <div className="flex flex-col">
                <div className="stat-value text-xs sm:text-base mb-2">
                  {dailyStats.totals.protein} / {dailyStats.goals.protein}
                </div>
                <div className="stat-desc badge badge-error">
                  {dailyStats.remaining.protein}
                </div>
              </div>
            </div>
          </div>

          <div className="stat flex flex-col gap-1 sm:gap-2 sm:flex-row">
            <div className="w-full">
              <div className="stat-title mb-1">Carbs</div>
              <div className="flex flex-col">
                <div className="stat-value text-xs sm:text-base mb-2">
                  {dailyStats.totals.carbs} / {dailyStats.goals.carbs}
                </div>
                <div className="stat-desc badge badge-info">
                  {dailyStats.remaining.carbs}
                </div>
              </div>
            </div>
          </div>

          <div className="stat flex flex-col gap-1 sm:gap-2 sm:flex-row">
            <div className="w-full">
              <div className="stat-title mb-1">Fat</div>
              <div className="flex flex-col">
                <div className="stat-value text-xs sm:text-base mb-2">
                  {dailyStats.totals.fat} / {dailyStats.goals.fat}
                </div>
                <div className="stat-desc badge badge-accent">
                  {dailyStats.remaining.fat}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* STATS */}
      <div style={{ height: "20px" }}></div>{" "}
      {/* This div creates a gap between sections */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul style={{ listStyle: "none", padding: "10px" }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item._id}
                className="card w-96 shadow-xl"
                style={{ marginBottom: "50px" }}
              >
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <p
                      className="badge badge-ghost"
                      style={{
                        marginBottom: "10px",
                        whiteSpace: "nowrap",
                        alignSelf: "flex-start",
                      }}
                    >
                      {new Date(item.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p
                      className="card-title"
                      style={{
                        fontSize: "16px",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      fontSize: "18px",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span>{item.calories} 🔥</span>
                    <span>{item.protein} P</span>
                    <span>{item.carbs} C</span>
                    <span>{item.fat} F</span>
                  </div>
                  {item.image && (
                    <figure style={{ display: "flex", marginBottom: "10px" }}>
                      <img src={item.image} alt={item.name} />
                    </figure>
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      className="btn btn-xs gap-1"
                      onClick={() => navigate(`/foods/${item._id}`)}
                    >
                      info
                    </button>
                    <button
                      className="btn btn-outline btn-xs gap-1"
                      onClick={() => navigate(`/foods/edit-food/${item._id}`)}
                    >
                      edit
                    </button>
                  </div>
                </div>
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
