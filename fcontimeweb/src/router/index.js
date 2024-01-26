import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/newSite.vue'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
