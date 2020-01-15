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
import Profile from './modules/ProfileModule'
import FindPwd from './modules/FindPwdModule'
import Backend from './modules/BackendCloudModule'
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
  {
    path: '/test',
    component: () => import('../views/Test.vue')
  },
  Home.HomeModule,
  Resource.ResourceModule,
  Course.CoursesModule,
  Cloud.CloudModule,
  Profile.ProfileModule,
  FindPwd.FindPwdModule,
  {
    path: '/cloudVideo/:syllabuseId/:sub_id/:mooc_issue_id',
    name: 'CloudVideo',
    component: CloudVideo
  },
  Login.LoginModule,
  Reg.RegisterModule,
  Backend.BackendCloudModule
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
