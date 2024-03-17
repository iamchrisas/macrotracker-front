import React, { useState, useEffect } from 'react';
import userService from '../services/user.service'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

function DailyStatsPage() {
  const [dailyStats, setDailyStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    userService.getDailyStats()
      .then(response => {
        setDailyStats(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching daily stats:", error);
        setError('Failed to fetch daily stats');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Daily Stats</h1>
      {dailyStats && (
        <div>
          <h2>Totals</h2>
          <p>Protein: {dailyStats.totals.protein}g</p>
          <p>Carbs: {dailyStats.totals.carbs}g</p>
          <p>Fat: {dailyStats.totals.fat}g</p>
          <p>Calories: {dailyStats.totals.calories}</p>
          <h2>Remaining Goals</h2>
          <p>Protein: {dailyStats.remaining.protein}g</p>
          <p>Carbs: {dailyStats.remaining.carbs}g</p>
          <p>Fat: {dailyStats.remaining.fat}g</p>
          <p>Calories: {dailyStats.remaining.calories}</p>
        </div>
      )}
    </div>
  );
}

export default DailyStatsPage;