import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all page components
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
import AddReviewPage from "./pages/AddReviewPage";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Authentication-related routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* User profile routes */}
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditUserProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Food-related routes */}
        <Route
          path="/foods"
          element={
            <ProtectedRoute>
              <FoodItemsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-food"
          element={
            <ProtectedRoute>
              <AddFoodItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foods/:id"
          element={
            <ProtectedRoute>
              <FoodItemDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foods/edit-food/:id"
          element={
            <ProtectedRoute>
              <EditFoodItemPage />
            </ProtectedRoute>
          }
        />

        {/* Review-related routes */}
        <Route
          path="/add-review"
          element={
            <ProtectedRoute>
              <AddReviewPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
