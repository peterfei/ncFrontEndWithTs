import Layout from '@/views/layout/LayoutPage.vue'
import CourseList from '@/views/login/Login.vue'

const LoginSignModule = {
  path: '/login',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Login',
      component: CourseList
    }
  ]
}
export default { LoginSignModule }
