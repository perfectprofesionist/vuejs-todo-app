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
    import IconTrash from '../icons/IconTrash.vue';
    import IconPencil from '../icons/IconPencil.vue';

    const emit = defineEmits([
        "edit",
        "remove"
    ])
</script>