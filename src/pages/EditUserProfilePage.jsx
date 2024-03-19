import React, { useState, useEffect } from 'react';
import userService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

function EditUserProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentWeight: 0,
    weightGoal: 0,
    dailyCalorieGoal: 0,
    dailyProteinGoal: 0,
    dailyCarbGoal: 0,
    dailyFatGoal: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and set existing user profile data
    userService.getUserProfile().then(response => {
      setFormData(response.data);
    }).catch(error => {
      console.error('Error fetching user profile:', error);
      alert('Failed to fetch user profile.');
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.editUserProfile(formData)
      .then(() => {
        alert('Profile updated successfully!');
        navigate('/user-profile');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile.');
      });
  };

  return (
    <div>
      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Current Weight (kg):</label>
          <input type="number" name="currentWeight" value={formData.currentWeight} onChange={handleChange} required />
        </div>
        <div>
          <label>Weight Goal (kg):</label>
          <input type="number" name="weightGoal" value={formData.weightGoal} onChange={handleChange} required />
        </div>
        <div>
          <label>Daily Calorie Goal (kcal):</label>
          <input type="number" name="dailyCalorieGoal" value={formData.dailyCalorieGoal} onChange={handleChange} required />
        </div>
        <div>
          <label>Daily Protein Goal (g):</label>
          <input type="number" name="dailyProteinGoal" value={formData.dailyProteinGoal} onChange={handleChange} required />
        </div>
        <div>
          <label>Daily Carb Goal (g):</label>
          <input type="number" name="dailyCarbGoal" value={formData.dailyCarbGoal} onChange={handleChange} required />
        </div>
        <div>
          <label>Daily Fat Goal (g):</label>
          <input type="number" name="dailyFatGoal" value={formData.dailyFatGoal} onChange={handleChange} required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditUserProfilePage;