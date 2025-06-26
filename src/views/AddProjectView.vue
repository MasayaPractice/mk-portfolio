<template>
  <section class="py-12 px-6 bg-[#fdfcf8]">
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-200">
      <h1 class="text-2xl font-bold text-indigo-800 mb-6">{{ $t('projects.addProject.title') }}</h1>

      <form @submit.prevent="submitProject" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('projects.addProject.projectTitle') }}
          </label>
          <input
            v-model="title"
            type="text"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('projects.addProject.description') }}
          </label>
          <textarea
            v-model="description"
            rows="4"
            class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('projects.addProject.startDate') }}
            </label>
            <input
              v-model="startDate"
              type="date"
              class="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('projects.addProject.endDate') }}
            </label>
            <input
              v-model="endDate"
              type="date"
              class="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition-colors"
            @click="router.push('/projects')"
          >
            {{ $t('projects.addProject.cancel') }}
          </button>
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors"
          >
            {{ $t('projects.addProject.save') }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const API_BASE_URL = import.meta.env.VITE_API_URL

const router = useRouter()
const { t } = useI18n()

const title = ref('')
const description = ref('')
const startDate = ref('')
const endDate = ref('')

const submitProject = async () => {
  try {
    await axios.post(`${API_BASE_URL}/projects`, {
      title: title.value,
      description: description.value,
      startDate: startDate.value,
      endDate: endDate.value,
    })
    alert(t('projects.addProject.alertSuccess'))
    router.push('/projects')
  } catch (error) {
    console.error('Project creation failed:', error)
    alert(t('projects.addProject.alertError'))
  }
}
</script>
