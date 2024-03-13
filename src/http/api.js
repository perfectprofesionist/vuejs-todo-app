// Import the Axios library for making HTTP requests
import axios from "axios";

// Create an instance of Axios with a specific configuration
const api = axios.create({
    // Set the base URL for the API requests
    baseURL: "http://localhost:8000/api/v1"
});

// Export the configured Axios instance as the default export for reusability
export default api;