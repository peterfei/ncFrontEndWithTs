import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from "../views/Home.vue";
import Home from './modules/HomeModule'
import Resource from './modules/ResourceModule'
import Course from './modules/CoursesModule'
import Cloud from './modules/CloudModule'
import CloudVideo from '@/views/cloud/cloudVideo/index.vue'
import Login from './modules/LoginModule'
import Reg from './modules/RegisterModule'
import ProFile from './modules/ProFileModule'
import FindPwd from './modules/FindPwdModule'

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
  ProFile.ProFileModule,
  FindPwd.FindPwdModule,
  {
    path: '/cloudVideo/:syllabuseId/:sub_id/:mooc_issue_id',
    name: 'CloudVideo',
    component: CloudVideo
  },
  Login.LoginModule,
  Reg.RegisterModule
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
