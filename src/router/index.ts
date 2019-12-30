import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/Home.vue";
import Home from './modules/HomeModule'
import Resource from './modules/ResourceModule'
import Course from './modules/CoursesModule'
import Cloud from './modules/CloudModule'
import Login from './modules/LoginSignModule'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
  originalPush.call(this, location, (err: any) => err)
}
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  Home.HomeModule,
  Resource.ResourceModule,
  Course.CoursesModule,
  Cloud.CloudModule,
  Login.LoginSignModule
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
