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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewService.addReview({ ...reviewData, food: foodItemId });
      alert("Review added successfully");
      if (onClose) onClose();
    } catch (error) {
      console.error("Failed to add review", error);
      alert("Failed to add review");
    }
  };

  const renderRadioOptions = (name, options) =>
    options.map((option) => (
      <div key={option.value}>
        <input
          type="radio"
          id={`${name}_${option.value}`}
          name={name}
          value={option.value}
          checked={reviewData[name] === option.value}
          onChange={handleChange}
        />
        <label htmlFor={`${name}_${option.value}`}>{option.label}</label>
      </div>
    ));

  return (
    <form onSubmit={handleSubmit} className="form-control w-full max-w-xs">
      <h2 className="text-2xl font-bold mb-4">Add Review</h2>
      <div className="mb-4">
        <label className="label">
          <span className="label-text">Taste:</span>
        </label>
        {renderRadioOptions("taste", [
          { value: "bad", label: "Bad" },
          { value: "ok", label: "Ok" },
          { value: "great", label: "Great" },
        ])}
      </div>
      <div className="mb-4">
        <label className="label">
          <span className="label-text">Digestion:</span>
        </label>
        {renderRadioOptions("digestion", [
          { value: "bad", label: "Bad" },
          { value: "ok", label: "Ok" },
          { value: "great", label: "Great" },
        ])}
      </div>
      <div className="mb-4">
        <label className="label">
          <span className="label-text">Rate (1-5):</span>
        </label>
        <input
          type="number"
          name="rate"
          value={reviewData.rate}
          onChange={handleChange}
          required
          min="1"
          max="5"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AddReviewPage;
