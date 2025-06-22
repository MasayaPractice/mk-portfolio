<template>
  <header class="bg-white border-b border-gray-200">
    <div class="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800">Portfolio</h1>

      <div class="flex items-center space-x-8 text-lg">
        <nav class="space-x-8">
          <RouterLink to="/" class="font-semibold hover:text-indigo-600">{{
            $t('Home')
          }}</RouterLink>
          <RouterLink to="/about" class="font-semibold hover:text-indigo-600">{{
            $t('About')
          }}</RouterLink>
          <RouterLink to="/projects" class="font-semibold hover:text-indigo-600">{{
            $t('Projects')
          }}</RouterLink>
          <RouterLink to="/contact" class="font-semibold hover:text-indigo-600">{{
            $t('Contact')
          }}</RouterLink>
        </nav>

        <!-- 言語切り替えセレクト -->
        <select v-model="lang" @change="changeLang" class="border p-2 rounded text-base">
          <option value="ja">日本語</option>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { locale } = useI18n()
const lang = ref(locale.value)

const changeLang = () => {
  locale.value = lang.value
  localStorage.setItem('lang', lang.value)
}
</script>
