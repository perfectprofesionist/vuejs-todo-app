<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />
                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" 
                       
                    />
                    <!-- show toggle button -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-secondary" 
                            @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show completed</span>
                            <span v-else>Hide completed</span>
                        </button>
                    </div>
                    <!-- list of completed tasks -->
                    <Tasks :tasks="completedTasks" 
                        :show="completedTasksIsVisible && showCompletedTasks" 
                       
                    />
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
import { computed, onMounted, ref } from "vue"; // Importing necessary functions from Vue
import { storeToRefs } from "pinia"; // Importing a utility function from Pinia
import { useTaskStore } from "../stores/task"; // Importing the task store

import Tasks from "../components/tasks/Tasks.vue"; // Importing the Tasks component
import NewTask from "../components/tasks/NewTask.vue"; // Importing the NewTask component

// Accessing the task store
const store = useTaskStore();

// Extracting reactive references from the store
const { completedTasks, uncompletedTasks } = storeToRefs(store);

// Destructuring and accessing the fetchAllTasks function from the store
const { fetchAllTasks } = store;

// Function executed after component is mounted
onMounted(async () => {
    await fetchAllTasks(); // Fetching all tasks after component is mounted
});

// Computed property to determine whether to show the "Toggle Completed" button
const showToggleCompletedBtn = computed(
    () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
);

// Computed property to determine whether completed tasks should be visible
const completedTasksIsVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
);

// Reference to control the visibility of completed tasks
const showCompletedTasks = ref(false);

</script>

