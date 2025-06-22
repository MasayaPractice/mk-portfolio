<template>
  <section class="bg-cream py-12 px-6 min-h-screen">
    <div
      class="max-w-4xl mx-auto bg-white bg-opacity-90 shadow-xl rounded-xl border border-gray-300 p-8"
    >
      <h1 class="text-3xl font-serif font-bold text-indigo-800 mb-6">{{ $t('title') }}</h1>

      <button
        @click="$router.push('/projects/new')"
        class="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300"
      >
        {{ $t('addProject') }}
      </button>

      <table class="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead class="bg-indigo-100">
          <tr>
            <th class="text-left py-3 px-4 border-r border-gray-300 border-b">
              {{ $t('projectTitle') }}
            </th>
            <th
              class="text-left py-3 px-6 border-r border-gray-300 border-b"
              style="min-width: 300px"
            >
              {{ $t('description') }}
            </th>
            <th class="text-left py-3 px-4 border-r border-gray-300 border-b">
              {{ $t('startDate') }}
            </th>
            <th class="text-left py-3 px-4 border-r border-gray-300 border-b">
              {{ $t('endDate') }}
            </th>
            <th class="text-left py-3 px-4 border-b">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in projectsList" :key="item.id" class="hover:bg-indigo-50">
            <td class="py-3 px-4 border-r border-gray-300 border-b">{{ item.title }}</td>
            <td class="py-3 px-6 border-r border-gray-300 border-b" style="min-width: 300px">
              {{ item.description }}
            </td>
            <td class="py-3 px-4 border-r border-gray-300 border-b">
              {{ formatDate(item.startDate) }}
            </td>
            <td class="py-3 px-4 border-r border-gray-300 border-b">
              {{ formatDate(item.endDate) }}
            </td>

            <td class="py-3 px-4 border-r border-gray-300 border-b">
              <div class="flex space-x-3">
                <button
                  @click="$router.push(`/projects/edit/${item.id}`)"
                  class="text-indigo-600 hover:underline"
                >
                  {{ $t('Edit') }}
                </button>
                <button @click="removeProject(item.id)" class="text-red-600 hover:underline">
                  {{ $t('Delete') }}
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="projectsList.length === 0">
            <td colspan="5" class="text-center py-6 text-gray-500">{{ $t('noProjects') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

interface Project {
  id: number
  title: string
  description: string
  startDate?: string
  endDate?: string
}

const projectsList = ref<Project[]>([])

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

async function loadProjects() {
  try {
    const response = await axios.get('http://localhost:3000/projects')
    projectsList.value = response.data
  } catch (error) {
    console.error(error)
    alert(t('projects.errorLoad'))
  }
}

async function removeProject(id: number) {
  const confirmed = window.confirm(t('projects.confirmDelete'))
  if (!confirmed) return

  try {
    await axios.delete(`http://localhost:3000/projects/${id}`)
    projectsList.value = projectsList.value.filter((project) => project.id !== id)
  } catch (error) {
    console.error(error)
    alert(t('projects.errorDelete'))
  }
}

onMounted(loadProjects)
</script>
