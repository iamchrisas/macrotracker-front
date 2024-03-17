import React, { useState, useEffect } from "react";
import reviewService from "../services/review.service";

function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    reviewService
      .getAllReviews()
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch reviews");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id}>
          <h3>{review.food.name}</h3>
          <p>Rating: {review.rate}</p>
        </div>
      ))}
    </div>
  );
}

export default MyReviewsPage;