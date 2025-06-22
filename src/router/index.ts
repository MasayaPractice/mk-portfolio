// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import AddProjectView from '../views/AddProjectView.vue'
import EditProjectView from '../views/EditProjectView.vue'

const routes = [
  {
    path: '/projects',
    component: ProjectsView,
  },
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/contact', component: ContactView },
  { path: '/projects/new', component: AddProjectView },
  { path: '/projects/edit/:id', component: EditProjectView, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
