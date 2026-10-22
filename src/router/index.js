import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const BackofficeView = () => import('../views/BackofficeView.vue')
const LoginView = () => import('../views/LoginView.vue')
const ProjectBackOfficeView = () => import('../views/backoffice/ProjectBackOfficeView.vue')
const ProjectManagementView = () => import('../views/backoffice/ProjectManagementView.vue')
const CareerBackOfficeView = () => import('../views/backoffice/CareerBackOfficeView.vue')
const CareerManagementView = () => import('../views/backoffice/CareerManagementView.vue')
const StaffBackOfficeView = () => import('../views/backoffice/StaffBackOfficeView.vue')
const StaffManagementView = () => import('../views/backoffice/StaffManagementView.vue')
const TagBackOfficeView = () => import('../views/backoffice/TagBackOfficeView.vue')
const TagManagementView = () => import('../views/backoffice/TagManagementView.vue')
const AboutView = () => import('../views/AboutView.vue')
const CareerView = () => import('../views/CareerView.vue')
const ClientView = () => import('../views/ClientView.vue')
const ProjectView = () => import('../views/ProjectView.vue')
const ProjectDetailView = () => import('../views/ProjectDetailView.vue')
const ContactView = () => import('../views/ContactView.vue')

const router = createRouter({
  

  history: createWebHistory(),
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
