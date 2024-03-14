<template>
    <!-- Task item template -->
    <li class="list-group-item py-3" >
        <!-- Container for task content and actions -->
        <div class="d-flex justify-content-start align-items-center">
            <!-- Checkbox for task completion status -->
            <input class="form-check-input mt-0 completed" :class="completedTasksClass" type="checkbox" :checked="task.is_completed"/>
            
            <!-- Container for task name and edit/remove options -->
            <div class="ms-2 flex-grow-1 " :class="completedTasksClass" title="Double click the text to edit or remove"  @dblclick="$event => isEdit = true" >
                <div class="relative" v-if="isEdit">
                    <input type="text" class="editable-task" @keyup.esc="$event => isEdit = false" v-focus/>
                </div>
                <!-- Task name display section -->
                <span v-else>{{ task.name }}</span>
            </div>

            <!-- Display task date -->
            <div class="task-date">24 Feb 12:00</div>
        </div>

        <TaskActions @edit="$event =>  isEdit = true" v-show="!isEdit"/>
    </li>
</template>

<script setup>
    // Import necessary functions from Vue
    import { computed, defineProps, ref } from "vue";
    import TaskActions from "./TaskActions.vue";

    // Define props for the task item component
    const props = defineProps({
        task: Object
    })

    const isEdit = ref(false)
    // Compute the class for completed tasks based on the is_completed property
    const completedTasksClass = computed(() =>  props.task.is_completed? "completed" : "")

    const vFocus = {
        mounted: (el) => el.focus()
    }
</script>