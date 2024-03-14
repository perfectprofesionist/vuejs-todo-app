// Import the `defineStore` function from the "pinia" package
import { defineStore } from "pinia";

// Import the `allTasks` function from the "../http/task-api" module
import { allTasks } from "../http/task-api";

// Define and export a store named "useTaskStore" using `defineStore` function
export const useTaskStore = defineStore("taskStore", {
  // Define the initial state of the store
  state: () => ({
    // Initialize an empty array to store tasks
    tasks: [],
    // Initialize a default task object with id, name, and completion status
    task: {
      id: 1,
      name: "First task",
      is_completed: false,
    },
  }),

  // Define getters to compute derived state from the store's state
  getters: {
    // Getter to filter and retrieve completed tasks
    completedTasks: (state) => state.tasks.filter((task) => task.is_completed),
    // Getter to filter and retrieve uncompleted tasks
    uncompletedTasks() {
      return this.tasks.filter((task) => !task.is_completed);
    },
  },

  // Define actions to perform asynchronous operations and mutate the state
  actions: {
    // Action to fetch all tasks asynchronously
    async fetchAllTasks() {
      // Await the result of the `allTasks` function call
      const { data } = await allTasks();
      // Update the `tasks` array in the store's state with the fetched data
      this.tasks = data.data;
    },
  },
});
