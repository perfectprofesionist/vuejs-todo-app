<template>
    <!-- Task action buttons -->
    <div class="task-actions">
        <!-- Edit task button -->
        <button class="btn btn-sm btn-circle btn-outline-secondary me-1" @click="$event => emit('edit')">
            <IconPencil />
        </button>
        
        <!-- Delete task button -->
        <button class="btn btn-sm btn-circle btn-outline-danger"  @click="$event => emit('remove')">
            <IconTrash />
        </button>
    </div>
</template>

<script setup>

    // Import Icon components for edit and delete actions
    import IconTrash from '../icons/IconTrash.vue'; // Importing the IconTrash component
    import IconPencil from '../icons/IconPencil.vue'; // Importing the IconPencil component

    // Defining custom events using defineEmits
    const emit = defineEmits([
        "edit", // Custom event for triggering an edit action
        "remove" // Custom event for triggering a remove action
    ]);
</script>