<template>
    <!-- Main template -->
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handleAddedTask" />
                    <!-- List of incomplete tasks -->
                    <Tasks :tasks="uncompletedTaks" @updated="handleUpdatedTask" />

                    <!-- Show toggle button for completed tasks -->
                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <!-- Button to toggle visibility of completed tasks -->
                        <button class="btn btn-sm btn-secondary" @click="$event => showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks">Show Completed Tasks</span>
                            <span v-else>Hide Completed Tasks</span>
                        </button>
                    </div>

                    <!-- List of completed tasks -->
                    <Tasks :tasks="completedTasks" :show="completedTasksIsVisible && showCompletedTasks " />
                   
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    // Import necessary functions from Vue
    import { computed, onMounted, ref } from "vue";
    // Import the task API and the Tasks component
    import { allTasks, createTask, updateTask } from '@/http/task-api';
    import Tasks from "../components/tasks/Tasks.vue"
    import NewTask from "../components/tasks/NewTask.vue"

    // Define a reactive variable for storing tasks
    const tasks = ref([])

    // Fetch all tasks when the component is mounted
    onMounted ( async () => {
        const { data } = await allTasks();
        tasks.value = data.data
    })

    // Compute uncompleted tasks by filtering tasks where is_completed is false
    const uncompletedTaks = computed(() => tasks.value.filter(task => !task.is_completed))
    // Compute completed tasks by filtering tasks where is_completed is true
    const completedTasks = computed(() => tasks.value.filter(task => task.is_completed))

    // Compute whether to show the toggle button based on the existence of both completed and uncompleted tasks
    const showToggleCompletedBtn = computed(() => uncompletedTaks.value.length > 0 && completedTasks.value.length > 0)

    // Compute whether completed tasks should be visible based on the presence of uncompleted tasks or completed tasks
    const completedTasksIsVisible = computed(() => uncompletedTaks.value.length === 0 || completedTasks.value.length > 0)

    // Define a reactive variable for controlling the visibility of completed tasks
    const showCompletedTasks = ref(false)


    const handleAddedTask = async (newTask) => {
        const {data: createdTask} = await createTask(newTask)

        tasks.value.unshift(createdTask.data)
    }

    const handleUpdatedTask = async(task) => {
        const { data: updatedTask } = await updateTask ( task.id, {
            name: task.name
        })

        const currentTask = tasks.value.find(item => item.id === task.id)
        currentTask.name = updatedTask.data.name
    }
</script>
