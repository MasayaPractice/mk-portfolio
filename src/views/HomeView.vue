<template>
  <section class="bg-cream text-gray-900 py-8 px-4 sm:py-12 sm:px-6">
    <div
      class="w-full max-w-full sm:max-w-4xl mx-auto bg-white bg-opacity-90 shadow-xl rounded-xl border border-gray-300 p-4 sm:p-8"
    >
      <!-- Section Title -->
      <h1 class="text-2xl sm:text-4xl font-serif font-bold text-indigo-800 mb-4 tracking-wide">
        {{ t('about.title') }}
      </h1>

      <!-- Intro -->
      <p class="text-base sm:text-lg leading-relaxed mb-6 font-light tracking-wide">
        {{ t('about.intro') }}
      </p>

      <!-- Skills Header -->
      <h2
        class="text-xl sm:text-2xl font-semibold text-indigo-700 mb-3 border-b border-indigo-300 pb-1"
      >
        {{ t('skillsTitle') }}
      </h2>

      <div class="space-y-4 text-sm sm:text-base">
        <!-- Front-End -->
        <div>
          <strong>{{ t('frontend') }}</strong
          ><br />
          <span class="block whitespace-pre-line">{{ t('frontendDetail') }}</span>
        </div>

        <!-- Back-End -->
        <div>
          <strong>{{ t('backend') }}</strong
          ><br />
          <span class="block whitespace-pre-line">{{ t('backendDetail') }}</span>
        </div>

        <!-- i18n -->
        <div>
          <strong>{{ t('i18n') }}</strong
          ><br />
          <span class="block whitespace-pre-line">{{ t('i18nDetail') }}</span>
        </div>

        <!-- Cloud & DevOps -->
        <div>
          <strong>{{ t('cloud') }}</strong
          ><br />
          <span class="block whitespace-pre-line">{{ t('cloudDetail') }}</span>
        </div>

        <!-- Testing -->
        <div>
          <strong>{{ t('testing') }}</strong
          ><br />
          <span class="block whitespace-pre-line">{{ t('testingDetail') }}</span>
        </div>

        <!-- Soft Skills -->
        <div>
          <strong>{{ t('softSkills') }}</strong
          ><br />
          <span class="block whitespace-pre-line">{{ t('softSkillsDetail') }}</span>
        </div>

        <!-- Summary -->
        <div>
          <strong>{{ t('summary') }}</strong
          ><br />
          <span class="block whitespace-pre-line">{{ t('summaryText') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// i18n hook
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
console.log(t('about.title')) // 空なら読み込みに問題あり
console.log(t('about.intro'))
</script>

<style scoped>
.bg-cream {
  background-color: #f9f5f0;
}
.font-serif {
  font-family: 'Noto Serif JP', serif;
}
</style>
