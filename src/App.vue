<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <AppHeader />

    <main class="flex-1 w-full px-6 md:px-12 py-8">
      <div class="w-full max-w-7xl mx-auto">
        <RouterView />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Global layout component
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
