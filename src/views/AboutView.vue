<!-- About.vue -->
<template>
  <section class="bg-cream text-gray-900 py-12 px-6">
    <div
      class="max-w-4xl mx-auto bg-white bg-opacity-90 shadow-xl rounded-xl border border-gray-300 p-8 flex flex-col md:flex-row items-start"
    >
      <!-- Profile photo -->
      <img
        :src="profileImg"
        alt="Portrait of Masaya Kiyoto"
        class="w-40 h-40 rounded-full object-cover mb-6 md:mb-0 md:mr-8"
      />

      <!-- Text content -->
      <div class="flex-1">
        <h1 class="text-3xl font-serif font-bold text-indigo-800 mb-4 tracking-wide">
          {{ t('about.title') }}
        </h1>

        <p class="text-lg leading-relaxed mb-4 font-light tracking-wide">
          {{ t('about.intro') }}
        </p>

        <p class="mb-4">{{ t('about.educationIt') }}</p>
        <p class="mb-4">{{ t('about.accenture') }}</p>
        <p class="mb-4">{{ t('about.languages') }}</p>
        <p class="mb-4">{{ t('about.strengths') }}</p>

        <p class="mt-6 italic text-gray-700">
          {{ t('about.closing') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import profileImg from '@/assets/images/profile.jpg'

const { t } = useI18n()
</script>
