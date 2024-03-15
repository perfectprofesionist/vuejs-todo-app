<script setup>
// Import necessary components for the setup
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <!-- Template section containing the structure of the page -->
    <div>
        <!-- Include the Navbar component -->
        <Navbar />

        <router-view />

        <!-- Include the TasksPage component -->
        <TasksPage />

        <!-- Include the Footer component -->
        <Footer />
    </div>
</template>

<style scoped>
/* Scoped style section - styles only apply to this component */

</style>
