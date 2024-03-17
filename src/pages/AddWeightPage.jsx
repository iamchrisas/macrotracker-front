import React, { useState } from 'react';
import userService from '../services/user.service';

function AddWeightPage() {
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight) {
      setError('Please enter a weight.');
      return;
    }

    userService.addWeight({ weight })
      .then(() => {
        setSuccess('Weight added successfully.');
        setWeight(''); // Reset the weight input after successful submission
      })
      .catch(error => {
        console.error('Error adding weight:', error);
        setError('Failed to add weight.');
      });
  };

  return (
    <div>
      <h2>Add Weight Entry</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="weight">Weight (kg):</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Weight</button>
      </form>
    </div>
  );
}

export default AddWeightPage;