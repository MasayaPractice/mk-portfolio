<template>
  <section class="bg-cream text-gray-900 py-12 px-6">
    <div
      class="max-w-4xl mx-auto bg-white bg-opacity-90 shadow-xl rounded-xl border border-gray-300 p-8"
    >
      <h1 class="text-4xl font-serif font-bold text-indigo-800 mb-4 tracking-wide">
        {{ t('contact.title') }}
      </h1>
      <p class="text-lg leading-relaxed mb-6 font-light tracking-wide">
        {{ t('contact.description') }}
      </p>

      <!-- ✉️ Contact Form -->
      <form @submit="sendEmail" class="space-y-4" ref="formRef">
        <input
          name="user_name"
          :placeholder="t('contact.form.name')"
          required
          class="w-full border p-2"
        />
        <input
          name="user_email"
          type="email"
          :placeholder="t('contact.form.email')"
          required
          class="w-full border p-2"
        />
        <textarea
          name="message"
          :placeholder="t('contact.form.message')"
          required
          class="w-full border p-2 h-32"
        ></textarea>
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">
          {{ t('contact.form.send') }}
        </button>
      </form>

      <p class="mt-6 text-base font-light text-gray-700">
        {{ t('contact.footer') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'

const formRef = ref<HTMLFormElement | null>(null)
const { t } = useI18n()

const sendEmail = async (e: Event) => {
  e.preventDefault()
  if (!formRef.value) return

  try {
    await emailjs.sendForm('masaya', 'template_1j0su3k', formRef.value, 'TNSi6l4tmvlboHirm')
    alert('Message sent successfully!')
    formRef.value.reset()
  } catch (error) {
    console.error(error)
    alert('Failed to send the message. Please try again.')
  }
}
</script>
