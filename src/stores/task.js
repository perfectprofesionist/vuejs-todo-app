import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { allTasks, createTask, updateTask, completeTask, removeTask } from "../http/task-api";

// Define a Pinia store called 'taskStore'
export const useTaskStore = defineStore("taskStore", () => {
  // Define reactive variables to hold tasks and their computed properties
  const tasks = ref([]); // Holds all tasks
  const uncompletedTasks = computed(() => // Computed property for uncompleted tasks
    tasks.value.filter((task) => !task.is_completed)
  );
  const completedTasks = computed(() => // Computed property for completed tasks
    tasks.value.filter((task) => task.is_completed)
  );

  // Function to fetch all tasks from the server
  const fetchAllTasks = async () => {
    const { data } = await allTasks();
    tasks.value = data.data;
  };

  // Function to handle adding a new task
  const handleAddedTask = async (newTask) => {
    const { data: createdTask } = await createTask(newTask)
    tasks.value.unshift(createdTask.data)
  }

  // Function to handle updating a task
  const handleUpdatedTask = async (task) => {
    const { data: updatedTask } = await updateTask(task.id, {
        name: task.name
    })
    const currentTask = tasks.value.find(item => item.id === task.id)
    currentTask.name = updatedTask.data.name
  }

  // Function to handle marking a task as completed
  const handleCompletedTask = async (task) => {
    const { data: updatedTask } = await completeTask(task.id, {
        is_completed: task.is_completed
    })
    const currentTask = tasks.value.find(item => item.id === task.id)
    currentTask.is_completed = updatedTask.data.is_completed
  }

  // Function to handle removing a task
  const handleRemovedTask = async (task) => {
    await removeTask(task.id)
    const index = tasks.value.findIndex(item => item.id === task.id)
    tasks.value.splice(index, 1)
  }

  // Return the variables and functions that will be accessible outside the store
  return {
    tasks,
    completedTasks,
    uncompletedTasks,
    fetchAllTasks,
    handleAddedTask,
    handleUpdatedTask,
    handleCompletedTask,
    handleRemovedTask
  };
});
