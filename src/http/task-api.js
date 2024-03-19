// Import the pre-configured Axios instance from the "api" module
import api from "./api";

const apiPath = import.meta.env.VITE_API_PATH

// Define the API resource endpoint for tasks
const resource = apiPath + "/tasks";

// Function to fetch all tasks from the API
export const allTasks = () => api.get(resource);

// Function to create a new task via API
export const createTask = (task, headers) => api.post(resource, task, { headers });

// Function to update an existing task via API
export const updateTask = (id, task, headers) => api.put(`${resource}/${id}`, task, {headers});

// Function to remove a task by its ID via API
export const removeTask = (id, headers) => api.delete(`${resource}/${id}`, {headers});

// Function to mark a task as complete by its ID via API
export const completeTask = (id, task, headers) => api.patch(`${resource}/${id}/complete`, task, {headers});
