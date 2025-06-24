<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div
      class="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0"
    >
      <!-- Site title -->
      <h1 class="text-3xl font-serif font-bold text-indigo-900 tracking-wide">Portfolio</h1>

      <!-- Nav and language toggle -->
      <div class="flex items-center justify-between w-full sm:w-auto">
        <!-- Burger (mobile only) -->
        <button @click="isOpen = !isOpen" class="sm:hidden text-gray-800" aria-label="Toggle menu">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Main nav (desktop only) -->
        <div class="hidden sm:flex items-center space-x-8 text-base font-medium">
          <RouterLink to="/" class="hover:text-indigo-600 transition">{{ tHome }}</RouterLink>
          <RouterLink to="/about" class="hover:text-indigo-600 transition">{{ tAbout }}</RouterLink>
          <RouterLink to="/projects" class="hover:text-indigo-600 transition">{{
            tProjects
          }}</RouterLink>
          <RouterLink to="/contact" class="hover:text-indigo-600 transition">{{
            tContact
          }}</RouterLink>

          <!-- Language selector -->
          <select
            v-model="lang"
            @change="changeLang"
            class="ml-4 border rounded p-1 text-sm bg-white"
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="mobile-menu">
      <div
        v-show="isOpen"
        class="sm:hidden mt-4 space-y-3 text-center text-base font-medium overflow-hidden"
      >
        <div class="border-t pt-3">
          <RouterLink to="/" class="block hover:text-indigo-600" @click="isOpen = false">{{
            tHome
          }}</RouterLink>
        </div>
        <div class="border-t pt-3">
          <RouterLink to="/about" class="block hover:text-indigo-600" @click="isOpen = false">{{
            tAbout
          }}</RouterLink>
        </div>
        <div class="border-t pt-3">
          <RouterLink to="/projects" class="block hover:text-indigo-600" @click="isOpen = false">{{
            tProjects
          }}</RouterLink>
        </div>
        <div class="border-t pt-3">
          <RouterLink to="/contact" class="block hover:text-indigo-600" @click="isOpen = false">{{
            tContact
          }}</RouterLink>
        </div>
        <div class="border-t pt-3">
          <select
            v-model="lang"
            @change="changeLang"
            class="border rounded p-1 text-sm bg-white mt-2"
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const lang = ref(locale.value)
const isOpen = ref(false)

const changeLang = () => {
  locale.value = lang.value
  localStorage.setItem('lang', lang.value)
}

const tHome = computed(() => t('home.title'))
const tAbout = computed(() => t('about.title'))
const tProjects = computed(() => t('projects.title'))
const tContact = computed(() => t('contact.title'))

// ログをonMounted内に入れて翻訳が確実に反映されるタイミングで表示
onMounted(() => {
  console.log('現在のlocale:', locale.value)
  console.log('home.title:', t('home.title'))
  console.log('about.title:', t('about.title'))
  console.log('projects.title:', t('projects.title'))
  console.log('contact.title:', t('contact.title'))
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    max-height 0.7s ease,
    opacity 0.7s ease,
    transform 0.7s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
.mobile-menu-enter-to,
.mobile-menu-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}

.font-serif {
  font-family: 'Noto Serif JP', serif;
}
</style>
