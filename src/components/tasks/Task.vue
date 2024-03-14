<template>
    <!-- Task item template -->
    <li class="list-group-item py-3" >
        <!-- Container for task content and actions -->
        <div class="d-flex justify-content-start align-items-center">
            <!-- Checkbox for task completion status -->
            <input class="form-check-input mt-0 completed" 
                type="checkbox"
                :class="completedTasksClass"  
                :checked="task.is_completed"
                @change="markeTaskAsCompleted"
            />
            
            <!-- Container for task name and edit/remove options -->
            <div class="ms-2 flex-grow-1 " :class="completedTasksClass" title="Double click the text to edit or remove"  @dblclick="$event => isEdit = true" >
                <div class="relative" v-if="isEdit">
                    <input 
                        type="text" 
                        class="editable-task" 
                        v-focus 
                        @keyup.esc="undo" 
                        @keyup.enter="updateTask" 
                        v-model="editingTask"
                    />
                </div>
                <!-- Task name display section -->
                <span v-else>{{ task.name }}</span>
            </div>

            <!-- Display task date -->
            <div class="task-date">{{ task.created_at }}</div>
        </div>

        <TaskActions 
            @edit="$event =>  isEdit = true" 
            v-show="!isEdit"
            @remove="removeTask"
        />
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

    const emit = defineEmits([ "updated", "completed", "removed" ])

    const isEdit = ref(false)
    const editingTask = ref(props.task.name)
    // Compute the class for completed tasks based on the is_completed property
    const completedTasksClass = computed(() =>  props.task.is_completed? "completed" : "")

    const vFocus = {
        mounted: (el) => el.focus()
    }

    const updateTask = event => {
        const updatedTask = {
            ...props.task, 
            name: event.target.value
        }
        isEdit.value = false
        emit('updated', updatedTask)
    }
    const undo = () => {
        isEdit.value = false
        editingTask.value = props.task.name
    }


    const markeTaskAsCompleted = event => {
        const updatedTask = {
            ...props.task, 
            is_completed: !props.task.is_completed
        }
        
        emit('completed', updatedTask)
    }


    const removeTask = event => {
        if(confirm('Are you sure?')) {
            emit('removed' , props.task)
        }
    }
</script>