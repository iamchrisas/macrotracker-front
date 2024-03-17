import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reviewService from "../services/review.service";

function AddReviewPage() {
  const [reviewData, setReviewData] = useState({
    food: "",
    taste: "",
    digestion: "",
    rate: 1,
  });
  const navigate = useNavigate();

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
      .addReview(reviewData)
      .then(() => {
        navigate("/reviews");
      })
      .catch((error) => {
        console.error("Failed to add review", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Review</h2>
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
        <select name="taste" value={reviewData.taste} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="bad">Bad</option>
          <option value="ok">Ok</option>
          <option value="great">Great</option>
        </select>
      </div>
      <div>
        <label>Digestion:</label>
        <select name="digestion" value={reviewData.digestion} onChange={handleChange} required>
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
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default AddReviewPage;