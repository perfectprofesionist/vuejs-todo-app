<template>
    <!-- Task item template -->
    <li class="list-group-item py-3" >
        <!-- Container for task content and actions -->
        <div class="d-flex justify-content-start align-items-center">
            <!-- Checkbox for task completion status -->
            <input class="form-check-input mt-0 completed" :class="completedTasksClass" type="checkbox" :checked="task.is_completed"/>
            
            <!-- Container for task name and edit/remove options -->
            <div class="ms-2 flex-grow-1 " :class="completedTasksClass" title="Double click the text to edit or remove">
                <!-- Task name display section -->
                <span>{{ task.name }}</span>
            </div>

            <!-- Display task date -->
            <div class="task-date">24 Feb 12:00</div>
        </div>

        <!-- Task action buttons -->
        <div class="task-actions">
            <!-- Edit task button -->
            <button class="btn btn-sm btn-circle btn-outline-secondary me-1">
                <IconPencil />
            </button>
            
            <!-- Delete task button -->
            <button class="btn btn-sm btn-circle btn-outline-danger">
                <IconTrash />
            </button>
        </div>
    </li>
</template>

<script setup>
    // Import necessary functions from Vue
    import { computed, defineProps } from "vue";
    // Import Icon components for edit and delete actions
    import IconTrash from '../icons/IconTrash.vue';
    import IconPencil from '../icons/IconPencil.vue';

    // Define props for the task item component
    const props = defineProps({
        task: Object
    })

    // Compute the class for completed tasks based on the is_completed property
    const completedTasksClass = computed(() =>  props.task.is_completed? "completed" : "")
</script>