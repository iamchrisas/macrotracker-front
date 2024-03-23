import React, { useState } from "react";
import reviewService from "../services/review.service";

function AddReviewPage({ foodItemId, onClose }) {
  const [reviewData, setReviewData] = useState({
    taste: "",
    digestion: "",
    rate: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeReviewData = {
      ...reviewData,
      food: foodItemId,
    };
    reviewService
      .addReview(completeReviewData)
      .then(() => {
        alert("Review added successfully");
        if (onClose) onClose(); // Close the form if the onClose function is provided
      })
      .catch((error) => {
        console.error("Failed to add review", error);
        alert("Failed to add review");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Review</h2>
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
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddReviewPage;
