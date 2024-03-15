// Import the Axios library for making HTTP requests
import axios from "axios";

axios.defaults.withCredentials = true;

// Create an instance of Axios with a specific configuration
const api = axios.create({
    // Set the base URL for the API requests
    baseURL: import.meta.env.VITE_BASE_URL
});

// Export the configured Axios instance as the default export for reusability
export default api;