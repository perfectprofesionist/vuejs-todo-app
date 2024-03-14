<template>
    <!-- Task list container card -->
    <div class="card mt-2" v-if="tasks.length && show">
        <!-- List of tasks -->
        <ul class="list-group list-group-flush">
            <!-- Render each task using the Task component -->
            <Task 
            
                v-for="task in tasks" 
                :key="task.id" 
                :task="task" 
                @updated=" $event => $emit('updated', $event)" 
                @completed=" $event => $emit('completed', $event)" 
            />   
        </ul>
    </div>
</template>

<script setup>
// Import the Task component
import Task from "./Task.vue";

// Define props for the component
defineProps({
    // Array of tasks to be displayed
    tasks: Array,
    // Boolean flag to control the visibility of the task list card (default is true)
    show: {
        type: Boolean,
        default: true
    }
})

</script>
