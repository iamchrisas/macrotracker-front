import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

// Import authentication-related components
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

// Import user profile and stats components
import UserProfilePage from "./pages/UserProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";


// Import food-related components
import FoodItemsPage from "./pages/FoodItemsPage";
import AddFoodItemPage from "./pages/AddFoodItemPage";
import FoodItemDetailsPage from "./pages/FoodItemDetailsPage";
import EditFoodItemPage from "./pages/EditFoodItemPage";

// Import review-related components
import AddReviewPage from "./pages/AddReviewPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import ReviewDetailsPage from "./pages/ReviewDetailsPage";
import EditReviewPage from "./pages/EditReviewPage";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Authentication-related routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* User profile and stats routes */}
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/edit-profile" element={<EditUserProfilePage />} />

        {/* Food-related routes */}
        <Route path="/foods" element={<FoodItemsPage />} />
        <Route path="/add-food" element={<AddFoodItemPage />} />
        <Route path="/foods/:id" element={<FoodItemDetailsPage />} />
        <Route path="/foods/edit-food/:id" element={<EditFoodItemPage />} />

        {/* Review-related routes */}
        <Route path="/reviews" element={<MyReviewsPage />} />
        <Route path="/add-review" element={<AddReviewPage />} />
        <Route path="/reviews/:id" element={<ReviewDetailsPage />} />
        <Route path="/reviews/edit-review/:id" element={<EditReviewPage />} />
      </Routes>
    </div>
  );
}

export default App;
