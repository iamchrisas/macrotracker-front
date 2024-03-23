import axios from "axios";

class FoodService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5005",
    });

    // Middleware
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // Method to get all food items
  getAllFoodItems() {
    return this.api.get("/api/foods");
  }

  addFoodItem(foodData) {
    return this.api.post("/api/foods/add-food", foodData);
  }

  // Method to get a single food item by id
  getFoodItem(id) {
    return this.api.get(`/api/foods/${id}`);
  }

  // Method to edit a food item
  editFoodItem(id, foodData) {
    return this.api.put(`/api/foods/edit-food/${id}`, foodData);
  }

  // Method to delete a food item
  deleteFoodItem(id) {
    return this.api.delete(`/api/foods/delete-food/${id}`);
  }
  // Method to view daily food stats
  getDailyStats() {
    return this.api.get("/api/foods/daily-stats");
  }
}

const foodService = new FoodService();
export default foodService;
