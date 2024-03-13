// Import the pre-configured Axios instance from the "api" module
import api from "./api";

// Define the API resource endpoint for tasks
const resource = "/tasks";

// Function to fetch all tasks from the API
export const allTasks = () => api.get(resource);

// Function to create a new task via API
export const createTask = (task) => api.post(resource, task);

// Function to update an existing task via API
export const updateTask = (id, task) => api.put(`${resource}/${id}`, task);

// Function to remove a task by its ID via API
export const removeTask = (id) => api.delete(`${resource}/${id}`);

// Function to mark a task as complete by its ID via API
export const completeTask = (id, task) => api.patch(`${resource}/${id}/complete`, task);
