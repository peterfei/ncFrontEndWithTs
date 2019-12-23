import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/Home.vue";
import Home from './modules/HomeModule'
//import Resource from './modules/ResourceModule'
import Course from './modules/CoursesModule'
import Cloud from './modules/CloudModule'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  Home.HomeModule,
  //Resource.ResourceModule,
  Course.CoursesModule,
  Cloud.CloudModule
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
