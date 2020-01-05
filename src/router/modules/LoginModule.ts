import Layout from '@/views/layout/LayoutPage.vue'
import LoginBox from '@/views/loginReg/Login.vue'

const LoginModule = {
  path: '/login',
  name: '',
  component: Layout,
  children: [
    {
      path: '/',
      name: 'loginName',
      component: LoginBox
    },
    {
      path: '/forget',
      name: 'loginName',
      component: LoginBox
    }
  ]
}

export default { LoginModule }
