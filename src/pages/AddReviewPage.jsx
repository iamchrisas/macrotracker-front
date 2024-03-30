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
      <div className="mb-4">
        <label className="block text-sm font-medium text-default mb-1">
          Taste
        </label>
        <div className="flex space-x-4 text-sm">
          {renderRadioOptions("taste", [
            { value: "bad", label: "Bad" },
            { value: "ok", label: "Ok" },
            { value: "great", label: "Great" },
          ])}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-default mb-1">
          Digestion
        </label>
        <div className="flex space-x-4 text-sm mb-4">
          {renderRadioOptions("digestion", [
            { value: "bad", label: "Bad" },
            { value: "ok", label: "Ok" },
            { value: "great", label: "Great" },
          ])}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-default mb-1">
          Rate (1-5)
        </label>
        <input
          type="number"
          name="rate"
          value={reviewData.rate}
          onChange={handleChange}
          required
          min="1"
          max="5"
          className="input input-bordered w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
}

export default AddReviewPage;
