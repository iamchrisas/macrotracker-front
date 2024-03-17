import axios from "axios";

class ReviewService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // Method to add a new review
  addReview(reviewData) {
    return this.api.post("/api/reviews/add-review", reviewData);
  }

  // Method to get reviews by the logged-in user
  getMyReviews() {
    return this.api.get("/api/reviews/");
  }

  // Method to get a single review by ID
  getReviewById(id) {
    return this.api.get(`/api/reviews/${id}`);
  }

  // Method to update a review
  updateReview(id, reviewData) {
    return this.api.put(`/api/reviews/edit/${id}`, reviewData);
  }

  // Method to delete a review
  deleteReview(id) {
    return this.api.delete(`/api/reviews/delete-review/${id}`);
  }
}

const reviewService = new ReviewService();
export default reviewService;
