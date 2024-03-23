import React, { useState } from "react";
import reviewService from "../services/review.service";

function AddReviewPage({ foodItemId, onClose }) {
  if (!foodItemId) {
    return <div>Loading food item details...</div>;
  }
  const [reviewData, setReviewData] = useState({
    taste: "",
    digestion: "",
    rate: "",
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
        <div>
          <input
            type="radio"
            id="taste_bad"
            name="taste"
            value="bad"
            checked={reviewData.taste === "bad"}
            onChange={handleChange}
          />
          <label htmlFor="taste_bad">Bad</label>
        </div>
        <div>
          <input
            type="radio"
            id="taste_ok"
            name="taste"
            value="ok"
            checked={reviewData.taste === "ok"}
            onChange={handleChange}
          />
          <label htmlFor="taste_ok">Ok</label>
        </div>
        <div>
          <input
            type="radio"
            id="taste_great"
            name="taste"
            value="great"
            checked={reviewData.taste === "great"}
            onChange={handleChange}
          />
          <label htmlFor="taste_great">Great</label>
        </div>
      </div>
      <div>
        <label>Digestion:</label>
        <div>
          <input
            type="radio"
            id="digestion_bad"
            name="digestion"
            value="bad"
            checked={reviewData.digestion === "bad"}
            onChange={handleChange}
          />
          <label htmlFor="digestion_bad">Bad</label>
        </div>
        <div>
          <input
            type="radio"
            id="digestion_ok"
            name="digestion"
            value="ok"
            checked={reviewData.digestion === "ok"}
            onChange={handleChange}
          />
          <label htmlFor="digestion_ok">Ok</label>
        </div>
        <div>
          <input
            type="radio"
            id="digestion_great"
            name="digestion"
            value="great"
            checked={reviewData.digestion === "great"}
            onChange={handleChange}
          />
          <label htmlFor="digestion_great">Great</label>
        </div>
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddReviewPage;
