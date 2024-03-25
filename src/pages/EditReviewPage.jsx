import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reviewService from "../services/review.service";

function EditReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({
    food: "",
    taste: "",
    digestion: "",
    rate: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    reviewService
      .getReviewById(id)
      .then((response) => {
        setReviewData({
          food: response.data.food,
          taste: response.data.taste,
          digestion: response.data.digestion,
          rate: response.data.rate,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch review");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    reviewService
      .updateReview(id, reviewData)
      .then(() => {
        navigate("/reviews");
      })
      .catch((error) => {
        console.error("Failed to update review", error);
        setError("Failed to update review. Please try again.");
      });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Review</h2>
      {/* Form fields for review data */}
      <div>
        <label>Food ID:</label>
        <input
          type="text"
          name="food"
          value={reviewData.food}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Taste:</label>
        <select
          name="taste"
          value={reviewData.taste}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="bad">Bad</option>
          <option value="ok">Ok</option>
          <option value="great">Great</option>
        </select>
      </div>
      <div>
        <label>Digestion:</label>
        <select
          name="digestion"
          value={reviewData.digestion}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="bad">Bad</option>
          <option value="ok">Ok</option>
          <option value="great">Great</option>
        </select>
      </div>
      <div>
        <label>Rate (1-5):</label>
        <input
          type="number"
          name="rate"
          value={reviewData.rate}
          onChange={handleChange}
          required
          min="1"
          max="5"
        />
      </div>
      <button type="submit">Save</button>
      {isInlineMode && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EditReviewPage;
