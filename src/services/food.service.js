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
  async getDailyStats(date) {
    const formattedDate = date.toISOString().split("T")[0];
    // Get the client's time zone offset in minutes
    const tzOffset = new Date().getTimezoneOffset();

    try {
      const response = await this.api.get(
        `/api/foods/daily-stats?date=${formattedDate}&tzOffset=${tzOffset}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const foodService = new FoodService();
export default foodService;
