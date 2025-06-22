<template>
  <section class="bg-cream py-12 px-6 min-h-screen">
    <div
      class="max-w-6xl mx-auto bg-white bg-opacity-90 shadow-xl rounded-xl border border-gray-300 p-6"
    >
      <h1 class="text-3xl font-serif font-bold text-indigo-800 mb-6">{{ $t('title') }}</h1>

      <button
        @click="$router.push('/projects/new')"
        class="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300"
      >
        {{ $t('projects.addProject.title') }}
      </button>

      <!-- Make the table horizontally scrollable and improve accessibility -->
      <div class="overflow-x-auto" role="region" aria-label="Project list table">
        <table class="min-w-[700px] table-auto border border-gray-300 rounded-lg" role="table">
          <thead class="bg-indigo-100 text-indigo-900 text-sm font-semibold">
            <tr>
              <th class="text-left py-3 px-4 border-b border-gray-300">
                {{ $t('projects.tableHeaders.projectTitle') }}
              </th>
              <th class="text-left py-3 px-4 border-b border-gray-300">
                {{ $t('projects.tableHeaders.description') }}
              </th>
              <th class="text-left py-3 px-4 border-b border-gray-300 whitespace-nowrap">
                {{ $t('projects.tableHeaders.startDate') }}
              </th>
              <th class="text-left py-3 px-4 border-b border-gray-300 whitespace-nowrap">
                {{ $t('projects.tableHeaders.endDate') }}
              </th>
              <th class="text-left py-3 px-4 border-b border-gray-300">
                {{ $t('projects.tableHeaders.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- changed from indigo-50 to indigo-200 for stronger feedback -->
            <tr
              v-for="item in projectsList"
              :key="item.id"
              class="hover:bg-indigo-200 text-sm text-gray-800"
            >
              <td class="py-3 px-4 border-b border-gray-200">
                {{ item.title }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 break-words whitespace-pre-wrap">
                {{ item.description }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                {{ formatDate(item.startDate) }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200 whitespace-nowrap">
                {{ formatDate(item.endDate) }}
              </td>
              <td class="py-3 px-4 border-b border-gray-200">
                <div class="flex space-x-3">
                  <!-- added underline thickness, colour and transition -->
                  <button
                    @click="$router.push(`/projects/edit/${item.id}`)"
                    class="text-indigo-600 hover:underline hover:decoration-2 hover:decoration-indigo-600 transition duration-200"
                  >
                    {{ $t('projects.actions.edit') }}
                  </button>

                  <!-- added underline thickness, colour and transition -->
                  <button
                    @click="removeProject(item.id)"
                    class="text-red-600 hover:underline hover:decoration-2 hover:decoration-red-600 transition duration-200"
                  >
                    {{ $t('projects.actions.delete') }}
                  </button>
                </div>
              </td>
            </tr>

            <!-- Display message when there are no projects -->
            <tr v-if="projectsList.length === 0">
              <td colspan="5" class="text-center py-6 text-gray-500" role="cell">
                {{ $t('projects.noProjects') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

// Format date as DD/MM/YYYY or return '-' if invalid
function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Load projects from the backend API
async function loadProjects() {
  try {
    const response = await axios.get('http://localhost:3000/projects')
    projectsList.value = response.data
  } catch (error) {
    console.error(error)
    alert(t('projects.errorLoad'))
  }
}

// Remove project after confirmation
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
