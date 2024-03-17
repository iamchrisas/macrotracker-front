import React, { useState, useEffect } from "react";
import userService from "../services/user.service";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

function WeeklyStatsPage() {
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const startDate = format(startOfWeek(new Date()), "yyyy-MM-dd");
    const endDate = format(endOfWeek(new Date()), "yyyy-MM-dd");

    userService
      .getWeeklyStats(startDate, endDate)
      .then((response) => {
        setWeeklyStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weekly stats:", error);
        setError("Failed to fetch weekly stats");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const daysOfWeek = eachDayOfInterval({
    start: new Date(startOfWeek(new Date())),
    end: new Date(endOfWeek(new Date())),
  });

  // Function to find stats for a specific day
  const findStatsForDay = (day) => {
    const formattedDay = format(day, "yyyy-MM-dd");
    return weeklyStats.find((stat) => stat.date === formattedDay);
  };

  return (
    <div>
      <h1>Weekly Stats</h1>
      {daysOfWeek.map((day) => {
        const dayStats = findStatsForDay(day);
        return (
          <div key={format(day, "yyyy-MM-dd")}>
            <h2>{format(day, "EEEE, MMMM d")}</h2>
            {dayStats ? (
              <ul>
                <li>Protein: {dayStats.protein}g</li>
                <li>Carbs: {dayStats.carbs}g</li>
                <li>Fat: {dayStats.fat}g</li>
                <li>Calories: {dayStats.calories}</li>
              </ul>
            ) : (
              <p>No stats available for this day.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyStatsPage;
