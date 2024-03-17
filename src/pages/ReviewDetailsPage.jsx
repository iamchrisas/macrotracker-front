import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import reviewService from "../services/review.service";

function ReviewDetailsPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    reviewService
      .getReviewById(id)
      .then((response) => {
        setReview(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch review");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!review) return <div>Review not found</div>;

  return (
    <div>
      <h2>Review Details</h2>
      <p>Food: {review.food.name}</p>
      <p>Rating: {review.rate}</p>
    </div>
  );
}

export default ReviewDetailsPage;