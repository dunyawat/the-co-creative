import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BackofficeView from '../views/BackofficeView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectBackOfficeView from '../views/backoffice/ProjectBackOfficeView.vue'
import ProjectManagementView from '../views/backoffice/ProjectManagementView.vue'
import CareerBackOfficeView from '../views/backoffice/CareerBackOfficeView.vue'
import CareerManagementView from '../views/backoffice/CareerManagementView.vue'
import StaffBackOfficeView from '../views/backoffice/StaffBackOfficeView.vue'
import StaffManagementView from '../views/backoffice/StaffManagementView.vue'
import TagBackOfficeView from '../views/backoffice/TagBackOfficeView.vue'
import TagManagementView from '../views/backoffice/TagManagementView.vue'
import AboutView from '../views/AboutView.vue'
import CareerView from '../views/CareerView.vue'
import ClientView from '../views/ClientView.vue'
import ProjectView from '../views/ProjectView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'AboutUsView',
      component: AboutView
    },
    {
      path: '/login',
      name:'login',
      component: LoginView,
    },
    {
      path: '/website-management',
      name:'backoffice',
      component: BackofficeView,
    },
    {
      path:'/website-management/project',
      name:'ProjectBackOfficeViewUrl',
      component:ProjectBackOfficeView,
    },
    {
      path:'/website-management/project/:id',
      name:'ProjectManagementViewUrl',
      component:ProjectManagementView,
    },
    {
      path:'/website-management/career',
      name:'CareerBackOfficeViewUrl',
      component:CareerBackOfficeView,
    },
    {
      path:'/website-management/career/:id',
      name:'CareerManagementViewUrl',
      component:CareerManagementView,
    },
    {
      path:'/website-management/staff',
      name:'StaffBackOfficeViewUrl',
      component: StaffBackOfficeView,
    },
    {
      path:'/website-management/staff/:id',
      name:'StaffManagementViewUrl',
      component: StaffManagementView,
    },
    {
      path:'/website-management/tag',
      name:'TagBackOfficeViewUrl',
      component: TagBackOfficeView,
    },
    {
      path:'/website-management/tag/:id',
      name:'TagManagementViewUrl',
      component: TagManagementView,
    },
    {
      path:'/career',
      name:'CareerViewUrl',
      component: CareerView,
    },
    {
      path:'/client',
      name:'ClientViewUrl',
      component: ClientView,
    },
    {
      path:'/project',
      name:'ProjectView',
      component: ProjectView,
    },
    {
      path:'/project/:id',
      name:'ProjectDetailViewUrl',
      component: ProjectDetailView,
      meta: {
        reload: true,
      },
    },
    {
      path:'/contact',
      name:'ContactViewUrl',
      component: ContactView,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
