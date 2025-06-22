// src/i18n.ts
import { createI18n } from 'vue-i18n'
import en from '../src/locales/en.json'
import ja from '../src/locales/ja.json'
import de from '../src/locales/de.json'
import es from '../src/locales/es.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en', // default
  fallbackLocale: 'en',
  messages: { en, ja, de, es },
})

const messages = {
  ja: {
    title: 'プロジェクト概要',
    addProject: '新しいプロジェクトを追加',
    edit: '編集',
    delete: '削除',
    projectTitle: 'タイトル',
    description: '説明',
    startDate: '開始日',
    endDate: '終了日',
    actions: '操作',
    noProjects: 'プロジェクトが見つかりません。',
  },
  en: {
    title: 'Project Overview',
    addProject: 'Add New Project',
    edit: 'Edit',
    delete: 'Delete',
    projectTitle: 'Title',
    description: 'Description',
    startDate: 'Start Date',
    endDate: 'End Date',
    actions: 'Actions',
    noProjects: 'No projects found.',
  },
  es: {
    title: 'Resumen del Proyecto',
    addProject: 'Agregar Nuevo Proyecto',
    edit: 'Editar',
    delete: 'Eliminar',
    projectTitle: 'Título',
    description: 'Descripción',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    actions: 'Acciones',
    noProjects: 'No se encontraron proyectos.',
  },
  de: {
    home: 'Home',
    about: 'Über mich',
    projects: 'Projekte',
    contact: 'Kontakt',
    title: 'Projektübersicht',
    addProject: 'Neues Projekt hinzufügen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    projectTitle: 'Titel',
    description: 'Beschreibung',
    startDate: 'Startdatum',
    endDate: 'Enddatum',
    actions: 'Aktionen',
    noProjects: 'Keine Projekte gefunden.',
  },
}
