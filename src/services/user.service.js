import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
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

  // Method to get user profile
  getUserProfile() {
    return this.api.get("/api/users/user-profile");
  }

  // Method to add a new weight entry for the user
  addWeight(weightData) {
    return this.api.post("/api/users/add-weight", weightData);
  }


  // Method to update user profile
     editUserProfile(userData) {
      return this.api.put("/api/users/edit-profile", userData);
    }

  // Method to view daily food stats
  getDailyStats() {
    return this.api.get("/api/users/daily-stats");
  }

  // Method to view weekly food stats
  getWeeklyStats(startDate, endDate) {
    return this.api.get(`/api/users/weekly-stats?startDate=${startDate}&endDate=${endDate}`);
  }
}

const userService = new UserService();
export default userService;
