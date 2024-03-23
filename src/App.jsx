import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import UserProfilePage from "./pages/UserProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import FoodItemsPage from "./pages/FoodItemsPage";
import AddFoodItemPage from "./pages/AddFoodItemPage";
import FoodItemDetailsPage from "./pages/FoodItemDetailsPage";
import EditFoodItemPage from "./pages/EditFoodItemPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import AddReviewPage from "./pages/AddReviewPage"; // Ensure this is imported
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
        {/* Adjusted route for AddReviewPage to include foodItemId */}
        <Route
          path="/foods/:foodItemId/add-review"
          element={<AddReviewPage />}
        />
        <Route path="/reviews/:id" element={<ReviewDetailsPage />} />
        <Route path="/reviews/edit-review/:id" element={<EditReviewPage />} />
      </Routes>
    </div>
  );
}

export default App;
