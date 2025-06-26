<template>
  <section class="py-12 px-6 bg-[#fdfcf8]">
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-200">
      <h1 class="text-2xl font-bold text-indigo-800 mb-6">Edit Project</h1>

      <form @submit.prevent="submitProject" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          <input
            v-model="title"
            type="text"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
          <textarea
            v-model="description"
            rows="4"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              v-model="startDate"
              type="date"
              class="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              v-model="endDate"
              type="date"
              class="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
            @click="router.push('/projects')"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps<{ id: string }>()

const API_BASE_URL = import.meta.env.VITE_API_URL

const router = useRouter()

const title = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')

onMounted(async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${props.id}`)
    const project = response.data

    title.value = project.title
    description.value = project.description
    startDate.value = project.startDate ? project.startDate.slice(0, 10) : ''
    endDate.value = project.endDate ? project.endDate.slice(0, 10) : ''
  } catch (error) {
    console.error('Failed to load project:', error)
    alert('Sorry, failed to load project details. Please try again later.')
    router.push('/projects')
  }
})

const submitProject = async () => {
  if (!title.value || !description.value || !startDate.value || !endDate.value) {
    alert('All fields are required.')
    return
  }

  try {
    await axios.put(`${API_BASE_URL}/projects/${props.id}`, {
      title: title.value,
      description: description.value,
      startDate: startDate.value,
      endDate: endDate.value,
    })

    alert('Project updated successfully!')
    router.push('/projects')
  } catch (error) {
    console.error('Project update failed:', error)
    alert('Failed to update project. Please try again.')
  }
}
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
