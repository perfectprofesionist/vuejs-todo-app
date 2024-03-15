<template>
    <div class="relative">
        <!-- Input for adding new task -->
        <input type="text" class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save."
            @keydown.enter="addNewTask"
            />
    </div>
</template>

<script setup>
import { reactive } from "vue"; // Importing the 'reactive' function from Vue to create reactive objects
import { useTaskStore } from "../../stores/task"; // Importing the task store

// Accessing the task store
const store = useTaskStore();

// Destructuring and accessing the 'handleAddedTask' function from the store
const { handleAddedTask } = store;

// Creating a new reactive object to represent a new task
const newTask = reactive({
    name: '', // Initializing the name of the new task as an empty string
    is_completed: false // Initializing the completion status of the new task as 'false'
});

// Function to add a new task
const addNewTask = async (event) => { // Accepting an event parameter (e.g., input event)
    if (event.target.value.trim()) { // Checking if the input value is not empty after trimming whitespace
        newTask.name = event.target.value; // Setting the name of the new task to the trimmed input value
        event.target.value = ""; // Resetting the input value to an empty string
        await handleAddedTask(newTask); // Calling the 'handleAddedTask' function from the store to add the new task
    }
};
</script>