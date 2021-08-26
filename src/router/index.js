import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
  { path: "/", name: 'Home', component: Index }, 
  // IF THE USER DID NOT FIND A CORRESPONDING ROUTE IN THE BROWSER ABOVE THEN GO TO THE INDEX
  { path: "/:pathMatch(.*)*", component: Index }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
