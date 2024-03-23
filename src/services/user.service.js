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

  // Method to update user profile
  editUserProfile(userData) {
    return this.api.put("/api/users/edit-profile", userData);
  }
}

const userService = new UserService();
export default userService;
