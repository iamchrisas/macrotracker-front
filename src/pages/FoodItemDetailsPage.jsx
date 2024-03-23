import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import foodService from "../services/food.service";
import reviewService from "../services/review.service";
import AddReviewPage from "./AddReviewPage";
import EditReviewPage from "./EditReviewPage";

function FoodItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFoodItemForReview, setSelectedFoodItemForReview] =
    useState(null); // Define the state
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchFoodItemDetails = async () => {
      try {
        const response = await foodService.getFoodItem(id);
        if (response.data.foodItem) {
          // Ensure foodItem is not null
          setFoodItem(response.data.foodItem);
          setReviews(response.data.reviews);
        } else {
          console.error("No foodItem found in response");
          setError("No foodItem found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchFoodItemDetails();
  }, [id]);

  const handleReviewButtonClick = () => {
    setSelectedFoodItemForReview(id); // Use the id from useParams
  };

  const handleEdit = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    setEditingReview(reviewToEdit);
  };

  const handleDelete = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
      <button onClick={() => navigate("/foods")}>Go Back</button>
      <div>
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id}>
              {editingReview?.id === review.id ? (
                // Use EditReviewPage for inline editing
                <EditReviewPage
                  review={editingReview}
                  isInlineMode={true}
                  onSave={(updatedReview) => {
                    // Update the review in the state
                    const updatedReviews = reviews.map((r) =>
                      r.id === updatedReview.id ? updatedReview : r
                    );
                    setReviews(updatedReviews);
                    setEditingReview(null); // Exit editing mode
                  }}
                  onCancel={() => setEditingReview(null)}
                />
              ) : (
                <>
                  <p>Taste: {review.taste}</p>
                  <p>Digestion: {review.digestion}</p>
                  <p>Rate: {review.rate}</p>
                  <button onClick={() => handleEdit(review.id)}>Edit</button>
                  <button onClick={() => handleDelete(review.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FoodItemDetailsPage;
