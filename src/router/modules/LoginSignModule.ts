import Layout from '@/views/layout/LayoutPage.vue'
import LoginSign from '@/views/loginReg/index.vue'

const LoginSignModule = {
  path: '/login',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'login',
      component: LoginSign
    }
  ]
}

export default { LoginSignModule }
