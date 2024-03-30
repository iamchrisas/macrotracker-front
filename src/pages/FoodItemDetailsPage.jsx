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

  const handleDeleteFoodItem = async () => {
    try {
      await foodService.deleteFoodItem(id);
      alert("Food item deleted successfully!");
      navigate("/foods");
    } catch (error) {
      console.error("Failed to delete food item", error);
      alert("Failed to delete food item.");
    }
  };

  const handleReviewButtonClick = () => setSelectedFoodItemForReview(id);

  const handleDelete = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

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
    <div className="flex flex-col items-center justify-center my-5">
      <div className="card w-96 shadow-xl mb-5">
        <div className="card-body">
          <h2 className="card-title text-center">{foodItem?.name}</h2>

          {/* Macronutrients section  */}
          <div className="flex justify-around text-lg my-3">
            <span>{foodItem?.calories} 🔥</span>
            <span>{foodItem?.protein} P</span>
            <span>{foodItem?.carbs} C</span>
            <span>{foodItem?.fat} F</span>
          </div>

          {/* Image section */}
          <div className="flex justify-center">
            {foodItem?.image && (
              <img
                src={foodItem.image}
                alt={foodItem.name}
                className="max-w-xs max-h-xs"
              />
            )}
          </div>

          <div className="flex justify-center space-x-8 my-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-sm"
            >
              Go back
            </button>
            <button
              onClick={handleReviewButtonClick}
              className="btn btn-primary btn-sm"
            >
              Review
            </button>
            <button
              onClick={handleDeleteFoodItem}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </div>
          {selectedFoodItemForReview && (
            <AddReviewPage
              foodItemId={selectedFoodItemForReview}
              onClose={() => setSelectedFoodItemForReview(null)}
            />
          )}
        </div>
      </div>
      <div className="w-96">
        <h3 className="text-center font-bold my-4">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="mb-4">
              {" "}
              {/* Use review._id here */}
              <p className="font-semibold mb-1">
                Taste: <span className="font-normal">{review.taste}</span>
              </p>
              <p className="font-semibold mb-1">
                Digestion:{" "}
                <span className="font-normal">{review.digestion}</span>
              </p>
              <p className="font-semibold mb-4">
                Rate: <span className="font-normal">{review.rate}</span>
              </p>
              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-error btn-xs"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default FoodItemDetailsPage;
