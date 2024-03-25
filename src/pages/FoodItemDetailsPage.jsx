import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import foodService from "../services/food.service";
import reviewService from "../services/review.service";
import AddReviewPage from "./AddReviewPage";

function FoodItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFoodItemForReview, setSelectedFoodItemForReview] =
    useState(null);

  useEffect(() => {
    const fetchFoodItemDetails = async () => {
      try {
        const response = await foodService.getFoodItem(id);
        setFoodItem(response.data.foodItem);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItemDetails();
  }, [id]);

  const handleReviewButtonClick = () => setSelectedFoodItemForReview(id);

  const handleDelete = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{foodItem?.name}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: "15px",
          }}
        >
          <span>{foodItem?.calories} 🔥</span>
          <span>{foodItem?.protein} P</span>
          <span>{foodItem?.carbs} C</span>
          <span>{foodItem?.fat} F</span>
        </div>
        {foodItem?.image && (
          <img
            src={foodItem.image}
            alt={foodItem.name}
            style={{ maxWidth: "300px", maxHeight: "300px", marginTop: "15px" }}
          />
        )}
      </div>
      <button onClick={handleReviewButtonClick}>Rate it</button>
      {selectedFoodItemForReview && (
        <AddReviewPage
          foodItemId={selectedFoodItemForReview}
          onClose={() => setSelectedFoodItemForReview(null)}
        />
      )}
      <div>
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id}>
              <p>Taste: {review.taste}</p>
              <p>Digestion: {review.digestion}</p>
              <p>Rate: {review.rate}</p>
              <button onClick={() => handleDelete(review._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default FoodItemDetailsPage;
